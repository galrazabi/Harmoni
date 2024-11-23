import { useEffect, useState, createContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useGetUserId } from '../hooks/useGetUserId'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { io } from 'socket.io-client';
import { Admin } from "./Admin";
import { User } from "./User";



export const SocketContext = createContext();

export const RehearsalRoom = () => {

    const [socket, setSocket] = useState(null);
    const [ isLive, setIsLive ] = useState(false);
    const [lyricsOrChords, setLyricsOrChords] = useState([]);
    const [songData, setSongData] = useState({});
    const [roomId, setRoomId ] = useState("");

    const navigate = useNavigate();
    const [_, setCookie] = useCookies(["access_token"]);
    const userId = useGetUserId();
    const isAdmin = useGetIsAdmin();
    


    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_URL}`, {
            query : {userId}
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket successfully connected:", newSocket.id);
        });

        const handleJoinRoomSuccessfully = (roomID) => {
            setRoomId(roomID);
        }

        const handleStartRehearsal = () => {
            setIsLive(true);
        };

        const handleEndRehearsal = () => {
            setIsLive(false);
        };

        const handleLyricsAndChords = ({song ,lyricsAndChords}) => {
            setLyricsOrChords(lyricsAndChords);
            setSongData(song);
        };

        const handleLyrics = ({song ,lyrics}) => {
            setLyricsOrChords(lyrics);
            setSongData(song);
        };

        const handleError = (err) => {
            alert(err);
        }

        newSocket.on('joinRoomSuccessfully', handleJoinRoomSuccessfully)
        newSocket.on("startRehearsal", handleStartRehearsal);
        newSocket.on("sendLyricsAndChords",handleLyricsAndChords);
        newSocket.on("sendLyrics",handleLyrics);
        newSocket.on("endRehearsal", handleEndRehearsal);
        newSocket.on("error", handleError);

        
        return () => { 
            newSocket.off('joinRoomSuccessfully', handleJoinRoomSuccessfully); 
            newSocket.off("startRehearsal", handleStartRehearsal); 
            newSocket.off("sendLyrics", handleLyricsAndChords);
            newSocket.off("sendLyricsAndChords", handleLyricsAndChords);
            newSocket.off("endRehearsal", handleEndRehearsal); 
            newSocket.off("error", handleError); 
            newSocket.disconnect();
        };
    }, [userId, isAdmin]); 


    return (
        <SocketContext.Provider value={{ socket, roomId, setRoomId, setCookie, navigate, isLive, songData, lyricsOrChords }}>
    
            { isAdmin ? <Admin /> : <User /> }

        </SocketContext.Provider>
    );

}