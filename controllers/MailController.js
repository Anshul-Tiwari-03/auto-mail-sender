const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

// Name of the label to be created
const labelName = "Assignment Vacation Auto-Reply";

/**
 * Fetches unread messages from the inbox that match the specified criteria.
 *
 * @param {Object} auth - The authenticated Google API client.
 * @returns {Array} - List of unread messages.
 */
async function getUnrepliesMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const response = await gmail.users.messages.list({
    userId: "me",
    labelIds: ["INBOX"],
    q: "is:unread from:anshuldevmail@gmail.com", // Filter criteria
  });
  return response.data.messages || [];
}

/**
 * Creates a Gmail label if it doesn't exist, or retrieves its ID if it does.
 *
 * @param {Object} auth - The authenticated Google API client.
 * @returns {string} - ID of the label.
 */
async function createLabel(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  try {
    // Try to create the label
    const response = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name: labelName,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      },
    });
    return response.data.id;
  } catch (error) {
    if (error.code === 409) {
      // If label already exists, retrieve its ID
      const response = await gmail.users.labels.list({
        userId: "me",
      });
      const label = response.data.labels.find(
        (label) => label.name === labelName
      );
      return label.id;
    } else {
      // Propagate other errors
      throw error;
    }
  }
}

/**
 * Main function to execute the vacation auto-reply logic.
 *
 * @param {Object} auth - The authenticated Google API client.
 */
async function main(auth) {
  console.log("Cron job executed at Interval for 2 minutes");

  // Create or retrieve the label ID
  const labelId = await createLabel(auth);

  // Initialize the Gmail API client
  const gmail = google.gmail({ version: "v1", auth });

  // Fetch unread messages that meet the specified criteria
  const messages = await getUnrepliesMessages(auth);

  // Process each unread message
  if (messages && messages.length > 0) {
    for (const message of messages) {
      // Get detailed information about the message
      const messageData = await gmail.users.messages.get({
        auth,
        userId: "me",
        id: message.id,
      });

      const email = messageData.data;
      const hasReplied = email.payload.headers.some(
        (header) => header.name === "In-Reply-To"
      );

      // If the message hasn't been replied to
      if (!hasReplied) {
        // Prepare the reply message
        const replyMessage = {
          userId: "me",
          resource: {
            raw: Buffer.from(
              `To: ${
                email.payload.headers.find((header) => header.name === "From")
                  .value
              }\r\n` +
                `Subject: Re: ${
                  email.payload.headers.find(
                    (header) => header.name === "AUTO REPLY GENERATED "
                  ).value
                }\r\n` +
                `Content-Type: text/plain; charset="UTF-8"\r\n` +
                `Content-Transfer-Encoding: 7bit\r\n\r\n` +
                `Thank you for your email. I'm currently on vacation and will reply to you when I return.\r\n Thank You , \n Anshul Kumar Tiwari`
            ).toString("base64"),
          },
        };

        // Send the reply message
        await gmail.users.messages.send(replyMessage);

        // Add the label and remove from the inbox
        await gmail.users.messages.modify({
          auth,
          userId: "me",
          id: message.id,
          resource: {
            addLabelIds: [labelId],
            removeLabelIds: ["INBOX"],
          },
        });
      }
    }
  }
}

module.exports = {
  main,
};
