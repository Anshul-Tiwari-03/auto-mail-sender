const express = require("express");
const app = express();
const cron = require("node-cron");
const { authenticate } = require("@google-cloud/local-auth");
const mailController = require("./controllers/MailController");
const path=require('path');
const { google } = require("googleapis");

const port = 4080;

app.get("/", async (req, res) => {
  const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://mail.google.com/",
  ];

  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "secrets/credentials.json"),
    scopes: SCOPES,
  });

  const gmail = google.gmail({ version: "v1", auth });
  console.log("OUR CRON JOB IS SUPPOSED TO WORK FOR EVERY 2 MINS.")
  cron.schedule("*/2 * * * *", () => {
    mailController.main(auth);
  });

  res.json({ "this is Auth": auth });
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
