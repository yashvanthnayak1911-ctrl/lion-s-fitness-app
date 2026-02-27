import { Link } from 'react-router-dom';
import { Dumbbell, ArrowRight } from 'lucide-react';
import './Gateway.css';

const Gateway = () => {
    return (
        <div className="gateway-container">
            {/* Background overlay */}
            <div className="gateway-bg"></div>

            <div className="gateway-content animate-fade-in">
                <div className="gateway-brand">
                    <Dumbbell size={60} className="gateway-logo-icon" />
                    <h1 className="gateway-title">LION FITNESS</h1>
                    <p className="gateway-subtitle">Unleash The Beast Within</p>
                </div>

                <div className="gateway-actions glass-panel">
                    <h3>Welcome to the Pride</h3>
                    <p>Your journey to elite fitness begins here. Join our exclusive community or login to continue your progress.</p>

                    <div className="gateway-buttons">
                        <Link to="/auth?mode=login" className="btn btn-primary">
                            Member Login
                        </Link>
                        <Link to="/auth?mode=register" className="btn btn-outline">
                            Join Now
                        </Link>
                    </div>

                    <div className="gateway-guest">
                        <Link to="/home" className="guest-link">
                            Explore the Gym <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gateway;
