import re
import ALOUDpackage.settings as GLOBAL
import ALOUDpackage.AcronymController as ACRONYMS
import ALOUDpackage.ToneEnum as ALOUDTone
import subprocess









#%%
# from pydub import AudioSegment
# from pydub.playback import play
# import pyttsx3
# import os

#AUDIO CREATOR==========================================
# ENGINE = pyttsx3.init('sapi5')
# voices = ENGINE.getProperty('voices')#fetching different voices from the system
# ENGINE.setProperty('voice', voices[1].id)#setting voice properties
# ENGINE.setProperty('rate', 170)#sets speed of speech
# FINAL_NAME = "./src/final_audio.wav"




#%%
#FUNCTIONS===============================================
import subprocess
import pyaudio
import wave
import os

import subprocess
import pyaudio
import wave
import os
import subprocess
import pyaudio
import wave
import os

def read(text):
    # Define your text and other parameters
    model_path = r".\ALOUDpackage\piper_windows_amd64\languages\en_US-kathleen-low.onnx"
    piper_path = r".\ALOUDpackage\piper_windows_amd64\piper.exe"
    output_path = r".\ALOUDpackage\piper_windows_amd64\output\test1.wav"

    if not os.path.exists(piper_path):
        print("piper.exe not found!", os.getcwd())
        return
    if not os.path.exists(model_path):
        print("Model file not found!", os.getcwd(), model_path)
        return

    # Execute piper command and capture output
    try:
        print("1sdfs")
        process = subprocess.run(
            [piper_path, '--model', model_path, '--input_text', text, '--output_file', output_path],
            check=True,
            capture_output=True,
            text=True
        )
        
        print("asdfasdf")
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        print(f"Stderr: {e.stderr}")
        return

    # Play the saved audio file immediately
    try:
        print("1")
        wf = wave.open(output_path, 'rb')
        p = pyaudio.PyAudio()

        print("2")
        # Define callback to stream audio
        def callback(in_data, frame_count, time_info, status):
            data = wf.readframes(frame_count)
            return (data, pyaudio.paContinue)

        print("3")
        # Open a Stream to play the audio
        stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                        channels=wf.getnchannels(),
                        rate=wf.getframerate(),
                        output=True,
                        stream_callback=callback)

        print("4")
        # Start the Stream
        stream.start_stream()

        print("5")
        # Keep the Stream active until the audio is finished
        while stream.is_active():
            pass

        print("6")
        # Clean up
        stream.stop_stream()
        stream.close()
        wf.close()
        p.terminate()

        print("7")
        print(f"Audio has been saved to: {output_path}")

    except Exception as e:
        print(f"Error playing audio: {e}")

# Call the function
# read("Hello, this is a test using piperTTS.")



def speed_change(sound, speed=1.0):
    pass
    # # Manually override the frame_rate. This tells the computer how many
    # # samples to play per second
    # sound_with_altered_frame_rate = sound._spawn(sound.raw_data, overrides={
    #     "frame_rate": int(sound.frame_rate * speed)
    # })

    # # convert the sound with altered frame rate to a standard frame rate
    # # so that regular playback programs will work right. They often only
    # # know how to play audio at standard frame rate (like 44.1k)
    # return sound_with_altered_frame_rate.set_frame_rate(sound.frame_rate)

def audio_happy(name):
    pass
    # print(name)
    # audio = AudioSegment.from_wav(name)
    # octaves = .1
    # happy = speed_change(audio, 1.2)
    # happy = happy + 10
    # # sample  = int(happy.frame_rate * (2.0 ** octaves))
    # # happy  = happy._spawn(happy.raw_data, overrides={'frame_rate': sample})
    # # happy = happy.set_frame_rate(48000)
    # storedAudio = happy.export(name, format="wav")

def audio_angry(name):
    pass
    # audio = AudioSegment.from_wav(name)
    # octaves = -.05
    # angry = speed_change(audio, .8)
    # # sample  = int(angry.frame_rate * (2.0 ** octaves))
    # # angry  = angry._spawn(angry.raw_data, overrides={'frame_rate': sample})
    # # angry = angry.set_frame_rate(48000)
    # # angry = angry + 10
    # storedAudio = angry.export(name, format="wav")

