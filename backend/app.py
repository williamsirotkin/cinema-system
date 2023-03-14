from flask import Flask, request, Response
#from init import create_app
from flask_cors import CORS
from db import db

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def hello_world():
    return 'This is our backend'

@app.route('/profile/create', methods = ['POST'])
def create_profile():
    data = request.json

    user = {
        'first_name' : data['first_name'],
        'email' : data['email'],
        'last_name' : data['last_name'],
        'password' : data['password'],
    }

    print(user)

    db.profile.insert_one(user)
    return Response(status=201)

if __name__ == '__main__':
    app.run()