from gtts import gTTS
from pydub import AudioSegment
from pydub.effects import speedup, slowdown

class VoiceModifier:
    def modify_voice(self, text, mode):
        tts = gTTS(text=text, lang='en', slow=False)
        audio_data = tts.get_raw_data()

        if mode == 'comedy':
            modified_audio = self.add_comedy_effect(audio_data)
        elif mode == 'serious':
            modified_audio = self.add_serious_effect(audio_data)
        elif mode == 'fast':
            modified_audio = self.add_speedup_effect(audio_data)
        elif mode == 'slow':
            modified_audio = self.add_slowdown_effect(audio_data)
        # Add more modes as needed
        else:
            modified_audio = AudioSegment.from_raw(audio_data, frame_rate=tts.frame_rate, sample_width=tts.sample_width, channels=1)

        return modified_audio

    def add_comedy_effect(self, audio_data):
        # Adding of comedy modification logic (increasing pitch or adding funny sound effects)
        modified_audio = AudioSegment.from_raw(audio_data, frame_rate=1.5 * audio_data.frame_rate)
        return modified_audio

    def add_serious_effect(self, audio_data):
        # Adding serious modification logic (decreasing pitch or adding dramatic pauses)
        modified_audio = AudioSegment.from_raw(audio_data, frame_rate=0.8 * audio_data.frame_rate)
        return modified_audio

    def add_speedup_effect(self, audio_data):
        # Adding fast modification logic
        modified_audio = speedup(AudioSegment.from_raw(audio_data, frame_rate=audio_data.frame_rate), playback_speed=1.5)
        return modified_audio

    def add_slowdown_effect(self, audio_data):
        # Adding slow modification logic
        modified_audio = slowdown(AudioSegment.from_raw(audio_data, frame_rate=audio_data.frame_rate), playback_speed=0.75)
        return modified_audio
