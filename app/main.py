from flask import Flask, request, jsonify
from app.sentiment_analyzer import SentimentAnalyzer
from app.voice_modifier import VoiceModifier
from pydub import AudioSegment
from pydub.playback import play
import datetime;

app = Flask(__name__)
sentiment_analyzer = SentimentAnalyzer()
voice_modifier = VoiceModifier()

@app.route('/modify_voice', methods=['POST'])
def modify_voice():
    data = request.get_json()

    text = data['text']
    mode = data['mode']

    sentiment = sentiment_analyzer.analyze_sentiment(text)
  
    modified_audio = voice_modifier.modify_voice(text, mode)
    tnow=datetime.datetime.now()

    temp_filename = 'outputs/m_audio_'+tnow.year+tnow.month+tnow.hour+tnow.min+tnow.second+tnow.microsecond+'.mp3'
    modified_audio.export(temp_filename, format="mp3")

    play(AudioSegment.from_mp3(temp_filename))

    return jsonify({'message': 'Voice modification successful', 'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)

