### Google authentication and authorization with OAuth2 and Node.js

This is a simple example of how to use Google's OAuth2 authentication and authorization in a Node.js application. This example uses the `passport.js` library to access Google APIs.

### Prerequisites

- Node.js installed on your machine
- A Google account

### Getting started

1. Clone this repository to your local machine
2. Run `npm install` to install the dependencies
3. Create a new project in the [Google Developer Console](https://console.developers.google.com/)
4. Enable the Google+ API
5. Create OAuth2 credentials
6. Add `http://localhost:3000/auth/google/callback` as an authorized redirect URI
7. Create a `.env` file in the root of the project and add the following environment variables:
   - `GOOGLE_CLIENT_ID` - Your Google OAuth2 client ID
   - `GOOGLE_CLIENT_SECRET` - Your Google OAuth2 client secret
   - `SESSION_SECRET` - A secret key for session management
8. Run `npm start` to start the application
9. Open your browser and navigate to `http://localhost:3000`