def audio_sad(name):
    pass
    # # audio = AudioSegment.from_wav(name)
    # # octaves = -.05
    # # sad = speed_change(audio, 0.6)
    # # sad = sad -5
    # # sample  = int(sad.frame_rate * (2.0 ** octaves))
    # # sad  = sad._spawn(sad.raw_data, overrides={'frame_rate': sample})
    # # sad = sad.set_frame_rate(48000)
    # # storedAudio = sad.export(name, format="wav")
    # audio = AudioSegment.from_wav(name)
    # sad = speed_change(audio, .8)
    # storedAudio = sad.export(name, format="wav")

def audio_silence():
    pass
    # timesec = 1 * 1000
    # silence = AudioSegment.silent(duration=timesec)
    # # play(silence)
    # silence.export("silence.wav", format="wav")


def audio_combine(audio_name, output_name):
    pass
    # silence = AudioSegment.from_wav("silence.wav")
    # final = silence
    # for name in audio_name:
    #     audio = AudioSegment.from_wav(name)
    #     final = final.append(audio)
    #     os.remove(name)

    # storedAudio = final.export(output_name, format="wav")

#enables speech
def audio_play(audio):
    pass
    # final = AudioSegment.from_wav(audio)
    # play(final)

def audio_create(name, text):
    pass
    # ENGINE.save_to_file(text, name)
    # ENGINE.runAndWait()

def speech_to_text(speech_array):
    pass
    # audio_silence()
    # audios_names = []
    # for index, speech in enumerate(speech_array):
    #     audio_name = f"audio_{index}.wav"
    #     audios_names.append(audio_name)

    #     audio_create(audio_name, speech["text"])

    #     # if speech["tone"] == "happy":
    #     #     audio_happy(audio_name)
    #     # if speech["tone"] == "angry":
    #     #     audio_angry(audio_name)        
    #     if speech["tone"] == "sad":
    #         audio_sad(audio_name)        
    #     #if normal or anything else, nothing

    # audio_combine(audios_names, FINAL_NAME)    
    # audio_play(FINAL_NAME)

    


















#=====================================================================================================================================
#FUNCTIONS TRIGGERED ON FIRST COMMUNICATION
#=====================================================================================================================================


#=====================================================================================================================================
#PUBLIC FUNCTIONS
#=====================================================================================================================================
def compile(text: str):
    pass
    # """
    #     This function compiles text in ALOUD to regular text, replacing acronyms and dividing the text in an array of tones
    #     @param text
    #         A string
    #     @return
    #         A list of objects of the form [  {tone: tone, text:value}, {tone:tone2, text:value2} ] 
    # """
    # try:
    #     text = text.lower()
    #     text = ACRONYMS.replace_acronyms(text)

    #     if not "{" in text:        
    #         text = "\\normal{" + text + "}";
        

    #     tones = _extract_tones(text)
    #     speech_to_text(tones)
    #     return tones
    # except:
    #     print("An error while compiling")
    #     return None


#=====================================================================================================================================
#PRIVATE FUNCTIONS
#=====================================================================================================================================

def _extract_tones(text:str):
    pass
    # """
    #     Given a string, this function returns an array with all the individual tones 
    #     @param text
    #         A string
    #     @return
    #         A list of objects of the form [  {tone: tone, text:value}, {tone:tone2, text:value2} ] 
    # """
    
    # # \\ to detect the scape char; \w* to detect any word; \s followed by spaces; { and ends with a curly brace
    # # \tone{ or \tone { 
    # p = re.compile(r'\\\w+\s*{[^{}]*\}')
    # response = []
    # try:
    #     tones = p.findall(text)

    #     for tone in tones:
    #         key_value   = tone.split("{")
    #         key         = key_value[0][1:].strip()  #ignores the \ scape char
    #         value       = key_value[1][:-1] #ignores the closing }
            
    #         if key not in ALOUDTone.Tone:
    #             print(f"Error (compiler._extract_tones): Tone does not exists: {key}")
    #             return None

    #         temp        = {  "tone": key, "text":value }
    #         response.append(temp) 
    # except Exception as error:
    #     print("Error (compiler._extract_tones): Error while obtaining the tones ", error)
    #     return None
    
    # return response
    

