Auto Mail Sender
This Node.js project utilizes the Gmail API to automatically send vacation auto-reply messages for unread emails from a specific sender.

Project Structure
controllers/MailController.js: Contains the main logic for processing and replying to unread emails.
app.js: The main application file, sets up the Express server and schedules the MailController to run at regular intervals.
How to Run
Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Set up Google API credentials:

Place your credentials.json file inside the secrets folder.
Run the application:

bash
Copy code
npm start
Configuration
MailController.js: Update the labelName and q properties to customize label names and email filtering criteria.
app.js: Adjust the cron schedule as needed.
