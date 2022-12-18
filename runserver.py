from flask import Flask, render_template, request, json, Response
from flask_cors import CORS
from os import environ
import numpy as np
import pandas as pd
import pickle
from flask_socketio import SocketIO
import torch
import time
import cv2
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__,static_url_path="")
CORS(app)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

bot = ChatBot(
    'Thakudu',  
    logic_adapters=[
        'chatterbot.logic.BestMatch',
        'chatterbot.logic.TimeLogicAdapter'],
)
trainer = ListTrainer(bot)

trainer.train([
    'Hi',
    'Hello, how can i help you today?',
    'hi, im not feeling well and i think i might have a cold',
    'Im sorry to hear that. Can you tell me a little bit more about your symptoms? ',
    'I have ',
    'Could you elaborate your symptoms a bit more?',
    'I have ',
    'Do you have any skin rash?',
    'Yes / No',
    'Do you have body pain?',
    'Yes / No',
    'Have you lost any '
    'Okay thanks for your analysis!',
    'No Problem! Have a Good Day!'
])

class ObjectDetection:
    
    def __init__(self):
        
        self.model = self.load_model()
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        # self.device = 'cpu'
        print("\n\nDevice Used:",self.device)



    def load_model(self):
                
        model = torch.hub.load('Yolov5', 'custom', path=r'Yolov5\best2.pt', source='local',force_reload=False)
        model.conf = 0.20 
        model.max_det = 10
        return model


    def score_frame(self, frame):
        
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)
     
        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord


    def class_to_label(self, x):
        
        return self.classes[int(x)]


    def plot_boxes(self, results, frame):
        labels, cord = results
        n = len(labels)
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.2:
                x1, y1, x2, y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                bgr = (0, 255, 0)
                # roi = frame[y1:y2,x1:x2]
                print(labels)
                
                cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)

        return frame


detector = ObjectDetection()


def live():
    cam = cv2.VideoCapture(0)
    while cam.isOpened():
        success,input = cam.read()
        label = detector.score_frame(input)
        input = detector.plot_boxes(label, input)
        ret, buffer = cv2.imencode(".png", input)
        input = buffer.tobytes()
        yield ( b"--input\r\n"
                b"Content-Type: image/png\r\n\r\n" + input + b"\r\n"
        )

@app.route('/')
def home():
    return render_template('index.html', status = 200)

@app.route('/Emotion')
def showEmotion():
    return Response(
        live(), mimetype="multipart/x-mixed-replace; boundary=input", status=200
    )
    
@app.route('/chat', method  = 'POST')
def liveChat():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        jsondata = request.json        
        if len(jsondata['value'])>0:
            x = jsondata['value']
            x = np.asarray(x)
            x = x.reshape(1,-1)
            pass
        response = bot.get_response(str(jsondata['user']))

        print("Bot Response:", response)
        return Response(response, status = 200)
    

