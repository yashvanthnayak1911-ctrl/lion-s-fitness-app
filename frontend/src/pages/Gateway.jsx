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
                    <p>Your journey to elite fitness begins here. Explore our gym and see what we have to offer.</p>

                    <div className="gateway-buttons">
                        <Link to="/home" className="btn btn-primary">
                            Explore the Gym <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gateway;
