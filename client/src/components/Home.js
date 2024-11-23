import "./Home.css"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate();
    
    return (
        <div className="home-container">
            <h1>Welcome to Harmoni</h1>
            <p>Your ultimate platform for streamlined, real-time rehearsals.</p>
            <div className="button-group">
                <button onClick={() => navigate('/signup')}>Sign Up</button>
                <button onClick={() => navigate('/login')}>Log In</button>     
            </div>
        </div>
    )
}
