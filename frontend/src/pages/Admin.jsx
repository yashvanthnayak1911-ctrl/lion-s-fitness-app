import { useState, useEffect, useContext } from 'react';
import { Users, Activity, CreditCard, ListPlus, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './Admin.css';

const Admin = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [features, setFeatures] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Feature Form State
    const [newFeatureTitle, setNewFeatureTitle] = useState('');
    const [newFeatureDesc, setNewFeatureDesc] = useState('');
    const [newFeatureImage, setNewFeatureImage] = useState(null);
    const [addingFeature, setAddingFeature] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/home');
            return;
        }

        const fetchData = async () => {
            try {
                const [usersRes, featuresRes, transactionsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/auth/users`, { headers: { Authorization: `Bearer ${user.token}` } }),
                    fetch(`${API_BASE_URL}/api/features`),
                    fetch(`${API_BASE_URL}/api/transactions`, { headers: { Authorization: `Bearer ${user.token}` } })
                ]);

                if (usersRes.ok) setUsers(await usersRes.json());
                if (featuresRes.ok) setFeatures(await featuresRes.json());
                if (transactionsRes.ok) setTransactions(await transactionsRes.json());
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const handleAddFeature = async (e) => {
        e.preventDefault();
        if (!newFeatureTitle || !newFeatureDesc) return;
        setAddingFeature(true);

        try {
            let imagePath = '';
            if (newFeatureImage) {
                const formData = new FormData();
                formData.append('image', newFeatureImage);
                const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (uploadRes.ok) {
                    imagePath = await uploadRes.text();
                } else {
                    alert('Image upload failed');
                    setAddingFeature(false);
                    return;
                }
            }

            const response = await fetch(`${API_BASE_URL}/api/features`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ title: newFeatureTitle, desc: newFeatureDesc, image: imagePath })
            });

            if (response.ok) {
                const addedFeature = await response.json();
                setFeatures([...features, addedFeature]);
                setNewFeatureTitle('');
                setNewFeatureDesc('');
                setNewFeatureImage(null);
                alert('Feature added successfully!');
            } else {
                alert('Failed to add feature');
            }
        } catch (error) {
            console.error('Add feature error:', error);
        } finally {
            setAddingFeature(false);
        }
    };

    const handleDeleteFeature = async (id) => {
        if (!window.confirm('Are you sure you want to delete this feature?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/features/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.ok) {
                setFeatures(features.filter(f => f._id !== id));
            } else {
                alert('Failed to delete feature');
            }
        } catch (error) {
            console.error("Delete feature error:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.ok) {
                setUsers(users.filter(u => u._id !== id));
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error("Delete user error:", error);
        }
    };

    const activeSubscriptions = users.filter(u => u.subscriptionStatus === 'active').length;
    const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="admin-container section container">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <div className="header-line" style={{ margin: "10px 0 0 0" }}></div>
            </div>

            <div className="admin-stats">
                <div className="stat-card glass-panel">
                    <Users size={32} color="var(--primary-color)" />
                    <div className="stat-info">
                        <h3>Total Members</h3>
                        <p className="stat-value">{users.length}</p>
                    </div>
                </div>
                <div className="stat-card glass-panel">
                    <Activity size={32} color="var(--success-color)" />
                    <div className="stat-info">
                        <h3>Active Subs</h3>
                        <p className="stat-value">{activeSubscriptions}</p>
                    </div>
                </div>
                <div className="stat-card glass-panel">
                    <ListPlus size={32} color="var(--primary-color)" />
                    <div className="stat-info">
                        <h3>Total Features</h3>
                        <p className="stat-value">{features.length}</p>
                    </div>
                </div>
                <div className="stat-card glass-panel">
                    <CreditCard size={32} color="var(--primary-color)" />
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="admin-content grid-split">
                <div className="admin-panel glass-panel">
                    <h3>Manage Features</h3>

                    <form className="add-feature-form" onSubmit={handleAddFeature} style={{ marginBottom: '2rem' }}>
                        <input
                            type="text"
                            placeholder="Feature Title"
                            className="feature-input"
                            value={newFeatureTitle}
                            onChange={(e) => setNewFeatureTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Feature Description"
                            className="feature-input"
                            rows="3"
                            value={newFeatureDesc}
                            onChange={(e) => setNewFeatureDesc(e.target.value)}
                            required
                        ></textarea>
                        <input
                            type="file"
                            accept="image/*"
                            className="feature-input"
                            onChange={(e) => setNewFeatureImage(e.target.files[0])}
                            style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                        />
                        <button type="submit" className="btn btn-primary" disabled={addingFeature} style={{ width: '100%', padding: '10px' }}>
                            {addingFeature ? 'Adding...' : '+ Add Feature'}
                        </button>
                    </form>

                    {loading ? <p>Loading features...</p> : (
                        <ul className="admin-feature-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {features.map(f => (
                                <li key={f._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{f.title}</h4>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{f.desc}</p>
                                    </div>
                                    <button onClick={() => handleDeleteFeature(f._id)} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '0.5rem' }}>
                                        <Trash2 size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="admin-panel glass-panel">
                    <h3>Recent Signups</h3>
                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td><span className={`badge ${u.subscriptionStatus === 'active' ? 'active' : 'inactive'}`}>
                                            {u.subscriptionStatus}</span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {u._id !== user._id && (
                                                <button onClick={() => handleDeleteUser(u._id)} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '0.2rem' }} title="Delete User">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="4">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                    <div className="admin-panel glass-panel">
                        <h3>Recent Transactions</h3>
                        {loading ? (
                            <p>Loading transactions...</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t) => (
                                        <tr key={t._id}>
                                            <td>{t.userName}</td>
                                            <td>{t.planName}</td>
                                            <td>${t.amount.toFixed(2)}</td>
                                            <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan="4">No transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
