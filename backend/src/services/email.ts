import sgMail from '@sendgrid/mail';

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'info@trustme.mx';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'TrustMe';

// Initialize SendGrid - lazy load to ensure env is loaded
let isInitialized = false;
function initializeSendGrid() {
  if (!isInitialized) {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY environment variable is not set');
    }
    sgMail.setApiKey(apiKey);
    isInitialized = true;
  }
}

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  initializeSendGrid();

  const msg = {
    to: options.to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${options.to}: ${options.subject}`);
  } catch (error: any) {
    console.error('❌ Email send error:', error);
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
    throw new Error('Failed to send email');
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(
  email: string,
  name: string,
  role: 'client' | 'worker'
): Promise<void> {
  const subject = '¡Bienvenido a TrustMe! 🎉';

  const text = `
Hola ${name},

¡Bienvenido a TrustMe!

${role === 'worker'
  ? 'Estás a un paso de comenzar a recibir leads de clientes que necesitan tus servicios. Completa tu perfil y empieza a crecer tu negocio.'
  : 'Ahora puedes encontrar los mejores profesionales para tus proyectos de manera rápida y confiable.'
}

Próximos pasos:
${role === 'worker'
  ? `1. Completa tu perfil profesional
2. Sube fotos de tus trabajos anteriores
3. Recibe tu primera semana GRATIS (300 MXN de crédito)
4. Comienza a recibir leads`
  : `1. Completa tu perfil
2. Publica tu primer proyecto
3. Conecta con profesionales verificados
4. ¡Comienza tu proyecto!`
}

Si tienes alguna pregunta, estamos aquí para ayudarte.

¡Éxito!
El equipo de TrustMe
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0080FF 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .steps {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .steps ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    .steps li {
      margin: 8px 0;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      background: #00BFFF;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>¡Bienvenido a TrustMe! 🎉</h1>
  </div>
  <div class="content">
    <p>Hola <strong>${name}</strong>,</p>

    <p>${role === 'worker'
      ? 'Estás a un paso de comenzar a recibir leads de clientes que necesitan tus servicios. Completa tu perfil y empieza a crecer tu negocio.'
      : 'Ahora puedes encontrar los mejores profesionales para tus proyectos de manera rápida y confiable.'
    }</p>

    <div class="steps">
      <h3>Próximos pasos:</h3>
      <ol>
        ${role === 'worker'
          ? `<li>Completa tu perfil profesional</li>
             <li>Sube fotos de tus trabajos anteriores</li>
             <li>Recibe tu primera semana GRATIS (300 MXN de crédito)</li>
             <li>Comienza a recibir leads</li>`
          : `<li>Completa tu perfil</li>
             <li>Publica tu primer proyecto</li>
             <li>Conecta con profesionales verificados</li>
             <li>¡Comienza tu proyecto!</li>`
        }
      </ol>
    </div>

    <div class="cta">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">
        Ir a TrustMe
      </a>
    </div>

    <p>Si tienes alguna pregunta, estamos aquí para ayudarte.</p>

    <p><strong>¡Éxito!<br>El equipo de TrustMe</strong></p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  verificationCode: string
): Promise<void> {
  const subject = 'Verifica tu correo electrónico - TrustMe';

  const text = `
Tu código de verificación es: ${verificationCode}

Este código expira en 15 minutos.

Si no solicitaste este código, ignora este mensaje.

El equipo de TrustMe
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0080FF 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .code-box {
      background: #f8f9fa;
      border: 2px dashed #00BFFF;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 30px 0;
    }
    .code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #00BFFF;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verifica tu correo electrónico</h1>
  </div>
  <div class="content">
    <p>Tu código de verificación es:</p>

    <div class="code-box">
      <div class="code">${verificationCode}</div>
    </div>

    <p style="text-align: center; color: #666;">
      <small>Este código expira en 15 minutos.</small>
    </p>

    <p style="margin-top: 30px;">
      Si no solicitaste este código, ignora este mensaje.
    </p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  const subject = 'Restablecer tu contraseña - TrustMe';

  const text = `
Hola,

Recibimos una solicitud para restablecer tu contraseña.

Haz clic en el siguiente enlace para crear una nueva contraseña:
${resetUrl}

Este enlace expira en 1 hora.

Si no solicitaste restablecer tu contraseña, ignora este mensaje.

El equipo de TrustMe
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0080FF 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      background: #00BFFF;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Restablecer contraseña</h1>
  </div>
  <div class="content">
    <p>Hola,</p>

    <p>Recibimos una solicitud para restablecer tu contraseña.</p>

    <div class="cta">
      <a href="${resetUrl}" class="button">
        Restablecer contraseña
      </a>
    </div>

    <p style="text-align: center; color: #666;">
      <small>Este enlace expira en 1 hora.</small>
    </p>

    <p style="margin-top: 30px;">
      Si no solicitaste restablecer tu contraseña, ignora este mensaje.
    </p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}

/**
 * Send new lead notification to worker
 */
export async function sendNewLeadNotification(
  email: string,
  workerName: string,
  leadTitle: string,
  leadDescription: string
): Promise<void> {
  const subject = '¡Nuevo Lead Disponible! - TrustMe';

  const text = `
Hola ${workerName},

¡Tienes un nuevo lead disponible!

${leadTitle}

${leadDescription}

Ingresa a TrustMe para ver los detalles completos y contactar al cliente.

El equipo de TrustMe
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0080FF 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .lead-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #00BFFF;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      background: #00BFFF;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>¡Nuevo Lead Disponible! 🎯</h1>
  </div>
  <div class="content">
    <p>Hola <strong>${workerName}</strong>,</p>

    <p>¡Tienes un nuevo lead disponible!</p>

    <div class="lead-box">
      <h3 style="margin-top: 0;">${leadTitle}</h3>
      <p>${leadDescription}</p>
    </div>

    <div class="cta">
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/leads" class="button">
        Ver Lead Completo
      </a>
    </div>

    <p>Ingresa a TrustMe para ver los detalles completos y contactar al cliente.</p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}

/**
 * Send refund notification email
 */
export async function sendRefundNotification(
  email: string,
  userName: string,
  amount: number,
  reason: string
): Promise<void> {
  const subject = 'Reembolso Procesado - TrustMe';

  const text = `
Hola ${userName},

Tu reembolso ha sido procesado exitosamente.

Monto: $${amount.toFixed(2)} MXN
Motivo: ${reason}

El monto será devuelto a tu cartera de TrustMe y estará disponible inmediatamente.

Si tienes alguna pregunta, no dudes en contactarnos.

El equipo de TrustMe
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0080FF 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .amount-box {
      background: #e8f5e9;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 20px 0;
    }
    .amount {
      font-size: 32px;
      font-weight: bold;
      color: #2e7d32;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Reembolso Procesado ✅</h1>
  </div>
  <div class="content">
    <p>Hola <strong>${userName}</strong>,</p>

    <p>Tu reembolso ha sido procesado exitosamente.</p>

    <div class="amount-box">
      <div class="amount">$${amount.toFixed(2)} MXN</div>
      <p style="margin: 10px 0 0 0; color: #666;">Motivo: ${reason}</p>
    </div>

    <p>El monto será devuelto a tu cartera de TrustMe y estará disponible inmediatamente.</p>

    <p style="margin-top: 30px;">
      Si tienes alguna pregunta, no dudes en contactarnos.
    </p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} TrustMe. Todos los derechos reservados.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}
