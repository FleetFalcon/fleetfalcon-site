/**
 * Where every sign-up button goes, in one place: Supervision's "Create an account"
 * (`/session/new`, SCRUM-510). Every customer opens on Supervision; nothing here links to legacy.
 *
 *   **`?plan=` is optional and must stay optional.** It carries a tier picked on the pricing page
 *   through sign-up to Company → Billing, which opens Stripe Checkout for it only when the server
 *   lists it as self-serve and available. A button with no tier to carry (the hero) is a supported
 *   case; inventing a default tier would be choosing on the buyer's behalf. Checkout and the 30-day
 *   trial are both server-side, so no card is charged today.
 *
 *   **`source` is not decoration.** Supervision records it on the new account
 *   (`supervision:<source>`), which is how a sign-up is attributed back to the surface that produced
 *   it, so every caller passes its own. The one shared tag is `english_test` (English testing page
 *   and the pricing add-on), because it also opens the new account on English testing.
 *
 * Not for Enterprise, which books a call — that is `/demo`.
 */
const SIGN_UP_URL = "https://app.fleetfalcon.io/session/new";

export function registerUrl(source: string, plan?: string): string {
  const params = new URLSearchParams();
  if (plan) params.set("plan", plan.toLowerCase());
  params.set("source", source);
  return `${SIGN_UP_URL}?${params}`;
}

/** The tier cards, which do have a tier to carry. */
export const planRegisterUrl = (code: string) =>
  registerUrl(`pricing_${code.toLowerCase()}`, code);
