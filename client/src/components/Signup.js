import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Signup.css"


export const Signup = ({isAdmin}) => {

    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert("Username and password are required.");
            return; 
        }
        try{

            const instrument = document.getElementById("instrument").value;

            await axios.post(`${process.env.REACT_APP_URL}/users/signup`, {username, password, instrument, isAdmin });

            navigate("/");
            

        } catch(err) {
            if (err.response && err.response.status === 401) {
                alert(err.response.data.message);  
            } else {
                console.error("An unexpected error occurred:", err);
            }
        }
    }

    return (
        <div className="auth-container">
            <h1>{isAdmin ? "Admin Sign Up" : "Sign Up"}</h1>
            <button className="auth-back-btn" onClick={() => navigate('/')}>Back</button>
            <form onSubmit={onSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="instrument">Instrument</label>
                    <select id="instrument">
                        <option value="drums">Drums</option>
                        <option value="guitars">Guitars</option>
                        <option value="bass">Bass</option>
                        <option value="saxophone">Saxophone</option>
                        <option value="keyboards">Keyboards</option>
                        <option value="vocals">Vocals</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    )
}