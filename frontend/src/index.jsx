import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        const data = await response.json();
        setApiStatus(data.message || 'Connected successfully');
      } catch (error) {
        console.error('Backend connection error:', error);
        setError('Failed to connect to backend API');
        setApiStatus('Offline');
      }
    };
    
    checkBackend();
  }, []);
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0ea5e9' }}>AIMS - AI Meeting Summarizer</h1>
      <p>Coming soon! Our app is under development.</p>
      
      <div style={{ marginTop: '40px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '18px', color: '#0369a1' }}>Backend Status</h2>
        <p style={{ 
          color: error ? '#dc2626' : '#16a34a',
          fontWeight: 'bold'
        }}>
          {error || apiStatus}
        </p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);