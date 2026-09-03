// ── In-memory OTP store for the "forgot password" flow ─────────────────────
// Deliberately separate from ./otpStore.ts (used for signup email
// verification) so a code verified for one purpose can never be reused for
// the other. Codes expire after 10 minutes and allow 5 verification attempts
// before being invalidated.

interface OtpRecord {
  code: string;
  expiresAt: number;
  verified: boolean;
  attempts: number;
}

const store = new Map<string, OtpRecord>();
const TTL_MS = 10 * 60 * 1000; // 10 minutes
export const MAX_ATTEMPTS = 5;

function key(email: string): string {
  return String(email || '').trim().toLowerCase();
}

export const passwordResetOtpStore = {
  set(email: string, code: string) {
    store.set(key(email), { code, expiresAt: Date.now() + TTL_MS, verified: false, attempts: 0 });
  },
  get(email: string): OtpRecord | undefined {
    return store.get(key(email));
  },
  markVerified(email: string) {
    const rec = store.get(key(email));
    if (rec) rec.verified = true;
  },
  isVerified(email: string): boolean {
    const rec = store.get(key(email));
    return !!rec && rec.verified && Date.now() <= rec.expiresAt;
  },
  delete(email: string) {
    store.delete(key(email));
  },
};
