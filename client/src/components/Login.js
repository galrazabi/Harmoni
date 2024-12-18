import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import "./Login.css"

export const Login = () => {

    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");

    const [_, setCookie] = useCookies("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post(`${process.env.REACT_APP_URL}/users/login`, {username, password});

            console.log(response.data);
            setCookie("access_token", await response.data.token);
            navigate('/rehearsalroom');

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
            <h1>Log In</h1>
            <nav className='nav-bar'>
                <button className="auth-back-btn" onClick={() => navigate('/')}>Back</button>
            </nav>
            
            <form onSubmit={onSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    )
}