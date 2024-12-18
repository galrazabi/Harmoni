import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http';
import { setUpSocket } from './routes/socket.js'
import { userRouter } from './routes/users.js'
import { songRouter } from './routes/songs.js';
import dotenv from 'dotenv';

dotenv.config();



const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
  }));

setUpSocket(server);

app.use('/users', userRouter);
app.use("/songs", songRouter);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch(() => console.log("FAILD TO CONNECT DATABASE"))

const port = process.env.PORT;
server.listen(port, () => console.log("SERVER STARTED"));

