import { Resend } from 'resend';

export default async function handler(req, res) {
    // 0. Initialize Resend inside handler to prevent crash on cold start if key is missing
    const apiKey = process.env.RESEND_API_KEY;
    const DEST_EMAIL = process.env.DEST_EMAIL;

    if (!apiKey) {
        console.error('CRITICAL: RESEND_API_KEY is not defined in environment variables.');
        return res.status(500).json({
            error: 'Email service configuration error',
            details: 'The RESEND_API_KEY is missing. Please add it to Vercel Environment Variables.'
        });
    }

    const resend = new Resend(apiKey);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, quoteItems, subject, honeypot } = req.body;

    // 1. Honeypot check
    if (honeypot) {
        return res.status(200).json({ success: true, message: 'Spam detected' });
    }

    // 2. Validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const isQuote = quoteItems && Array.isArray(quoteItems) && quoteItems.length > 0;

    if (!isQuote && !subject) {
        return res.status(400).json({ error: 'Missing required fields: quoteItems or subject' });
    }

    let productListHtml = '';
    if (isQuote) {
        productListHtml = `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Productos Solicitados</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #cbd5e1; color: #64748b;">Producto</th>
                            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #cbd5e1; color: #64748b;">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${quoteItems.map(item => `
                            <tr>
                                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #334155;"><strong>${item.name}</strong></td>
                                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; text-align: center; color: #334155;">${item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Labrinsa <pedido@labrinsa.net>', // Asegúrate de verificar este dominio en Resend
            to: [DEST_EMAIL],
            subject: isQuote ? `Nuevo presupuesto para "${email}"` : `Contacto: ${subject} - ${name}`,
            reply_to: email,
            html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 20px 0; border-bottom: 4px solid #dc2626; }
                .content { padding: 30px 0; }
                .footer { text-align: center; font-size: 12px; color: #94a3b8; padding-top: 20px; border-top: 1px solid #e2e8f0; }
                .info-item { margin-bottom: 10px; }
                .label { font-weight: bold; color: #1e293b; min-width: 80px; display: inline-block; }
                .badge { background-color: #dc2626; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://labrinsa.net/cropped-Logo-Labrin-solo-small.png" alt="Labrinsa Logo" style="height: 60px; width: auto;">
                </div>
                <div class="content">
                    <div class="badge">${isQuote ? 'SOLICITUD DE PRESUPUESTO' : 'NUEVO CONTACTO'}</div>
                    
                    <div class="info-item">
                        <span class="label">Nombre del cliente:</span> ${name}
                    </div>
                    <div class="info-item">
                        <span class="label">Correo del cliente:</span> <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a>
                    </div>
                    ${!isQuote && subject ? `
                        <div class="info-item">
                            <span class="label">Asunto:</span> ${subject}
                        </div>
                    ` : ''}

                    ${productListHtml}

                    <div style="margin-top: 25px;">
                        <h4 style="color: #1e293b; margin-bottom: 10px;">Mensaje:</h4>
                        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; color: #475569; border-left: 4px solid #cbd5e1;">
                            ${(message || 'Sin mensaje adicional.').replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <p>Este es un mensaje automático enviado desde el sitio web de <strong>Laboratorios Rincón S.A.</strong></p>
                    <p>&copy; ${new Date().getFullYear()} Labrinsa - Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return res.status(500).json({ error: 'Error sending email' });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
