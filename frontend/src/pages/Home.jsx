import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-wrapper">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content animate-fade-in">
                    <h1>Unleash Your True Potential</h1>
                    <p>Transform your body, mind, and soul with our elite coaches, world-class equipment, and a community built on strength and perseverance.</p>
                    <div className="hero-actions">
                        <Link to="/subscribe" className="btn btn-primary">Start Free Trial</Link>
                        <Link to="/features" className="btn btn-outline">Explore Features</Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section section container">
                <div className="section-header">
                    <h2>Our Expertise</h2>
                    <div className="header-line"></div>
                </div>

                <div className="services-grid">
                    <div className="service-card glass-panel">
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" alt="Personal Training" />
                        <div className="service-info">
                            <h3>Personal Training</h3>
                            <p>Work 1-on-1 with elite coaches to hit your goals faster safely.</p>
                        </div>
                    </div>
                    <div className="service-card glass-panel">
                        <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000&auto=format&fit=crop" alt="Strength & Conditioning" />
                        <div className="service-info">
                            <h3>Strength & Conditioning</h3>
                            <p>Build explosive power and endurance with our tailored programs.</p>
                        </div>
                    </div>
                    <div className="service-card glass-panel">
                        <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop" alt="Yoga & Mobility" />
                        <div className="service-info">
                            <h3>Yoga & Mobility</h3>
                            <p>Enhance flexibility and prevent injuries with our recovery classes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Why Choose Us */}
            <section id="features" className="features-section section">
                <div className="container flex-split">
                    <div className="features-text">
                        <h2>Why Lion Fitness?</h2>
                        <div className="header-line" style={{ margin: "0 0 2rem 0" }}></div>
                        <ul className="feature-list">
                            <li><CheckCircle2 color="var(--primary-color)" /> 24/7 Access to all facilities</li>
                            <li><CheckCircle2 color="var(--primary-color)" /> Olympic-grade lifting platforms</li>
                            <li><CheckCircle2 color="var(--primary-color)" /> Sauna, cold plunge & recovery zone</li>
                            <li><CheckCircle2 color="var(--primary-color)" /> Dedicated app for tracking macros & lifts</li>
                        </ul>
                        <Link to="/subscribe" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            View Memberships <ChevronRight />
                        </Link>
                    </div>
                    <div className="features-image">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" alt="Gym Equipment" className="glass-panel" />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section section container">
                <div className="section-header">
                    <h2>Success Stories</h2>
                    <div className="header-line"></div>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card glass-panel">
                        <div className="stars">
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                        </div>
                        <p>"Lion Fitness completely changed my approach to lifting. The coaches are phenomenal and the community is unbeatable."</p>
                        <h4>- Marcus Johnson</h4>
                    </div>
                    <div className="testimonial-card glass-panel">
                        <div className="stars">
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                            <Star fill="var(--primary-color)" stroke="none" />
                        </div>
                        <p>"The best facility in the city. Clean, well-maintained equipment, and you never have to wait for a squat rack."</p>
                        <h4>- Sarah Chen</h4>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
