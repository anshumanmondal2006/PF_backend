const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/server', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // ✅ from Render env vars
            pass: process.env.EMAIL_PASS  // ✅ from Render env vars
        }
    });

    const mailOptions = {
        from: env.EMAIL_USER,
        to: process.env.EMAIL_USER, // send to yourself
        subject: `New Message from ${name}`,
        text: `You received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Message:
${message}`

    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('❌ Email send error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});
app.get('/', (req, res) => {
    res.send('Server is ready to send messages');
});

