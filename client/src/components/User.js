import { useContext } from "react";
import { SocketContext } from "./RehearsalRoom";
import {Live} from './Live'
import { RoomSelection } from "./RoomSelection";
import { MainPlayer } from "./MainPlayer";


export const User = () => {

    const { socket, roomId, setRoomId, setCookie, navigate, isLive } = useContext(SocketContext);

    const leaveRoom = () => {
        socket.emit("leaveRoom", roomId);
        setRoomId("");
    }

    const logout = () => {
        setCookie("access_token", "");
        navigate("/");
    }

    return (
            <div className="container-fullscreen">
            <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
                {roomId !== "" && <button className="logout-btn" onClick={leaveRoom}>Leave Room</button>}
            </div>  
                { roomId === "" ? 
                    <RoomSelection />
                 : ( !isLive ? 
                        <MainPlayer />
                     : 
                        <Live />
                )}
            </div> 
    )
}