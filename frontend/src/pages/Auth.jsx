import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Dumbbell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, register, user } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const mode = searchParams.get('mode');
        setIsLogin(mode !== 'register');
    }, [searchParams]);

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin');
            else navigate('/home');
        }
    }, [user, navigate]);

    const toggleMode = () => {
        setSearchParams({ mode: isLogin ? 'register' : 'login' });
        setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await register(name, email, password);
        }

        if (!result.success) {
            setErrorMsg(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box glass-panel animate-fade-in">
                <div className="auth-header">
                    <Dumbbell size={40} className="auth-logo" />
                    <h2>{searchParams.get('mode') === 'admin' ? 'Admin Portal' : (isLogin ? 'Welcome Back' : 'Join The Pride')}</h2>
                    <p>{searchParams.get('mode') === 'admin' ? 'Sign in to access the management dashboard.' : (isLogin ? 'Sign in to access your dashboard and plans.' : 'Create an account to forge your legacy.')}</p>
                </div>

                {errorMsg && <div className="auth-error" style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>{errorMsg}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && searchParams.get('mode') !== 'admin' && (
                        <div className="input-group">
                            <User size={20} className="input-icon" />
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
                        </div>
                    )}

                    <div className="input-group">
                        <Mail size={20} className="input-icon" />
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <Lock size={20} className="input-icon" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span className="auth-toggle" onClick={toggleMode}>
                            {isLogin ? 'Register now.' : 'Login here.'}
                        </span>
                    </p>
                    {searchParams.get('mode') !== 'admin' && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>
                            Administrator?{' '}
                            <span className="auth-toggle" onClick={() => { setSearchParams({ mode: 'admin' }); setErrorMsg(''); }}>
                                Admin Login
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
