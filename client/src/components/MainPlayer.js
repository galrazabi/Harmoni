import './MainPlayer.css'
import { useContext } from "react"
import { SocketContext } from "./RehearsalRoom"


export const MainPlayer = () => {

    const { leaveRoom, logout } = useContext(SocketContext)

    return (
        <div className="container-fullscreen main-player">
            {/* <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
                <button className="logout-btn" onClick={leaveRoom}>Leave Room</button>
            </div> */}
            <h1>Waiting for the next song</h1>
        </div>
    )
}