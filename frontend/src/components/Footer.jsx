import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const location = useLocation();

    if (location.pathname === '/') {
        return null; /* Hide footer on Gateway page */
    }

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/home" className="footer-logo">
                        <Dumbbell className="logo-icon" />
                        <span>LION FITNESS</span>
                    </Link>
                    <p className="footer-desc">
                        Forging strength, endurance, and greatness. Join the pride today.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/subscribe">Memberships</Link></li>
                        <li><Link to="/auth">Member Login</Link></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" aria-label="Instagram"><Instagram /></a>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                        <a href="#" aria-label="Facebook"><Facebook /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Lion Fitness. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
