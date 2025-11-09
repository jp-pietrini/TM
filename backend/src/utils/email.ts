import dotenv from 'dotenv';
dotenv.config(); // Load env vars first

import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY not set - email sending will not work');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@trustme.mx';
const FROM_NAME = 'TrustMe';

interface EmailParams {
  to: string;
  subject: string;
  template: 'email-verification' | 'password-reset' | 'welcome' | 'worker-approved' | 'worker-rejected';
  data: Record<string, any>;
}

/**
 * Email HTML templates
 */
const emailTemplates = {
  'email-verification': (data: {verificationUrl: string; email: string }) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifica tu correo electrónico</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TrustMe</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Verifica tu correo electrónico</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Hola,
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Gracias por registrarte en TrustMe. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el botón de abajo:
            </p>
            <table style="width: 100%; margin: 30px 0;">
              <tr>
                <td style="text-align: center;">
                  <a href="${data.verificationUrl}" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                    Verificar correo electrónico
                  </a>
                </td>
              </tr>
            </table>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 10px 0; font-size: 14px;">
              O copia y pega este enlace en tu navegador:
            </p>
            <p style="color: #0ea5e9; line-height: 1.6; margin: 0 0 20px 0; font-size: 14px; word-break: break-all;">
              ${data.verificationUrl}
            </p>
            <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 14px;">
              Este enlace expirará en 24 horas por seguridad.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              Si no creaste esta cuenta, puedes ignorar este correo de forma segura.
            </p>
            <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 12px;">
              © ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  'password-reset': (data: { resetUrl: string; email: string }) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer contraseña</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TrustMe</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Restablecer contraseña</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Hola,
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña:
            </p>
            <table style="width: 100%; margin: 30px 0;">
              <tr>
                <td style="text-align: center;">
                  <a href="${data.resetUrl}" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                    Restablecer contraseña
                  </a>
                </td>
              </tr>
            </table>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 10px 0; font-size: 14px;">
              O copia y pega este enlace en tu navegador:
            </p>
            <p style="color: #0ea5e9; line-height: 1.6; margin: 0 0 20px 0; font-size: 14px; word-break: break-all;">
              ${data.resetUrl}
            </p>
            <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 14px;">
              Este enlace expirará en 1 hora por seguridad.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              Si no solicitaste restablecer tu contraseña, puedes ignorar este correo de forma segura.
            </p>
            <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 12px;">
              © ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  'welcome': (data: { name: string; role: string }) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a TrustMe</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TrustMe</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">¡Bienvenido a TrustMe!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Hola ${data.name},
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Tu registro se ha completado exitosamente. Estamos emocionados de tenerte en nuestra plataforma.
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Como ${data.role === 'client' ? 'cliente' : 'profesional'}, ahora puedes ${data.role === 'client' ? 'buscar profesionales y crear solicitudes de servicio' : 'ver oportunidades de trabajo y empezar a crecer tu negocio'}.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  'worker-approved': (data: { name: string }) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Tu perfil ha sido aprobado!</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">¡Felicidades!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Tu perfil ha sido aprobado</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Hola ${data.name},
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              ¡Excelentes noticias! Tu perfil de profesional ha sido revisado y aprobado por nuestro equipo.
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Ahora puedes empezar a ver oportunidades de trabajo, comprar leads y hacer crecer tu negocio en TrustMe.
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Recuerda: ¡Tu primera semana es gratis! Puedes comprar leads sin costo durante los próximos 7 días.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  'worker-rejected': (data: { name: string; reason: string }) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Actualización de tu solicitud</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">TrustMe</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Actualización de tu solicitud</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Hola ${data.name},
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
              Gracias por tu interés en unirte a TrustMe como profesional. Desafortunadamente, no podemos aprobar tu perfil en este momento.
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 10px 0;">
              <strong>Razón:</strong>
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
              ${data.reason}
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin: 0;">
              Si tienes preguntas o deseas más información, no dudes en contactarnos.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
};

/**
 * Send email using SendGrid
 */
export async function sendEmail(params: EmailParams): Promise<void> {
  const { to, subject, template, data } = params;

  try {
    const html = emailTemplates[template](data as any);

    const msg = {
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html,
      // Disable click tracking for development (causes SSL issues with tracking URLs)
      trackingSettings: {
        clickTracking: {
          enable: false,
          enableText: false,
        },
        openTracking: {
          enable: false,
        },
      },
    };

    // Send email in both development and production for MVP testing
    try {
      await sgMail.send(msg);
      console.log(`✅ Email sent to ${to}: ${subject}`);
    } catch (sendError: any) {
      console.error('❌ SendGrid error:', sendError.response?.body || sendError.message);

      // Log email details for debugging
      console.log('📧 Email details:');
      console.log(`To: ${to}`);
      console.log(`From: ${FROM_EMAIL}`);
      console.log(`Subject: ${subject}`);
      console.log(`Template: ${template}`);

      throw sendError;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
