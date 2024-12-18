import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import AIToolsPage from './pages/AIToolsPage';
import './App.css';

function App() {
  console.log('App rendering');
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
