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
            <h3>Productos Sugeridos:</h3>
            <ul>
                ${quoteItems.map(item => `<li><strong>${item.name}</strong> - Cantidad: ${item.quantity}</li>`).join('')}
            </ul>
            <hr />
        `;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Solicitudes Labrinsa <notificaciones@labrinsa.net>', // Asegúrate de verificar este dominio en Resend
            to: [DEST_EMAIL],
            subject: isQuote ? `Nuevo Presupuesto: ${name}` : `Contacto: ${subject} - ${name}`,
            reply_to: email,
            html: `
        <h2>${isQuote ? 'Nueva Solicitud de Presupuesto' : 'Nuevo Mensaje de Contacto'}</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        ${!isQuote ? `<p><strong>Asunto:</strong> ${subject}</p>` : ''}
        <hr />
        ${productListHtml}
        <p><strong>Mensaje:</strong></p>
        <p>${message || 'Sin mensaje adicional.'}</p>
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
