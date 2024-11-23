import { useEffect, useState, useContext } from "react";
import { SocketContext } from "./RehearsalRoom";
import './Live.css'


export const Live = () => {

    const { songData, lyricsOrChords } = useContext(SocketContext);
    const [isScrolling, setIsScrolling] = useState(false);

    let scrollInterval;

    const changeScroll = () => { 
        setIsScrolling((prev) => !prev);
    };

    useEffect(() => {
        if (isScrolling) {
            scrollInterval = setInterval(() => {
                window.scrollBy({
                    top: 1, 
                    behavior: 'smooth'
                });
            }, 50); 
        } else {
            clearInterval(scrollInterval);
        }

        return () => clearInterval(scrollInterval); 
    }, [isScrolling]);

    
    return (
        <div className="live">
            <h1 className="song-title">{songData.name}</h1>
            <h4 className="song-artist">{songData.artist}</h4>
            <div className="lyrics">
                {lyricsOrChords.map((line, index) => (
                    <pre key={index} className="lyric-line">{line}</pre>
                ))}
            </div>
            
            <button onClick={changeScroll} className="scroll-btn">
                {isScrolling ? 'Stop Scroll' : 'Start Scroll'}
            </button>
        </div>
    )
}