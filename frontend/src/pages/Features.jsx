import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './Features.css';

const Features = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [featuresList, setFeaturesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/features`);
                if (response.ok) {
                    const data = await response.json();
                    setFeaturesList(data);
                }
            } catch (error) {
                console.error("Error fetching features:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatures();
    }, []);

    return (
        <div className="features-page section container">
            <div className="section-header">
                <h2>All Features</h2>
                <div className="header-line"></div>
                <p className="subtitle">Everything you need to unleash your potential.</p>
            </div>

            <div className="features-list-container glass-panel">
                {loading ? (
                    <p style={{ textAlign: 'center', opacity: 0.7 }}>Loading features...</p>
                ) : featuresList.length === 0 ? (
                    <p style={{ textAlign: 'center', opacity: 0.7 }}>No features currently listed.</p>
                ) : (
                    <ul className="full-feature-list">
                        {featuresList.map((feature, index) => (
                            <li
                                key={feature._id || index}
                                className={activeIndex === index ? 'active' : ''}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="feature-content-wrapper">
                                    <CheckCircle2 className="feature-icon" color="var(--primary-color)" size={24} />
                                    <div className="feature-text">
                                        <h3>{feature.title}</h3>
                                        <p>{feature.desc}</p>
                                    </div>
                                </div>
                                {feature.image && (
                                    <div className="feature-image-container">
                                        <img
                                            src={feature.image?.startsWith('/uploads') ? `${API_BASE_URL}${feature.image}` : feature.image}
                                            alt={feature.title}
                                            className="feature-image"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Features;
