import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React from 'react';
import Loading from "../Loading/Loading";


const LandingPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="container">
                <Loading/>
            </div>
        );
    }

    return ( 
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome, {user.username}!</h1>
            <p className="hero-subtitle">
              Ready for your next challenge? Choose a quiz and start playing!
            </p>
            <div className="hero-buttons">
              <Link to='/quiz-options' className="button hero-button">
                Play
              </Link>
              <Link to='/profile' className="button hero-button">
                View Profile
              </Link>
            </div>
          </div>
        </div>
     );
}
 
export default LandingPage;