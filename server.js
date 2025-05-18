
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const uniqueIPs = new Set();
const app = express();
const PORT = process.env.PORT || 3000; // ✅ Render provides PORT via env var

app.use(cors());
app.use(express.json());
// POST request to register unique visits based on IP
app.post('/unique-visits', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    uniqueIPs.add(ip);
    res.sendStatus(200);
});

// GET request to return the unique visitor count
app.get('/unique-visits', (req, res) => {
    res.json({ uniqueVisitors: uniqueIPs.size });
});

// Your routes
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
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${name}`,
    text: `You received a new message from your portfolio contact form:
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

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
