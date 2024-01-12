# Gmail Vacation Responder

This Node.js application serves as an automatic vacation responder for your Gmail inbox. It seamlessly utilizes the Gmail API to manage emails during your absence, providing automated responses and organization features.

## Key Features

- **Effortless Automation:** Automatically responds to incoming emails during your vacation period.
- **Organized Inbox:** Labels and relocates emails that have received responses.
- **Randomized Scheduling:** Intervals for processing emails are randomized between 45 to 120 seconds.

## Quick Start

### Prerequisites

- Node.js installed
- Gmail API credentials (`credentials.json`) acquired from [Google Cloud Console](https://console.cloud.google.com/)

### Installation Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/gmail-vacation-responder.git
    cd gmail-vacation-responder
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    node app.js
    ```

4. Complete the authorization process by visiting the provided URL and entering the code.

### Configuration Guide

- Adjust `credentials.json` with your Gmail API credentials.
- Personalize the label name in `app.js` (`labelName` variable).

## Technical Insights

- **Programming Language:** Node.js
- **Dependencies:** googleapis, express
- **Authentication:** Leveraging Google's local-auth library for seamless authentication.
- **API Utilization:** Interaction with Gmail API for reading and sending emails.

## Potential Enhancements

- Incorporate robust error handling and logging for improved reliability.
- Expand features to provide a more comprehensive set of vacation responder capabilities.

## Demo Preview

[Demo Video Link](#) - 

## Author Details

- Developer: Anshul Kumar Tiwari


