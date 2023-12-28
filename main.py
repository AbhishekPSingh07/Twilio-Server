import assemblyai as aai
import pyttsx3 as p
import speech_recognition as sr
from assistants import BasicAssistant
from TTS.api import TTS
from playsound import playsound
import os

wav_file_path = './file.wav'
aai.settings.api_key = "35520186abe24a75942d182eb1a9f110"
device = "cpu"
output_file_path = './output.wav'
tts = TTS("tts_models/en/ljspeech/tacotron2-DDC").to(device)
r= sr.Recognizer()

engine = p.init()
engine.setProperty('rate', 180)
engine.setProperty('pitch', 150)  # Adjust pitch

engine.setProperty('volume', 0.9)  # Adjust volume (0.0 to 1.0)
done = False

booked_slots = [10, 12, 15]

def get_empty_slots(booked_slots):
    all_slots = list(range(9, 19))
    empty_slots = [slot for slot in all_slots if slot not in booked_slots]
    return convert_to_time_format(empty_slots)

def convert_to_time_format(slots):
    time_slots = []
    for slot in slots:
        if slot <= 12:
            time_slots.append(f"{slot} am")
        else:
            time_slots.append(f"{slot-12} pm")
    return time_slots

def speak(text):
    engine.say(text)
    engine.runAndWait()
    
def empty_appointments():
    empty_time_slots = get_empty_slots(booked_slots)
    if empty_time_slots:
        print("Empty slots:")
        return "We have empty slots at:" +", ".join(empty_time_slots)
    else:
        return "All slots are booked."
        
def check_and_book(number):
    if 9 <= number <= 18:
        if number in booked_slots:
            return "Sorry, The Slot has already been booked"
        else:
            booked_slots.append(number)
            return "Appointent has been booked successfully. Thank You."
    else:
        return "Sorry , We do not operate at those timmings."

assistant = BasicAssistant('./intents.json',method_mappings = {
    "Reservation": empty_appointments
})
# assistant.fit_model(epochs=300)
# assistant.save_model()
assistant.load_model()

while not done:
    with sr.Microphone() as source:
        r.energy_threshold = 10000
        r.adjust_for_ambient_noise(source,0.2)
        print("listening")
        audio = r.listen(source)
        with open(wav_file_path, 'wb') as wav_file:
            wav_file.write(audio.get_wav_data())
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe("./file.wav")
        message = transcript.text
    if message == "STOP":
        done = True
    else:
        response = assistant.process_input(message)
        tts.tts_to_file(text=response, file_path=output_file_path)
        playsound(output_file_path)




# speak("Hello Sir, I am Your Voice Assistant.What can i do for You?")






