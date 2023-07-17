from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = load_model('model.h5')

# Define the class labels
class_labels = ['no cavity', 'stage 1', 'stage 2', 'stage 3']

# Function to preprocess the uploaded image
def preprocess_image(img):
    img = img.resize((180, 180))
    img = np.array(img)
    img = img.reshape(1, 180, 180, 3)
    img = img / 255.0
    return img

# Route to handle the home page
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle the "Continue as guest" button
@app.route('/frist')
def frist():
    return render_template('frist.html')

@app.route('/doctorlogin')
def doctorlogin():
    return render_template('Doctor_login.html')

@app.route('/patientlogin')
def patientlogin():
    return render_template('Patient_Login.html')

@app.route('/regis')
def regis():
    return render_template('registration_Patient.html')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('upload.html', message='No file selected')

        file = request.files['file']

        if file.filename == '':
            return render_template('upload.html', message='No file selected')

        img = Image.open(file)

        # Preprocess the image
        processed_img = preprocess_image(img)

        # Make prediction
        prediction = model.predict(processed_img)
        class_index = np.argmax(prediction)
        predicted_class = class_labels[class_index]
        accuracy = prediction[0][class_index] * 100

        return render_template('result.html', predicted_class=predicted_class, accuracy=accuracy)

    return render_template('upload.html')

@app.route('/result')
def result():
    return render_template('result.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
