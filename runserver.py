from flask import Flask, render_template, request
from flask_cors import CORS
from os import environ
import numpy as np
import pandas as pd
import pickle


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html', status = 200)

@app.route('/form/<disease>' , methods =["POST"])
def predDisease(disease=str):
    if disease == 'heart':
        X = []
        loaded_model = pickle.load(open(r'D:\PROJECT\DYNAMITE\SAVED_MODEL\heart_model.sav','rb'))
        # Age,Sex,Chest pain type,BP,Cholesterol,FBS over 120,EKG results,Max HR,Exercise angina,ST depression,Slope of ST,Number of vessels fluro,Thallium
        # result = loaded_model.score(x_test, y_test)
        param = ['Age','Sex','Chest_pain_type','BP','Cholesterol','FBS_over_120','EK_results','Max_HR','Exercise_angina','ST_depression','Slope_of_ST','Number_of_vessels_fluro','Thallium']
        for i in range(len(param)):
            X = X.append(request.form.get(param[i]))
        X = np.asarry(X)
        X = 
        
    elif disease == '':
        pass
    elif disease == '':
        pass
    elif disease == '':
        pass
        

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '100'))
    except ValueError:
        PORT = 5000
    except OSError:
        PORT = 7000
    app.run(HOST, PORT, debug=False)