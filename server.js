// require('dotenv').config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// const sendSMS = async (body, phoneNumber) => {
//   let msgOptions = {
//     from: process.env.TWILIO_FROM_NUMBER,
//     to: phoneNumber,
//     body,
//   };

//   try {
//     const message = await client.messages.create(msgOptions);
//     console.log('Message sent:', message.sid);
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// };

// sendSMS('Hello from Node.js App');
 
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(cors());

app.post('/send-message', async(req, res) => {
  const { phoneNumber, message } = req.body;
  console.log("*********************");

  // let msgOptions = {
  //   from: process.env.TWILIO_FROM_NUMBER,
  //   to: phoneNumber,
  //   body: message,
  // };

  // try {
  //   const msg = await client.messages.create(msgOptions);
  //   console.log('Message sent:', msg.sid);
  //   res.status(200).send({ sid: msg.sid });
  // } catch (error) {
  //   console.error('Error sending message:', error);
  //   res.status(500).send({ error: error.msg });
  // }

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then((message) => res.status(200).send({ sid: message.sid }))
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send({ error: error.message });
    });
});

app.get('/get-account-sid', (req, res) => {
  if (!accountSid) {
    console.error('TWILIO_ACCOUNT_SID is not set');
    res.status(500).send({ error: 'TWILIO_ACCOUNT_SID is not set' });
  } else {
    res.status(200).send({ accountSid });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// node server.js
// npm start
