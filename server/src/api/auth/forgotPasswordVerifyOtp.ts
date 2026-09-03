import ApiResponseHandler from '../apiResponseHandler';
import { passwordResetOtpStore, MAX_ATTEMPTS } from './passwordResetOtpStore';

export default async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const code = String(req.body?.code || '').trim();

    if (!email || !code) {
      return res.status(400).json({ errors: [{ message: 'Email and code are required' }] });
    }

    const rec = passwordResetOtpStore.get(email);
    if (!rec) {
      return res.status(400).json({ errors: [{ message: 'No code found. Please request a new one.' }] });
    }
    if (Date.now() > rec.expiresAt) {
      passwordResetOtpStore.delete(email);
      return res.status(400).json({ errors: [{ message: 'Code expired. Please request a new one.' }] });
    }
    rec.attempts += 1;
    if (rec.attempts > MAX_ATTEMPTS) {
      passwordResetOtpStore.delete(email);
      return res.status(400).json({ errors: [{ message: 'Too many attempts. Please request a new code.' }] });
    }
    if (code !== rec.code) {
      return res.status(400).json({ errors: [{ message: 'Invalid verification code.' }] });
    }

    passwordResetOtpStore.markVerified(email);
    await ApiResponseHandler.success(req, res, { verified: true });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
