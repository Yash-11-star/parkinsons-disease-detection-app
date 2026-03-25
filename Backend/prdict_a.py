import joblib
import librosa
import numpy as np

def extract_features(file_path):
    audio, sr = librosa.load(file_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
    return np.mean(mfccs.T, axis=0)

# Function to predict Parkinson's disease from a new audio file
def predict_parkinsons(audio_file, model):
    features = extract_features(audio_file)
    prediction = model.predict([features])[0]
    return prediction

# Example usage for prediction
audio_file_path = "C:/Users/khush/Documents/Project/Backend/AudioDataset/HC_AH/AH_121A_BD5BA248-E807-4CB9-8B53-47E7FFE5F8E2.wav"  # Update with the path to your test audio file
loaded_model = joblib.load('Audio_model.joblib')  # Load the saved model
prediction = predict_parkinsons(audio_file_path, loaded_model)

if prediction == 1:
    print("The person may have Parkinson's disease.")
else:
    print("The person is likely healthy.")

