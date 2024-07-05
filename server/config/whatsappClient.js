const { Client, LocalAuth } = require('whatsapp-web.js');

const initializeWhatsAppClient = (io) => {
    const client = new Client({
        webVersionCache: {
            type: "remote",
            remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
        },
        authStrategy: new LocalAuth({
            clientId: 'asif'
        }),
        puppeteer: { headless: false },
    });

    client.on('qr', (qrCode) => {
        console.log(qrCode);
        io.emit('qrCodeEvent', { msg: 'QR Code Generated Successfully', qr: qrCode, status: true });
    });

    client.on('auth_failure', (error) => {
        console.error('Authentication failed:', error);
        process.exit();
    });

    client.on('ready', () => {
        console.log('Client is Ready');
    });

    client.on('disconnected', () => {
        console.log('disconnected');
    });

    client.initialize().then(() => {
        console.log('Client initialized successfully');
    }).catch((err) => {
        console.error('Error initializing client:', err);
        process.exit();
    });
};

module.exports = { initializeWhatsAppClient };
