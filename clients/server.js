const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/contactForm', { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    phone: String,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(200).send('Message saved successfully.');
    } catch (error) {
        res.status(500).send('Failed to save the message.');
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5500');
});
