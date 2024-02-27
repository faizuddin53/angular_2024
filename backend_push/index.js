const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/data", (req, res) => {
  console.log("request came");
  const userData = req.body;
  console.log(JSON.stringify(userData));
  res.send(userData);
});

// console.log(webpush.generateVAPIDKeys());

const publicKey =
  "BKdlkDHfRotf8VRSuGDIQi2QzmTlDm5q1F-bgqUgrWN00nnZWOHJjZim863mKH-oHV-XqbpsjdERTqz_elNbabo";
const privateKey = "yV1jCTgLACHDBM4JP_AsAuHZ8S9ajycSatSvpctvk70";

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cYgShOJiczE:APA91bHQ8tuX1LL-H4Ng8Fl_dGZxXDKCw2LiimqYVA4jbfVfx4ex8nSpJMtjZnDsqiUqEQc-B0s7yoTaaxQjEMPYBjRnUd2nS5Qr0MHZUHlhjFtTNLVb649uOgIOxoH1mzX3gXw3Iwes",
  expirationTime: null,
  keys: {
    p256dh:
      "BHWDoiDAsB5lWlE-ouTBwwqiggQbZEi1n-Vomues2NKKwUE_JXRVZtff5U1nx07-GJUcZAj-wO4wmYh7b5jCw-I",
    auth: "_8eIL_phiJRzKR4S0XPglQ",
  },
};

// Backend side
// Step 2 : register VapidDetails

webpush.setVapidDetails('mailto:example@yourdomain.org', publicKey, privateKey);



const options = {
  gcmAPIKey: "your_GCM_API_key_here",
  vapidDetails: {
    subject: "mailto:your_email@example.com", // Your email address
    publicKey:
      "BMmotkjgCIrWsIq_hYhs_FTARvX6HgKCwgsLJnH-ZaxM4CFv8u8VhfLNsUgIiAHy6GnlRz8PRmYJYMQcNfbzz7Y", // Your VAPID public key
    privateKey: "DFWB9LPM5UEi7chWlX9YeiZhJmDLy6YUi2O0n_poc5w", // Your VAPID private key
  },
  timeout: 3000, // Timeout in milliseconds (e.g., 3000 for 3 seconds)
  TTL: 60, // Time to live for notifications in seconds
  headers: {
    "Your-Custom-Header": "header_value_here",
  },
  contentEncoding: "aes128gcm", // Content encoding type
  urgency: "normal", // Notification urgency (can be 'high' or 'normal')
  topic: "Youtube", // Notification topic

  proxy: "your_proxy_server_options_here", // Proxy server options if any
  agent: "your_https_Agent_instance_here", // HTTPS Agent instance if any
};

//backend side
//Step 3: Send notification
const payLoad = {
  notification: {
    data: { url: "https://www.youtube.com/watch?v=m3PQLHw6F28" },
    title: "Youtube Notification",
    vibrate: [100, 50, 100],
  },
};

webpush.sendNotification(pushSubscription, JSON.stringify(payLoad));

//   publicKey: 'BIPF9qVkhe6HHazl0k93VY-YTxVS_aPv7jCQQhT8Llm7BbkGuIXFFOxO3thJURshiwbR45O0oN8s2lXw_iWytVc',
//   privateKey: 'lWNR0t9InWpI-7drmm1BZsoMZA_0FyvUHq6C8zWbtTM'

// for unique user code
// const webpush = require('web-push');
// const fs = require('fs');

// // Set up email for VAPID details (optional)
// const vapidEmail = 'your_email@example.com';

// // Function to generate unique VAPID keys for a user
// function generateUserVapidKeys() {
//     return webpush.generateVAPIDKeys();
// }

// // Function to store VAPID keys for a user
// function storeUserVapidKeys(userEmail, vapidKeys) {
//     // In this example, we'll just log the keys, but in a real scenario, you would save these to a database
//     console.log(`Storing VAPID keys for user ${userEmail}:`, vapidKeys);
// }

// // Function to generate and store VAPID keys for a user
// function generateAndStoreUserKeys(userEmail) {
//     const userVapidKeys = generateUserVapidKeys();
//     storeUserVapidKeys(userEmail, userVapidKeys);
// }

// // Example usage:
// const userEmail = 'user@example.com';
// generateAndStoreUserKeys(userEmail);
