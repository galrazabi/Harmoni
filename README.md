# Harmoni 🎵

Harmoni is a real-time web application that allows users to connect and collaborate during music rehearsals. Admins can manage session flow, search for songs, and initiate rehearsals, while users can join and participate in real-time.

---

## Features

- **User Authentication**: Secure sign-up and login using JWT.
- **Admin Controls**: Search for songs, manage session flow, and start rehearsals.
- **Real-time Interaction**: Live updates using Socket.IO.
- **Song Library**: Includes name, artist, lyrics, and chords.
- **Mobile Optimization**: responsive design for mobile devices.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **WebSocket Communication**: Socket.IO
- **Authentication**: JWT & bcrypt
- **Styling**: CSS (black, white, gray, and minimal red accents)

---

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (running instance)

### Steps

1. **Install Dependencies**
   ```bash
   git clone https://github.com/galrazabi/Harmoni.git
   cd Harmoni
2. **Clone the Repository**
   Navigate to the server directory and install backend dependencies:
   cd server
   npm install

   Navigate to the client directory and install frontend dependencies:
   cd ../client
   npm install
3. **Set Up Environment Variables**
   Create a .env file in the server directory with the following keys:
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=<backend_port>
4. **Start the Application**
   Start the backend server:
   cd ../server
   npm start

   Start the frontend:
   cd ../client
   npm start
5. **Access the Application**
   Open your browser and navigate to http://localhost:3000.


## Usage

**Admin**

1. Sign up as Admin at http://localhost:3000/signup/admin
2. Log in as Admin.
3. Create or join a room.
4. Search for a song in the library.
4. Start a rehearsal session.
5. Control the session flow.

**Regular Users**

1. Sign up or log in.
2. Join the desired room.
3. Wait for the admin to start the rehearsal.
4. Join the session when redirected.











