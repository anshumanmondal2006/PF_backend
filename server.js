const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Render provides PORT via env var

app.use(cors());
app.use(express.json());

// Your routes
app.post('/server', async (req, res) => {
    const { name, email, message } = req.body;
    // validate and send email logic
    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.send('Server is ready to send messages');
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
