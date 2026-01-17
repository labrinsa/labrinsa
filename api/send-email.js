import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, quoteItems, honeypot } = req.body;

    // 1. Honeypot check
    if (honeypot) {
        return res.status(200).json({ success: true, message: 'Spam detected' });
    }

    // 2. Validation
    if (!name || !email || !quoteItems || !Array.isArray(quoteItems) || quoteItems.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const DEST_EMAIL = 'sjhesua@gmail.com';

    const productListHtml = quoteItems.map(item =>
        `<li><strong>${item.name}</strong> - Cantidad: ${item.quantity}</li>`
    ).join('');

    try {
        const { data, error } = await resend.emails.send({
            from: 'Solicitudes Labrinsa <onboarding@resend.dev>', // Change to your verified domain in production
            to: [DEST_EMAIL],
            subject: `Nuevo Presupuesto: ${name}`,
            reply_to: email,
            html: `
        <h2>Nueva Solicitud de Presupuesto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <hr />
        <h3>Productos:</h3>
        <ul>
          ${productListHtml}
        </ul>
        <hr />
        <p><strong>Mensaje adicional:</strong></p>
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
