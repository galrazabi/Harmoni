import { useContext } from "react";
import { SocketContext } from "./RehearsalRoom";
import { SearchSong } from "./SearchSong";
import {Live} from './Live'
import { RoomSelection } from "./RoomSelection";


export const Admin = () => {

    const { socket, roomId, setRoomId, setCookie, navigate, isLive } = useContext(SocketContext);

    const goToLive = (song) => {
        socket.emit('adminStartRehearsal', {roomId, song});
    }
    
    const endRehearsal = () => {
        socket.emit("adminEndRehearsal", roomId);
    }

    const leaveRoom = () => {
        socket.emit("adminEndRehearsal", roomId);
        socket.emit("leaveRoom", roomId);
        setRoomId("");
    }

    const logout = () => {
        if (isLive) { 
            socket.emit("adminEndRehearsal", roomId);
        }
        setCookie("access_token", "");
        navigate("/");
    }

    return (

            <div className="container-fullscreen">
                <div className="nav-bar">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                    {roomId !== "" && <button className="logout-btn" onClick={leaveRoom}>Leave Room</button>}
                    { isLive && <button className="logout-btn" onClick={endRehearsal}>Quit</button>}
                </div>  
                { roomId === "" ? 
                    <RoomSelection />
                : ( !isLive ? 
                        <SearchSong goToLive={goToLive} /> 
                    : 
                        <Live />
                )}

                { roomId !== "" &&
                    <div>
                        <br/>
                        <button onClick={() => navigator.clipboard.writeText(roomId)}>Press to copy the Room ID</button>
                    </div>
                }
            </div>


    )
}