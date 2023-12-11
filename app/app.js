import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('comedy');
  const [modifiedVoice, setModifiedVoice] = useState(null);
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/modify_voice', {
        text: text,
        mode: mode,
      });

      setModifiedVoice(response.data.message);
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error modifying voice:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Voice Modification App</h1>

      <div>
        <label>Enter Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div>
        <label>Select Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="comedy">Comedy</option>
          <option value="serious">Serious</option>
          <option value="fast">Fast</option>
          <option value="slow">Slow</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {modifiedVoice && (
        <div>
          <h2>Modified Voice</h2>
          <audio controls>
            <source src={modifiedVoice} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {sentiment && (
        <div>
          <h2>Sentiment Analysis</h2>
          <p>Sentiment: {sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
