import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { SocketContext } from "./RehearsalRoom"
import { useEffect, useState, useContext } from "react";


export const RoomSelection = () => { 

    const {socket, logout } = useContext(SocketContext)
    const isAdmin = useGetIsAdmin()
    const [roomID, setRoomID ] = useState("")


    const onSubmit = (event) => {
        event.preventDefault()
        socket.emit('joinRoom', roomID)
    }

    return (
        <div>                
        {/* <div className="nav-bar">
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div> */}

        <div className="main-admin">

            <h1>Join Rehearsal Room</h1>
            <br />
            <form onSubmit={onSubmit} className="admin-form">
                <label>Rehearsal ID:</label>
                <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                <button type="submit">Join</button>
            </form>
        </div>
        { isAdmin &&         
            <div className="main-admin">
            <h1>Create New Rehearsal Room</h1>
            <br />
            <button onClick={() => socket.emit('createRoom')}>Create New Rehearsal</button>
            </div>
        }
        </div>
    )
}