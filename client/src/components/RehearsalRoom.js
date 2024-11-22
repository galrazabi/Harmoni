import { useEffect, useState, createContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useGetUserId } from '../hooks/useGetUserId'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { MainPlayer } from './MainPlayer'
import { SearchSong } from "./SearchSong";
import { io } from 'socket.io-client';
import {Live} from './Live'
import { RoomSelection } from "./RoomSelection";



export const SocketContext = createContext();

export const RehearsalRoom = () => {

    const [socket, setSocket] = useState(null);
    const [ isLive, setIsLive ] = useState(false)
    const [lyricsOrChords, setLyricsOrChords] = useState([])
    const [songData, setSongData] = useState({})
    const [roomId, setRoomId ] = useState("")
    const navigate = useNavigate()

    const userId = useGetUserId()
    const isAdmin = useGetIsAdmin()
    const [_, setCookie] = useCookies(["access_token"])


    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_URL}`, {
            query : {userId}
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket successfully connected:", newSocket.id);
        });

        const handleJoinRoomSuccessfully = (roomID) => {
            setRoomId(roomID)
        }

        const handleStartRehearsal = () => {
            setIsLive(true)
        };

        const handleEndRehearsal = () => {
            setIsLive(false)
        };

        const handleLyricsAndChords = ({song ,lyricsAndChords}) => {
            setLyricsOrChords(lyricsAndChords)
            setSongData(song)
        };

        const handleLyrics = ({song ,lyrics}) => {
            setLyricsOrChords(lyrics)
            setSongData(song)
        };

        const handleError = (err) => {
            alert(err)
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


    const endRehearsal = () => {
        socket.emit("adminEndRehearsal", roomId)
    }

    
    const leaveRoom = () => {
        if(roomId !== ""){
            if (isAdmin) {
                socket.emit("adminEndRehearsal", roomId)
            }
            socket.emit("leaveRoom", roomId)
            setRoomId("")
        }
    }

    const logout = () => {
        if (isAdmin && isLive) { 
            socket.emit("adminEndRehearsal", roomId)
        }
        setCookie("access_token", "")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("isAdmin")
        navigate("/")
    }


    return (
        <SocketContext.Provider value={{ socket, roomId, leaveRoom, logout }}>
            <div className="container-fullscreen">
            <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
                {roomId !== "" && <button className="logout-btn" onClick={leaveRoom}>Leave Room</button>}
                {isAdmin && isLive && <button className="logout-btn" onClick={endRehearsal}>Quit</button>}
            </div>  
                { roomId === "" ? 
                    <RoomSelection />
                 : ( !isLive ? 
                        isAdmin ? <SearchSong /> : <MainPlayer />
                     : 
                        <Live songData={songData} lyricsOrChords={lyricsOrChords} />
                )}

                {isAdmin && roomId !== "" &&
                    <div>
                        <br/>
                        <button onClick={() => navigator.clipboard.writeText(roomId)}>Press to copy the Room ID</button>
                    </div>
                }

            </div>

    </SocketContext.Provider>
    );

}