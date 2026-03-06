import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Subscribe from './pages/Subscribe';
import Admin from './pages/Admin';
import Gateway from './pages/Gateway';
import Features from './pages/Features';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Gateway />} />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<Features />} />
              {/* <Route path="/auth" element={<Auth />} /> */}
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
