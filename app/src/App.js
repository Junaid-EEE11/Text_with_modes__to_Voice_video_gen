#npx create-react-app voice-modification-app
#cd voice-modification-app
#npm install axios
#npm start


import React from 'react';
import VoiceModificationForm from './components/VoiceModificationForm';
import VoiceResults from './components/VoiceResults';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = React.useState(null);

  const handleSubmission = (response) => {
    setApiResponse(response);
  };

  return (
    <div className="App">
      <h1>Voice Modification App</h1>

      <VoiceModificationForm onSubmission={handleSubmission} />

      {apiResponse?.error ? (
        <ErrorMessage message={apiResponse.error} />
      ) : (
        <VoiceResults modifiedVoice={apiResponse?.message} sentiment={apiResponse?.sentiment} />
      )}
    </div>
  );
}

export default App;
