#npx create-react-app voice-modification-app
#cd voice-modification-app
#npm install axios
#npm start


import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import a separate CSS file for styling

function App() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('comedy');
  const [modifiedVoice, setModifiedVoice] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/modify_voice', {
        text: text,
        mode: mode,
      });

      setModifiedVoice(response.data.message);
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error modifying voice:', error.message);
      setError('Error modifying voice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Voice Modification App</h1>

      <div className="input-section">
        <label>Enter Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
        />
      </div>

      <div className="input-section">
        <label>Select Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="comedy">Comedy</option>
          <option value="serious">Serious</option>
          <option value="fast">Fast</option>
          <option value="slow">Slow</option>
        </select>
      </div>

      <div className="button-section">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {modifiedVoice && (
        <div className="result-section">
          <h2>Modified Voice</h2>
          <audio controls>
            <source src={modifiedVoice} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {sentiment && (
        <div className="result-section">
          <h2>Sentiment Analysis</h2>
          <p>Sentiment: {sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
