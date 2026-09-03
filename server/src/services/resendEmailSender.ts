import { getConfig } from '../config';

export default class ResendEmailSender {
  static get isConfigured() {
    return Boolean(getConfig().RESEND_API_KEY && getConfig().RESEND_EMAIL_FROM);
  }

  static get from() {
    const name = getConfig().RESEND_FROM_NAME;
    const email = getConfig().RESEND_EMAIL_FROM;
    return name ? `${name} <${email}>` : email;
  }

  static async send({ to, subject, html }) {
    if (!ResendEmailSender.isConfigured) {
      console.error('Resend is not configured. Set RESEND_API_KEY and RESEND_EMAIL_FROM.');
      return;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getConfig().RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: ResendEmailSender.from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error sending Resend email (status ${response.status}): ${errorBody}`);
      return;
    }

    return response.json();
  }

  static async sendWelcomeEmail(to, uid) {
    const brand = getConfig().RESEND_FROM_NAME || 'our platform';

    return ResendEmailSender.send({
      to,
      subject: `Welcome to ${brand} - Registration Successful`,
      html: welcomeEmailHtml({ brand, uid }),
    });
  }

  static async sendPasswordResetOtpEmail(to, code) {
    const brand = getConfig().RESEND_FROM_NAME || 'our platform';

    return ResendEmailSender.send({
      to,
      subject: `${code} is your ${brand} password reset code`,
      html: passwordResetOtpEmailHtml({ brand, code }),
    });
  }
}

function welcomeEmailHtml({ brand, uid }: { brand: string; uid: string }) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f2f4f7; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden;">
            <tr>
              <td align="center" style="padding:40px 32px 24px 32px;">
                <table role="presentation" width="72" height="72" cellpadding="0" cellspacing="0" style="background-color:#e6f7ee; border-radius:50%;">
                  <tr>
                    <td align="center" valign="middle" style="width:72px; height:72px;">
                      <span style="font-size:36px; line-height:1; color:#17a35a;">&#10003;</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 32px;">
                <h1 style="margin:0 0 12px 0; font-size:24px; line-height:1.3; color:#1f2d3d;">Congratulations!</h1>
                <p style="margin:0 0 8px 0; font-size:16px; line-height:1.5; color:#3b3f44;">
                  You have successfully registered an account with <strong>${escapeHtml(brand)}</strong>.
                </p>
                <p style="margin:24px 0 0 0; font-size:14px; line-height:1.5; color:#6b7280;">
                  Your account UID
                </p>
                <p style="margin:4px 0 0 0; font-size:20px; font-weight:bold; letter-spacing:1px; color:#1f2d3d;">
                  ${escapeHtml(uid)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <hr style="border:none; border-top:1px solid #eef0f3; margin:0 0 20px 0;" />
                <p style="margin:0; font-size:12px; line-height:1.5; color:#9aa1ab; text-align:center;">
                  If you did not create this account, please contact our support team immediately.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function passwordResetOtpEmailHtml({ brand, code }: { brand: string; code: string }) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f2f4f7; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden;">
            <tr>
              <td align="center" style="padding:40px 32px 16px 32px;">
                <h1 style="margin:0 0 8px 0; font-size:22px; line-height:1.3; color:#1f2d3d;">Reset your password</h1>
                <p style="margin:0; font-size:14px; line-height:1.5; color:#6b7280;">
                  Use the code below to reset the password for your <strong>${escapeHtml(brand)}</strong> account.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 32px 24px 32px;">
                <div style="font-size:34px; font-weight:800; letter-spacing:8px; color:#111827; background:#f3f6ff; border:1px solid #dbe7ff; border-radius:12px; padding:18px; text-align:center;">
                  ${escapeHtml(code)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px 32px;">
                <p style="margin:0 0 16px 0; font-size:13px; line-height:1.5; color:#888;">
                  This code expires in 10 minutes. If you did not request a password reset, you can safely ignore this email &mdash; your password will not be changed.
                </p>
                <hr style="border:none; border-top:1px solid #eef0f3; margin:0 0 16px 0;" />
                <p style="margin:0; font-size:12px; line-height:1.5; color:#9aa1ab; text-align:center;">
                  Never share this code with anyone, including ${escapeHtml(brand)} staff.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
