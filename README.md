# OTP (One-Time Password) Scam Prevention System

This project aims to protect users from fraudulent activities, such as phishing and unauthorized transactions, by implementing a secure OTP-based validation system. With the integration of **Twilio's Messaging API** and **Firebase Firestore**, OTPs are sent through SMS and verified before any sensitive action, like payment, is processed.

---

![System Overview](https://github.com/adiityack/otp_based_fraud_prevention_secure/blob/master/working.png)  
![Report Overview](https://github.com/adiityack/otp_based_fraud_prevention_secure/blob/master/report.png)

---

## Key Features

- **Secure OTP Verification**: Ensures that sensitive actions are authorized only after OTP validation.
- **Twilio Integration**: Sends OTPs directly to users via SMS using Twilio’s reliable messaging platform.
- **Firestore Database**: Manages and stores user-related data securely in Firebase Firestore.

---

## Available Scripts

### `npm start`
- Launches the application in development mode.
- Open the app in your browser at [http://localhost:3000](http://localhost:3000).
- Automatically reloads when edits are made.

### `node server.js`
- Runs the backend server.
- Ensure all dependencies are installed and Firebase/Twilio configurations are set up before running the project.

---

## Firebase Setup

To configure Firebase Firestore:

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Set up the Firestore Database for managing the required data.

---

## Twilio Setup

To enable OTP sending via SMS:

1. Sign up for a [Twilio account](https://www.twilio.com/).
2. Create a project and get your credentials (Account SID, Auth Token, and Twilio Phone Number).
3. Add these credentials to the environment variables in your project.

---

## Running the Backend

Start the backend server by running `node server.js`. The server runs on [http://localhost:8000](http://localhost:8000). Ensure Twilio credentials are properly set up for smooth operation.

---

## Learn More

For more details, refer to the [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started) or check out the [React Documentation](https://reactjs.org/).

---


