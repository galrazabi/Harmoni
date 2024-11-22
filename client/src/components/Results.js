import { useContext } from "react";
import { SocketContext } from "./RehearsalRoom"
import './Results.css'


export const Results = ({songsList, setIsMain}) => {

    const {socket, roomId, leaveRoom, logout} = useContext(SocketContext)

    const goToLive = (song) => {
        socket.emit('adminStartRehearsal', {roomId, song})
    }
    
    return (
            <div  className="container-fullscreen">
                <h1>Showing the Results</h1>

                {songsList.length === 0 ? 
                    <p className="description">No songs found. Please try a different search.</p>
                    :
                    <div>
                        <p className="description">Browse through the list below to find your song and start the rehearsal session.</p>
                        <ul className="song-list">
                            {songsList.map((song) => (
                                <li key={song.name} className="song-item">
                                    <button onClick={() => goToLive(song)} className="song-button">
                                        <img src={song.image} alt={song.name} className="album-cover" />
                                        <div className="song-info">
                                            <p className="song-name">Song: {song.name}</p>
                                            <p className="artist-name">Artist: {song.artist}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <br/>
                <button onClick={() => setIsMain(true)}>Back To Search Songs</button>
            </div>
    )
}