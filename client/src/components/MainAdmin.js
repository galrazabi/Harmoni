import { useState } from "react"
import { useCookies } from 'react-cookie'
import axios from "axios"


export const MainAdmin = ({ setSongsList, setIsMain}) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [cookie, _ ] = useCookies("access_token")
    


    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`${process.env.REACT_APP_URL}/songs/song/list/${searchTerm}`, {headers: {authorization : cookie.access_token}});
            setSongsList(response.data.matchingSongs)
            setIsMain(false)

        }catch(err) {
            console.error(err)
        }
    }

    return (                
        <div>

            <h1>Search any song</h1>
            <br />
            <form onSubmit={onSubmit} className="admin-form">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}