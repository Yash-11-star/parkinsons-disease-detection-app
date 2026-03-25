import os
from fastapi import UploadFile
import numpy as np
from PIL import Image
import io
from keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from tensorflow import image as keras_image


# # Path to the new image
# new_Spiral = "C:/Users/khush/Documents/Project/Backend/NewData/P_Spiral.webp"
# new_Wave = "C:/Users/khush/Documents/Project/Backend/NewData/H_wave.png"

# Load and preprocess the new image


async def WaveDrawingPrediction(images):
    print(type(images))
    try:
        image_bytes = await images.read()
        print(image_bytes)
        new_image = Image.open(io.BytesIO(image_bytes))
        new_image = new_image.convert('RGB')  # Ensure image has 3 channels (RGB)
        new_image = new_image.resize((224, 224))
        new_image_array_wave = img_to_array(new_image)
        new_image_array_wave = np.expand_dims(new_image_array_wave, axis=0)
        new_image_array_wave /= 255.0  # Normalize pixel values

        wave_model = load_model('C:/Users/khush/Documents/Project/Backend/wave_model_new_new', compile=False)
        
        prediction_wave = wave_model.predict(new_image_array_wave)
        
        print("prediction_wave: ", prediction_wave[0][0])
        print(f"Chances of Parkinson's disease is {prediction_wave[0][0]*100} %")
        print(prediction_wave[0][0]*100)
        return prediction_wave[0][0]*100
    finally:
        print("in finally block")
        await images.close()

async def SpiralDrawingPrediction(images):
    
    print(type(images))
    try:
        image_bytes = await images.read()
        print(image_bytes)
        new_image = Image.open(io.BytesIO(image_bytes))
        new_image = new_image.convert('RGB')  # Ensure image has 3 channels (RGB)
        new_image = new_image.resize((224, 224))
        new_image_array_spiral = img_to_array(new_image)
        new_image_array_spiral = np.expand_dims(new_image_array_spiral, axis=0)
        new_image_array_spiral /= 255.0  # Normalize pixel values

        spiral_model = load_model('C:/Users/khush/Documents/Project/Backend/spiral_model_new', compile=False)
        

        # Make predictions
        prediction_spiral = spiral_model.predict(new_image_array_spiral)
        
        # prediction_wave = wave_model.predict(new_image_array_wave)
        print("prediction_spiral: ", prediction_spiral[0][0])
        print(f"Chances of Parkinson's disease is {prediction_spiral[0][0]*100} %")
        
        return prediction_spiral[0][0]*100
    finally:
        print("in finally block")
        await images.close()
    # Interpret the prediction
    # if prediction_spiral[0][0] > 0.5:
    #     print("The person likely has Parkinson's disease.")
    # else:
    #     print("The person is likely healthy.")