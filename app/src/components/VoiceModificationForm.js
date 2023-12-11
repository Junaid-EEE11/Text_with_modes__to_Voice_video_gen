import React, { useState } from 'react';
import axios from 'axios';
import './VoiceModificationForm.css';

function VoiceModificationForm({ onSubmission }) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('comedy');
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

      onSubmission(response.data);
    } catch (error) {
      console.error('Error modifying voice:', error.message);
      setError('Error modifying voice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voice-modification-form">
      {/* ... existing JSX ... */}
    </div>
  );
}

export default VoiceModificationForm;
