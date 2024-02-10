const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/messageRouter');
const whatsappClient = require('./services/whatsapp');
const cors = require('cors');





whatsappClient.initialize(); 
const app = express();
const port = 3001;
const allowedOrigins = ['http://localhost:5173']; // Replace with your Angular app's origin

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


app.use(router)

app.use(bodyParser.json());




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

