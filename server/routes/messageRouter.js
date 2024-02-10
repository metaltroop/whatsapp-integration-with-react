const express = require('express');
const router = new express.Router();
const whatsappClient = require('../services/whatsapp');

// Set default country code
const defaultCountryCode = '91';

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello world from message router');
});

router.post('/message', async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;

        if (!phoneNumber || !message) {
            throw new Error('Invalid request body. Both phoneNumber and message are required.');
        }

        // Prepend default country code if not already included
        const formattedPhoneNumber = phoneNumber.startsWith('91') ? phoneNumber : defaultCountryCode + phoneNumber;

        // Append @c.us if not already included
        const finalPhoneNumber = formattedPhoneNumber.endsWith('@c.us') ? formattedPhoneNumber : formattedPhoneNumber + '@c.us';

        console.log(finalPhoneNumber);

        await whatsappClient.sendMessage(finalPhoneNumber, message);
        await whatsappClient.sendMessage(finalPhoneNumber,"send yes to confirm")
        res.send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
