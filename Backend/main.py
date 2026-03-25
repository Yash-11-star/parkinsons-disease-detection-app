from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from prediction import SpiralDrawingPrediction, WaveDrawingPrediction
from Audio_predict import predictAudio
app = FastAPI()

audio_client = File

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
prediction_spiral: any
prediction_wave: any
prediction_audio: any

@app.post("/api/upload-spiral-image")
async def upload__spiral_image(image: UploadFile):
    global prediction_spiral
    print("The type of image is:",type(image))
    prediction_spiral =  await SpiralDrawingPrediction(image)
    print(prediction_spiral)

@app.post("/api/upload-wave-image")
async def upload__wave_image(image: UploadFile):
    global prediction_wave
    print("The type of image is:",type(image))
    prediction_wave =  await WaveDrawingPrediction(image)
    print(prediction_wave)

@app.get("/api/spiral-drawing-detection")
def get_spiral_drawing_detection():
    # Complete the code to display value of prediction_spiral from predictions.py
    return prediction_spiral

@app.get("/api/wave-drawing-detection")
def get_wave_drawing_detection():
    # Complete the code to display value of prediction_spiral from predictions.py
    return prediction_wave

@app.get("/api/speech-detection")
def get_speech_detection():
    # Your logic for speech detection goes here
    return prediction_audio

@app.post("/api/upload-audio")
async def upload_audio(audio: UploadFile):
    # store_audio(audio)
    global prediction_audio
    prediction_audio = await predictAudio(audio.file)
    return prediction_audio

# def store_audio(audio:UploadFile):
#     print("HELLO",audio.filename)
#     return audio.filename

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
