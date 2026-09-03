import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthService from "src/modules/auth/authService";
import Errors from "src/modules/shared/error/errors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";

const RESEND_COOLDOWN_SECONDS = 60;

const emailSchema = yup.object().shape({
  email: yupFormSchemas
    .string("Email", { required: true })
    .email("Please enter a valid email address"),
});

const codeSchema = yup.object().shape({
  code: yupFormSchemas.string("Code", {
    required: true,
    min: 6,
    max: 6,
    matches: /^[0-9]{6}$/,
  }),
});

const passwordSchema = yup.object().shape({
  newPassword: yupFormSchemas.string("New password", {
    required: true,
    min: 8,
  }),
  confirmPassword: yupFormSchemas
    .string("Confirm password", { required: true })
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

function ForgotPassword() {
  const history = useHistory();

  // 'email' -> 'otp' -> 'password' -> 'done'
  const [step, setStep] = useState<"email" | "otp" | "password" | "done">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const emailForm = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onSubmit",
    defaultValues: { email: "" },
  });

  const codeForm = useForm({
    resolver: yupResolver(codeSchema),
    mode: "onSubmit",
    defaultValues: { code: "" },
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    };
  }, []);

  const startCooldown = () => {
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    cooldownTimer.current = setInterval(() => {
      setResendCooldown((value) => {
        if (value <= 1) {
          if (cooldownTimer.current) clearInterval(cooldownTimer.current);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  };

  const sendCode = async (targetEmail: string) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await AuthService.sendForgotPasswordOtp(targetEmail);
      setEmail(targetEmail);
      setStep("otp");
      startCooldown();
    } catch (error) {
      setErrorMessage(Errors.selectMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onSubmitEmail = ({ email: submittedEmail }) => {
    sendCode(submittedEmail);
  };

  const onResendCode = () => {
    if (resendCooldown > 0 || loading) return;
    sendCode(email);
  };

  const onSubmitCode = async ({ code }) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await AuthService.verifyForgotPasswordOtp(email, code);
      setStep("password");
    } catch (error) {
      setErrorMessage(Errors.selectMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPassword = async ({ newPassword }) => {
    setLoading(true);
    setErrorMessage("");
    try {
      await AuthService.resetPasswordWithOtp(email, newPassword);
      setStep("done");
    } catch (error) {
      setErrorMessage(Errors.selectMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setErrorMessage("");
    if (step === "otp") {
      setStep("email");
      return;
    }
    if (step === "password") {
      setStep("otp");
      return;
    }
    history.goBack();
  };

  const stepTitle = {
    email: "Forgot Password",
    otp: "Verify Code",
    password: "New Password",
    done: "All Set",
  }[step];

  return (
    <div className="fp-container">
      <div className="fp-header">
        <div className="fp-header-left" onClick={goBack}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="fp-header-title">{stepTitle}</div>
        <div className="fp-header-right" />
      </div>

      <div className="fp-card">
        {errorMessage && <div className="fp-error-message">{errorMessage}</div>}

        {step === "email" && (
          <>
            <div className="fp-heading">Reset your password</div>
            <div className="fp-subtext">
              Enter the email address linked to your account. We'll send you a
              verification code.
            </div>
            <FormProvider {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
                <InputFormItem
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="fp-input"
                  autoComplete="email"
                  autoFocus
                />
                <button className="fp-button" disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }} />
                      Sending...
                    </>
                  ) : (
                    "Send Code"
                  )}
                </button>
              </form>
            </FormProvider>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="fp-heading">Check your email</div>
            <div className="fp-subtext">
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below to
              continue.
            </div>
            <FormProvider {...codeForm}>
              <form onSubmit={codeForm.handleSubmit(onSubmitCode)}>
                <InputFormItem
                  type="text"
                  name="code"
                  placeholder="6-digit code"
                  className="fp-input fp-code-input"
                  autoComplete="one-time-code"
                  autoFocus
                />
                <button className="fp-button" disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }} />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>
            </FormProvider>
            <div className="fp-resend-row">
              {resendCooldown > 0 ? (
                <span className="fp-resend-disabled">Resend code in {resendCooldown}s</span>
              ) : (
                <span className="fp-resend-link" onClick={onResendCode}>
                  Resend code
                </span>
              )}
            </div>
          </>
        )}

        {step === "password" && (
          <>
            <div className="fp-heading">Create a new password</div>
            <div className="fp-subtext">
              Choose a new password for your account. It must be at least 8
              characters.
            </div>
            <FormProvider {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
                <InputFormItem
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  className="fp-input"
                  autoComplete="new-password"
                  autoFocus
                />
                <InputFormItem
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="fp-input"
                  autoComplete="new-password"
                />
                <button className="fp-button" disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }} />
                      Saving...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </FormProvider>
          </>
        )}

        {step === "done" && (
          <div className="fp-success">
            <div className="fp-success-icon">
              <i className="fas fa-check" />
            </div>
            <div className="fp-heading">Password reset</div>
            <div className="fp-subtext">
              Your password has been changed successfully. You can now sign in
              with your new password.
            </div>
            <Link to="/auth/signin" className="fp-button fp-button-link">
              Back to Sign In
            </Link>
          </div>
        )}

        {step !== "done" && (
          <Link to="/auth/signin" className="fp-bottom-text">
            Remembered your password? Sign in
          </Link>
        )}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .fp-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .fp-header {
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .fp-header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .fp-header-left:hover {
          opacity: 1;
        }
        .fp-header-left i {
          font-size: 16px;
        }

        .fp-header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .fp-header-right {
          width: 60px;
        }

        .fp-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 34px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .fp-heading {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .fp-subtext {
          text-align: center;
          font-size: 13px;
          color: #777;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .fp-input {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 48px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          margin-bottom: 14px;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .fp-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .fp-input::placeholder {
          color: #aaa;
        }

        .fp-code-input {
          text-align: center;
          letter-spacing: 8px;
          font-size: 20px;
          font-weight: 700;
        }

        .fp-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 6px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .fp-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .fp-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .fp-button-link {
          margin-top: 20px;
        }

        .fp-resend-row {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
        }
        .fp-resend-link {
          color: #106cf5;
          font-weight: 600;
          cursor: pointer;
        }
        .fp-resend-link:hover {
          text-decoration: underline;
        }
        .fp-resend-disabled {
          color: #999;
        }

        .fp-bottom-text {
          text-align: center;
          font-size: 14px;
          color: #777;
          text-decoration: none;
          display: block;
          margin-top: 24px;
        }
        .fp-bottom-text:hover {
          color: #106cf5;
        }

        .fp-error-message {
          color: #ff4d4d;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px 12px;
          background-color: #fff5f5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #ffcccc;
        }

        .fp-success {
          text-align: center;
        }
        .fp-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e6f7ee;
          color: #17a35a;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;
