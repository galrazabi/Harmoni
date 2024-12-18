import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


const loadDataFromFilePath = (filePath) => {
    try {
        const fullFilePath =  path.join(__dirname, filePath);
        return JSON.parse(fs.readFileSync(fullFilePath, 'utf-8'));
    } catch (error) {
        console.error("Error in given path or parsing lyrics file:", error);
        return [];
    }
};


export const getLyrics = (song) => {
    try {
        const lyricsData = loadDataFromFilePath(song.lyrics_chords_path);
        
        const lyricsLines = lyricsData.map(line => 
            line.map(part => part.lyrics).join(' ')
        );
        return lyricsLines;
    } catch (error) {
        console.error("Error reading or parsing lyrics file:", error);
        return [];
    }
};


const reverseString = (str) => {
    return str.split('').reverse().join('');
}


export const formatLyricsAndChords = (song) => {
    try {

        const lyricsAndChordsData = loadDataFromFilePath(song.lyrics_chords_path);

        const formattedOutput = [];

        lyricsAndChordsData.forEach(line => {
            let lyricsLine = '';
            let chordsLine = '';
            
            line.forEach(part => {
                const lyricsPart = part.lyrics || '';
                const chordPart = part.chords || '';

                
                chordsLine += chordPart.padEnd(lyricsPart.length + 1 , ' ');
                lyricsLine += lyricsPart + ' ';
            });

            
            switch (song.languege){
                case "he":
                    formattedOutput.push(reverseString(chordsLine));
                    break;
                default:
                    formattedOutput.push(chordsLine);
            }
            
            formattedOutput.push(lyricsLine.trim());  
        });
        return formattedOutput;
    } catch (error) {
        console.error("Error reading or parsing lyrics file:", error);
        return [];
    }
};


export const searchSongsDB = (searchTerm) => {

    const songsData = loadDataFromFilePath("../data/songs.json").songs;

    return songsData.filter(song => {
        if (song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        
        return getLyrics(song).some(line => line.toLowerCase().includes(searchTerm.toLowerCase()));
    });
};

