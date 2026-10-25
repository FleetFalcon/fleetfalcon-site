"""
Finding an API key, in the same place the rest of FleetFalcon keeps them.

The first version of this script read `OPENROUTER_API_KEY` from a `.env.local` beside the site
and reported "no key" when it found none — which was wrong twice over. There was a key; it
lives in AWS Secrets Manager at `/fleetfalcon/<env>/secrets`, which is where the backend's
`SecretsService.cs` has always read from. Asking an author to copy it into a second file would
create exactly the stale, gitignored, eventually-committed duplicate that a secrets manager
exists to prevent.

So the lookup order is: the environment, then a local override file for someone pointing at a
different account, then the secrets manager. The first two are conveniences; the third is the
source of truth.

`boto3` is imported lazily — it is not needed unless the first two miss, and the search half of
the image pipeline runs fine without it.
"""
from __future__ import annotations

import json
import os
import pathlib

SITE = pathlib.Path(__file__).resolve().parent.parent.parent

# Where the backend keeps the AWS credentials that open the secrets blob. Pointed at by an
# environment variable rather than guessed, because the two repositories are siblings only on
# a developer's laptop and nowhere else.
BACKEND_CONFIG = os.environ.get(
    "FLEETFALCON_BACKEND_CONFIG",
    str(SITE.parent / "FleetFalcon" / "backend" / "appsettings.Development.json"),
)


def _from_env(name: str) -> str | None:
    return os.environ.get(name, "").strip() or None


def _from_env_file(name: str) -> str | None:
    env = SITE / ".env.local"
    if not env.exists():
        return None
    for line in env.read_text().splitlines():
        if line.startswith(f"{name}="):
            return line.split("=", 1)[1].strip().strip('"').strip("'") or None
    return None


def _from_secrets_manager(key: str) -> str | None:
    """
    One named key out of the FleetFalcon secrets blob.

    Credentials come from the environment first — the way CI would supply them — and fall back
    to the backend's own development config, which is where they sit on a laptop. Any failure
    returns None rather than raising: a missing key means the pipeline reports a gap, which is
    a better outcome than a traceback in the middle of a content build.
    """
    try:
        import boto3  # noqa: PLC0415 — optional, and only needed on this path
    except ImportError:
        return None

    access = _from_env("AWS_ACCESS_KEY_ID")
    secret = _from_env("AWS_SECRET_ACCESS_KEY")
    region = _from_env("AWS_REGION") or "us-east-1"
    path = _from_env("SECURITY_SECRET_PATH")

    if not (access and secret):
        cfg_path = pathlib.Path(BACKEND_CONFIG)
        if not cfg_path.exists():
            return None
        try:
            cfg = json.loads(cfg_path.read_text())
        except (OSError, json.JSONDecodeError):
            return None
        aws = cfg.get("AWS") or {}
        access = aws.get("SecretsAccessKey")
        secret = aws.get("SecretsSecretKey")
        region = aws.get("Region") or region
        path = path or (cfg.get("Security") or {}).get("SecretPath")

    if not (access and secret and path):
        return None

    try:
        client = boto3.client(
            "secretsmanager",
            aws_access_key_id=access, aws_secret_access_key=secret, region_name=region,
        )
        blob = json.loads(
            client.get_secret_value(SecretId=f"/fleetfalcon/{path}/secrets")["SecretString"]
        )
    except Exception:
        return None

    value = str(blob.get(key, "")).strip()
    return value or None


def lookup(env_name: str, secret_name: str) -> str | None:
    """
    An API key, from whichever source has it.

    `env_name` is the environment-variable spelling (`OPENROUTER_API_KEY`); `secret_name` is the
    key inside the secrets blob (`openrouter`). They differ, and keeping both explicit means the
    blob can be renamed without silently falling back to an empty string.
    """
    return (
        _from_env(env_name)
        or _from_env_file(env_name)
        or _from_secrets_manager(secret_name)
    )


def describe_source(env_name: str, secret_name: str) -> str:
    if _from_env(env_name):
        return "environment"
    if _from_env_file(env_name):
        return ".env.local"
    if _from_secrets_manager(secret_name):
        return "AWS Secrets Manager"
    return "not found"
