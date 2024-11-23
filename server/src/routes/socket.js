import { Server } from 'socket.io'
import { getLyrics, formatLyricsAndChords } from '../../db/songsDatabaseOperations.js'
import { getUserInstrumentFromDB } from './users.js'
import { v4 as uuidv4 } from 'uuid'


const setUpSocket = (server) => {

    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        }
      });
 
    const categorizeUserByInstrument = async (socket) => {

      const userId = socket.handshake.query.userId;

      const instrument = await getUserInstrumentFromDB( userId );

      socket.role = instrument;
    }


    io.on("connection", (socket) => {

        console.log("user connected: " + socket.id);
        
        categorizeUserByInstrument(socket);

        const handleSendingLyricsAndChords = (roomId, song, lyrics, lyricsAndChords) => {

          const roomSockets = io.sockets.adapter.rooms.get(roomId);

          if ( !roomSockets) {
            socket.emit('error', `Room ${roomId} does not exist or is empty`);
            return;
          }

          roomSockets.forEach((socketId) => {
            const userSocket = io.sockets.sockets.get(socketId);

            if (!userSocket) {
              socket.emit('error', `User ${roomId} does not exist`);
              return;
            }

            if (userSocket.role == "vocals"){
              io.to(socketId).emit('sendLyrics', {song, lyrics});
            } else {
              io.to(socketId).emit('sendLyricsAndChords', {song, lyricsAndChords});
            }

          })

        }

        const handleJoinRoom = (roomId) => {

          socket.join(roomId);
          socket.emit('joinRoomSuccessfully', roomId);
          console.log(`User ${socket.id} joined room ${roomId} `);
          
        }

        socket.on('createRoom', () => {
          const roomId = uuidv4();
          handleJoinRoom(roomId);
        })

        socket.on('joinRoom', (roomId) => {
          const rooms = io.sockets.adapter.rooms;
          if (rooms.has(roomId)) {
            handleJoinRoom(roomId);
          } else {
            socket.emit('error', 'Room does not exist');
          }
        })

        socket.on('leaveRoom', (roomId) => {
          const rooms = io.sockets.adapter.rooms;
          if (rooms.has(roomId)) {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId} `);
          } else {
            socket.emit('error', 'Room does not exist');
          }
        })

        socket.on('adminStartRehearsal', ({roomId, song}) => { 
          console.log('admin Start Rehearsal') ;
          const lyrics = getLyrics(song);
          const lyricsAndChords = formatLyricsAndChords(song);
          io.to(roomId).emit('startRehearsal') ;
          handleSendingLyricsAndChords(roomId, song, lyrics, lyricsAndChords);
        })

        socket.on('adminEndRehearsal', (roomId) => {
          io.to(roomId).emit('endRehearsal');
        })

      socket.on('disconnect', () => {
        
      });
    })
}

export {setUpSocket};