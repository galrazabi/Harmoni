import { useContext } from "react"
import { SocketContext } from "./RehearsalRoom"


export const MainPlayer = () => {

    const { leaveRoom, logout } = useContext(SocketContext)

    return (
        <div>
            <h1>Waiting for the next song</h1>
        </div>
    )
}