import numpy as np
import matplotlib.pyplot as plt
from keras.layers import Dense, Reshape, Flatten, Input, Concatenate, Conv2D, Conv2DTranspose, UpSampling2D
from keras.models import Model
from keras.optimizers import Adam
from keras.preprocessing.image import img_to_array, array_to_img
from keras.utils import plot_model

# Load the input image
input_image_path = 'C:/Users/khush/Documents/Project/Backend/drawings/spiral/testing/healthy/V02HE01.png'
input_image = plt.imread(input_image_path)
input_image = (input_image.astype(np.float32) - 127.5) / 127.5
input_image = np.array(input_image)
input_image = img_to_array(array_to_img(input_image).resize((64, 64)))

# Define the generator model
def build_generator():
    noise_shape = (100,)
    input_noise = Input(shape=noise_shape)
    
    x = Dense(128 * 8 * 8, activation='relu')(input_noise)
    x = Reshape((8, 8, 128))(x)
    
    x = Conv2DTranspose(128, kernel_size=3, strides=2, padding='same', activation='relu')(x)
    x = Conv2DTranspose(64, kernel_size=3, strides=2, padding='same', activation='relu')(x)
    x = Conv2DTranspose(3, kernel_size=3, strides=2, padding='same', activation='tanh')(x)
    x = UpSampling2D(size=(2, 2))(x)  # Upsample to match the size of the real image
    
    generator_model = Model(input_noise, x)
    return generator_model

# Load the trained generator model
generator = build_generator()
generator.load_weights('generator_weights.h5')  # Assuming you have saved the weights after training

# Generate 100 images similar to the input image
num_generated_images = 100
generated_images = []

for _ in range(num_generated_images):
    noise = np.random.normal(0, 1, (1, 100))
    generated_image = generator.predict(noise)
    generated_images.append(generated_image)

# Plot the generated images
plt.figure(figsize=(12, 12))
for i in range(num_generated_images):
    plt.subplot(10, 10, i+1)
    plt.imshow(generated_images[i][0])
    plt.axis('off')
plt.tight_layout()
plt.show()
