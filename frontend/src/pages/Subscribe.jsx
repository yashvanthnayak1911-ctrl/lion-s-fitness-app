import { useState, useContext } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Subscribe.css';

const plans = [
    { id: 'basic', name: 'Basic', price: '29', features: ['Gym Access 24/7', 'Locker Room Access', 'Free Wi-Fi'] },
    { id: 'pro', name: 'Pro', price: '59', features: ['Everything in Basic', 'Group Classes', '1 PT Session/mo', 'Sauna Access'], popular: true },
    { id: 'elite', name: 'Elite', price: '99', features: ['Everything in Pro', 'Unlimited PT Sessions', 'Nutrition Plan', 'Guest Pass'] }
];

const Subscribe = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelectPlan = (plan) => {
        if (!user) {
            alert("Please login or register to choose a membership plan.");
            navigate('/auth?mode=login');
            return;
        }
        setSelectedPlan(plan);
        setShowPayment(true);
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ planName: selectedPlan.name, paymentDetails: 'mock_card' }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Payment successful for ${selectedPlan.name} Plan! Welcome to the Pride.`);
                const updatedUser = { ...user, ...data };
                setUser(updatedUser);
                localStorage.setItem('lionfitness_user', JSON.stringify(updatedUser));

                setShowPayment(false);
                setSelectedPlan(null);
                navigate('/home');
            } else {
                alert(data.message || 'Payment failed');
            }
        } catch (error) {
            alert('Server error during payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscribe-container section container">
            <div className="section-header">
                <h2>Memberships</h2>
                <div className="header-line"></div>
                <p className="subscribe-subtitle">Choose the plan that fits your goals. No hidden fees. Cancel anytime.</p>
            </div>

            {!showPayment ? (
                <div className="plans-grid">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`plan-card glass-panel ${plan.popular ? 'popular' : ''}`}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <div className="plan-price">
                                <span className="currency">$</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">/mo</span>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <button
                                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} plan-btn`}
                                onClick={() => handleSelectPlan(plan)}
                            >
                                Choose {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="payment-section glass-panel animate-fade-in">
                    <div className="payment-header">
                        <h3>Complete Your Checkout</h3>
                        <p>You have selected the <strong>{selectedPlan.name} Plan</strong> (${selectedPlan.price}/month).</p>
                    </div>
                    <form className="payment-form" onSubmit={handlePayment}>
                        <div className="input-group">
                            <input type="text" placeholder="Name on Card" required />
                        </div>
                        <div className="input-group">
                            <CreditCard size={20} className="input-icon" />
                            <input type="text" placeholder="Card Number (Mock)" required maxLength="16" />
                        </div>
                        <div className="payment-row">
                            <div className="input-group">
                                <input type="text" placeholder="MM/YY" required maxLength="5" />
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="CVC" required maxLength="3" />
                            </div>
                        </div>

                        <div className="secure-badge">
                            <ShieldCheck size={18} color="var(--success-color)" />
                            <span>Secure 256-bit encrypted payment</span>
                        </div>

                        <div className="payment-actions">
                            <button type="button" className="btn btn-outline" onClick={() => setShowPayment(false)}>Back</button>
                            <button type="submit" className="btn btn-primary">Pay ${selectedPlan.price}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Subscribe;