@app.route('/form/<disease>' , methods =["POST"])
def predDisease(disease=str):
    if disease == 'heart':
        X = []
        loaded_model = pickle.load(open(r'D:\PROJECT\DYNAMITE\SAVED_MODEL\heart_model.sav','rb'))
        # Age,Sex,Chest pain type,BP,Cholesterol,FBS over 120,EKG results,Max HR,Exercise angina,ST depression,Slope of ST,Number of vessels fluro,Thallium
        # result = loaded_model.score(x_test, y_test)
        param = [
            'Age','Sex','Chest_pain_type','BP',
            'Cholesterol','FBS_over_120','EK_results',
            'Max_HR','Exercise_angina','ST_depression',
            'Slope_of_ST','Number_of_vessels_fluro','Thallium'
        ]
        # for i in range(len(param)):
        #     print("req  : ",request.form.get('Chest_pain_type'))
        #     X.append(request.form.get(str(param[i])))
        
        
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            jsondata = request.json
            # print(jsondata)
            # print(int(jsondata['Age']))
            X.append(int(jsondata['Age']))
            X.append(int(jsondata['Sex']))
            X.append(int(jsondata['Chest_pain_type']))
            X.append(int(jsondata['BP']))
            X.append(int(jsondata['Cholesterol']))
            X.append(int(jsondata['FBS_over_120']))
            X.append(int(jsondata['EK_results']))
            X.append(int(jsondata['Max_HR']))
            X.append(int(jsondata['Exercise_angina']))
            X.append(int(jsondata['ST_depression']))
            X.append(int(jsondata['Slope_of_ST']))
            X.append(int(jsondata['Number_of_vessels_fluro']))
            X.append(int(jsondata['Thallium']))

        # print(X)
        X = np.asarray(X)
        X = X.reshape(1,-1)
        result = loaded_model.predict(X)
        # print(result)
        send_res = json.dumps(result[0])
        # print(send_res)
        return Response(send_res, status = 200)
        
    elif disease == 'breast':
        #id,diagnosis,radius_mean,texture_mean,perimeter_mean,area_mean,smoothness_mean,compactness_mean,concavity_mean,concave points_mean,symmetry_mean,fractal_dimension_mean,
        # radius_se,texture_se,perimeter_se,area_se,smoothness_se,compactness_se,concavity_se,concave points_se,symmetry_se,fractal_dimension_se,radius_worst,texture_worst,
        # perimeter_worst,area_worst,smoothness_worst,compactness_worst,concavity_worst,concave points_worst,symmetry_worst,fractal_dimension_worst
        X = []
        loaded_model = pickle.load(open(r'D:\PROJECT\DYNAMITE\SAVED_MODEL\breast_cancer_model.sav','rb'))
        # Age,Sex,Chest pain type,BP,Cholesterol,FBS over 120,EKG results,Max HR,Exercise angina,ST depression,Slope of ST,Number of vessels fluro,Thallium
        # result = loaded_model.score(x_test, y_test)
        param = [
            "diagnosis","radius_mean","texture_mean","perimeter_mean",
            "area_mean","smoothness_mean","compactness_mean","concavity_mean",
            "concave points_mean","symmetry_mean","fractal_dimension_mean",
            "radius_se","texture_se","perimeter_se","area_se","smoothness_se",
            "compactness_se","concavity_se","concave points_se","symmetry_se",
            "fractal_dimension_se","radius_worst","texture_worst","perimeter_worst",
            "area_worst","smoothness_worst","compactness_worst","concavity_worst",
            "concave points_worst","symmetry_worst","fractal_dimension_worst"
        ]
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            jsondata = request.json
            for i in range(len(param)):
                # print("req  : ",request.form.get('diagnosis'))
                X.append(int(jsondata[str(param[i])]))
            X = np.asarry(X)
            X = X.reshape(1,-1)
            result = loaded_model.predict(X)
            new_res = ""
            if result[0]==0:
                new_res = "Malignant"
            else:
                new_res = "Benign"
            send_res = json.dumps(new_res)
            return Response(send_res, status = 200)
    
    elif disease == 'parkinson':
        X = []
        loaded_model = pickle.load(open(r'D:\PROJECT\DYNAMITE\SAVED_MODEL\parkinson_model.sav','rb'))
        # Age,Sex,Chest pain type,BP,Cholesterol,FBS over 120,EKG results,Max HR,Exercise angina,ST depression,Slope of ST,Number of vessels fluro,Thallium
        # result = loaded_model.score(x_test, y_test)
        param = [
            'MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)', 'MDVP:Jitter(%)',
            'MDVP:Jitter(Abs)', 'MDVP:RAP', 'MDVP:PPQ', 'Jitter:DDP',
            'MDVP:Shimmer', 'MDVP:Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5',
            'MDVP:APQ', 'Shimmer:DDA', 'NHR', 'HNR', 'RPDE', 'DFA',
            'spread1', 'spread2', 'D2', 'PPE'
       ]
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            jsondata = request.json
            for i in range(len(param)):
                # print("req  : ",request.form.get('diagnosis'))
                X.append(int(jsondata[str(param[i])]))
        X = np.asarry(X)
        X = X.reshape(1,-1)
        result = loaded_model.predict(X)
        new_res = ""
        if result[0]==0:
            new_res = "Normal"
        else:
            new_res = "Parkinson confirmed"
        send_res = json.dumps(new_res)
        return Response(send_res, status = 200)
        

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '100'))
    except ValueError:
        PORT = 5000
    except OSError:
        PORT = 7000
    socketio.run(HOST, PORT, debug=True)