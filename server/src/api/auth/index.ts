import { createRateLimiter } from "../apiRateLimiter";

export default (app) => {
  app.put(`/auth/password-reset`, require("./authPasswordReset").default);

  const emailRateLimiter = createRateLimiter({
    max: 6,
    windowMs: 15 * 60 * 1000,
    message: "errors.429",
  });

  app.post(
    `/auth/send-email-address-verification-email`,
    emailRateLimiter,
    require("./authSendEmailAddressVerificationEmail").default
  );

  app.post(
    `/auth/send-password-reset-email`,
    emailRateLimiter,
    require("./authSendPasswordResetEmail").default
  );

  const signInRateLimiter = createRateLimiter({
    max: 20,
    windowMs: 15 * 60 * 1000,
    message: "errors.429",
  });

   app.post(`/auth/sign-in`, signInRateLimiter, require("./authSignIn").default);

   // Demo login - creates a new demo account with 20000 USDT
   app.post(`/auth/demo-login`, require("./authDemoLogin").default);

   const signUpRateLimiter = createRateLimiter({
    max: 20,
    windowMs: 60 * 60 * 1000,
    message: "errors.429",
  });

  // ── Email OTP verification (signup) ──────────────────────────────
  app.post(`/auth/send-otp`, emailRateLimiter, require("./sendOtp").default);
  app.post(`/auth/verify-otp`, require("./verifyOtp").default);

  // ── Forgot password (email OTP) ──────────────────────────────────
  const forgotPasswordRateLimiter = createRateLimiter({
    max: 8,
    windowMs: 15 * 60 * 1000,
    message: "errors.429",
  });

  app.post(
    `/auth/forgot-password/send-otp`,
    forgotPasswordRateLimiter,
    require("./forgotPasswordSendOtp").default
  );
  app.post(
    `/auth/forgot-password/verify-otp`,
    forgotPasswordRateLimiter,
    require("./forgotPasswordVerifyOtp").default
  );
  app.post(
    `/auth/forgot-password/reset`,
    forgotPasswordRateLimiter,
    require("./forgotPasswordReset").default
  );

  app.post(
    `/auth/signupmobile`,
    signUpRateLimiter,
    require("./authSignUpMobile").default
  );

  app.put(`/auth/password-reset`, require("./authPasswordReset").default);

  app.post(`/auth/sign-up`, signUpRateLimiter, require("./authSignUp").default);

  app.put(`/auth/profile`, require("./authUpdateProfile").default);
    app.put(`/auth/profile/mobile`, require('./authUpdateProfileMobile').default);

  app.put(`/auth/change-password`, require("./authPasswordChange").default);

  app.put(`/auth/verify-email`, require("./authVerifyEmail").default);

  app.get(`/auth/me`, require("./authMe").default);
};
