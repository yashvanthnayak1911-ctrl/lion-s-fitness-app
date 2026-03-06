import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    // Hide Navbar on the Gateway page
    if (location.pathname === '/') {
        return null;
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/home" className="navbar-logo">
                    <Dumbbell className="logo-icon" />
                    <span>LION FITNESS</span>
                </Link>

                <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <Link to="/home" className="nav-link" onClick={toggleMenu}>Home</Link>
                    <Link to="/features" className="nav-link" onClick={toggleMenu}>Features</Link>
                    <Link to="/home#services" className="nav-link" onClick={toggleMenu}>Classes</Link>
                    <Link to="/subscribe" className="nav-link" onClick={toggleMenu}>Membership</Link>

                    {user ? (
                        <>
                            <span className="nav-link" style={{ color: 'var(--primary-color)' }}>Hello, {user.name}</span>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="nav-link action-link" onClick={toggleMenu}>
                                    <UserIcon size={18} /> Admin
                                </Link>
                            )}
                            <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={handleLogout}>
                                Logout <LogOut size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/auth" className="nav-link" onClick={toggleMenu}>Login</Link> */}
                            <Link to="/admin" className="nav-link action-link" style={{ opacity: 0.5 }} onClick={toggleMenu}>
                                <UserIcon size={18} /> Admin
                            </Link>
                        </>
                    )}
                </div>

                <div className="nav-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
