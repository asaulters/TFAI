import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import AIToolsPage from './pages/AIToolsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Automation101 from './pages/Automation101';
import GoogleAnalytics from './components/Analytics/GoogleAnalytics';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to analytics
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Something went wrong</h1>
          <p>We're sorry, but something went wrong. Please try refreshing the page or contact support if the problem persists.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Page Component
const NotFound = () => (
  <div className="not-found-page">
    <Helmet>
      <title>404 - Page Not Found | TaskFlowAI</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <h1>Page Not Found</h1>
    <p>We're sorry, but the page you're looking for doesn't exist.</p>
    <a href="/" className="back-home">Return to Home</a>
  </div>
);

function App() {
  const location = useLocation();

  // Update page title and analytics on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="App">
        <GoogleAnalytics />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ai-tools" element={<AIToolsPage />} />
            <Route path="/automation-101" element={<Automation101 />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
