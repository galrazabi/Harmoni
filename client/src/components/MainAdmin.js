import { useState, useContext } from "react"
import { SocketContext } from "./RehearsalRoom"
import { useCookies } from 'react-cookie'
import axios from "axios"
import './MainAdmin.css'
import config from '../config.json' ;


export const MainAdmin = ({ setSongsList, setIsMain}) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [cookie, _ ] = useCookies("access_token")
    const { leaveRoom, logout } = useContext(SocketContext)
    


    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`${config.backend.url}/songs/song/list/${searchTerm}`, {headers: {authorization : cookie.access_token}});
            setSongsList(response.data.matchingSongs)
            setIsMain(false)

        }catch(err) {
            console.error(err)
        }
    }

    return (
        <div>                
            {/* <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
                <button className="logout-btn" onClick={leaveRoom}>Leave Room</button>
            </div> */}
        <div className="main-admin">

            <h1>Search any song</h1>
            <br />
            <form onSubmit={onSubmit} className="admin-form">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
        </div>

    )
}