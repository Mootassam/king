import ApiResponseHandler from '../apiResponseHandler';
import UserRepository from '../../database/repositories/userRepository';
import ResendEmailSender from '../../services/resendEmailSender';
import { passwordResetOtpStore } from './passwordResetOtpStore';

export default async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ errors: [{ message: 'A valid email address is required' }] });
    }

    // Always return a generic response, whether or not the account exists,
    // so this endpoint can't be used to discover which emails are registered.
    try {
      const user = await UserRepository.findByEmailWithoutAvatar(email, req);

      if (user) {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        passwordResetOtpStore.set(email, code);
        await ResendEmailSender.sendPasswordResetOtpEmail(email, code);
      }
    } catch (error) {
      console.error('forgot-password send-otp error:', error);
    }

    await ApiResponseHandler.success(req, res, { sent: true });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
