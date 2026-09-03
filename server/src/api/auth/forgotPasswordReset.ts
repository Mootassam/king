import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';
import AuthService from '../../services/auth/authService';
import { passwordResetOtpStore } from './passwordResetOtpStore';

export default async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const newPassword = String(req.body?.newPassword || '');

    if (!email || !newPassword) {
      return res.status(400).json({ errors: [{ message: 'Email and new password are required' }] });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ errors: [{ message: 'Password must be at least 8 characters' }] });
    }

    // The OTP must have been verified server-side via /auth/forgot-password/verify-otp
    // for this exact email before a password change is allowed.
    if (!passwordResetOtpStore.isVerified(email)) {
      return res.status(400).json({ errors: [{ message: 'Please verify the code sent to your email first.' }] });
    }

    const user = await UserRepository.findByEmailWithoutAvatar(email, req);
    if (!user) {
      passwordResetOtpStore.delete(email);
      return res.status(400).json({ errors: [{ message: 'Please verify the code sent to your email first.' }] });
    }

    // invalidateOldTokens=true: signs the user out of every existing session.
    await AuthService.resetPassword(user.id, newPassword, req);
    passwordResetOtpStore.delete(email);

    await ApiResponseHandler.success(req, res, { success: true });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
