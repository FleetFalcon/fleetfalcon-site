/**
 * Where "Start your free month" goes, in one place.
 *
 * It used to be a local constant in `components/pricing-tiers.tsx`, which was correct there and
 * nowhere else: the four generic trial buttons — the home hero, the home closing band, the blog
 * call-to-action and the Violation Radar page — all pointed at `/pricing` instead. A visitor who
 * had already decided was sent to a page of prices to decide again, and the decision they had
 * just made was thrown away.
 *
 * Everything the old comment recorded still holds and is the reason this is a function rather
 * than a string:
 *
 *   **It must be `/register`.** The app root drops unknown query parameters, so
 *   `${APP_URL}?plan=x` silently lost the tier and dumped the buyer on a generic landing page.
 *
 *   **`?plan=` is optional and must stay optional.** It carries a chosen tier through signup and
 *   opens Stripe Checkout for it on the other side (`register/page.tsx` → `RegisterForm` →
 *   `/billing?plan=`). The app validates it against `SELF_SERVE_PLANS` and falls back to `null`,
 *   so a button with no tier to carry — a hero button has none — is a supported case and not a
 *   degraded one. Inventing a default tier for those would be choosing on the buyer's behalf.
 *
 *   **Checkout is created server-side**: it needs the organisation signup has just created and
 *   the Stripe price id from `Stripe:Plans:{code}`, neither of which this static site has or
 *   should have. The 30-day trial is applied server-side too (`EntitlementService.TrialDays`),
 *   so no card is charged today — which is what "start your free month" has to mean to be honest.
 *
 *   **`source` is not decoration.** It is how a signup is attributed back to the surface that
 *   produced it, so every caller passes its own and no two share one.
 *
 * Not for Enterprise, which books a call — that is `/demo` — and not for English testing, which
 * is a standalone product with its own `?source=english_test` signup.
 */
const APP_URL = "https://app.fleetfalcon.io";

export function registerUrl(source: string, plan?: string): string {
  const params = new URLSearchParams();
  if (plan) params.set("plan", plan.toLowerCase());
  params.set("source", source);
  return `${APP_URL}/register?${params}`;
}

/** The tier cards, which do have a tier to carry. */
export const planRegisterUrl = (code: string) =>
  registerUrl(`pricing_${code.toLowerCase()}`, code);
