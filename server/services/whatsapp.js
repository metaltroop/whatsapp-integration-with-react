const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const whatsappClient = new Client({
    authStrategy: new LocalAuth()
})

whatsappClient.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

whatsappClient.on('ready', () => {
    console.log('Client is ready!')
})

whatsappClient.on('message', async (msg) => {
    try {
        if (msg.from != "status@broadcast") {
            const contact = await msg.getContact()
            console.log(contact, msg.body) 

        }
    } catch (error) {
        console.log(error)
    }
})

module.exports =  whatsappClient