import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('lionfitness_user');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('lionfitness_user', JSON.stringify(data));
                setUser(data);
                return { success: true };
            }
            return { success: false, message: data.message || 'Login failed' };
        } catch (error) {
            return { success: false, message: 'Server error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('lionfitness_user', JSON.stringify(data));
                setUser(data);
                return { success: true };
            }
            return { success: false, message: data.message || 'Registration failed' };
        } catch (error) {
            return { success: false, message: 'Server error' };
        }
    };

    const logout = () => {
        localStorage.removeItem('lionfitness_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
