from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

profile = Blueprint("profile", __name__, url_prefix="/profile")

@profile.route("/")
def profile_home():
    return "This is the profile routes"

@profile.route('/create', methods = ['POST'])
def create_profile():
    data = request.json

    billingAddress = ""
    if (data['billing_address']):
        billingAddress = data['billing_address']

    cardInfo = ""
    if (data['card_info']):
        cardInfo = data['card_info']
        cardInfo['name'] = bcrypt.generate_password_hash(cardInfo['name'])
        cardInfo['cardNumber'] = bcrypt.generate_password_hash(cardInfo['cardNumber'])
        cardInfo['expiry'] = bcrypt.generate_password_hash(cardInfo['expiry'])
        cardInfo['cvc'] = bcrypt.generate_password_hash(cardInfo['cvc'])


    birthDay = ""
    if (data['birthday']):
        birthDay = data['birthday']

    encryptedPassword = bcrypt.generate_password_hash(data['password'])

    user = {
        'first_name' : data['first_name'],
        'email' : data['email'],
        'last_name' : data['last_name'],
        'password' : encryptedPassword,
        'active': True,
        'billing_address': billingAddress,
        'card_info': cardInfo,
        'birthday': birthDay
    }

    print(user)

    db.profile.insert_one(user)
    return Response(status=201)

@profile.route('/login', methods = ['POST'])
def login():
    data = request.json

    # Login with JWT if user sends valid JWT 
    email = ""
    if (data['jwt']):
        jwtGeneratedEmail = decode_jwt(data['jwt'])['email']
        jwt_token = data['jwt']
        print(jwt_token)
        print(jwtGeneratedEmail)
        if (jwtGeneratedEmail == data['email']):
            isAdmin = db.admin.find_one({"email": data['email']})
            if isAdmin:
                return jsonify({'admin': True, 'token': jwt_token})
            return jsonify({'admin': False, 'token': jwt_token})
    
    # Login with email and password if there is no JWT from user, send JWT to user
    jwt_token = generate_jwt(data['email'])
    result = db.profile.find_one({"email": data['email'], "password": data['password']})
    if result:
        jwt_token = generate_jwt(data['email'])
        isAdmin = db.admin.find_one({"email": data['email']})
        if isAdmin:
            return jsonify({'admin': True, 'token': jwt_token})
        return jsonify({'admin': False, 'token': jwt_token})
    return Response(status=404)
    
@profile.route('/checkEmailInUse', methods = ['POST']) 
def check_email_in_use():
    data = request.json
    print(data)
    result = db.profile.find_one({"email": data['email']})
    if result:
        return Response(status=400)
    return Response(status=200)

@profile.route('/editProfile', methods = ['PATCH'])
def edit_profile():
    data = request.json
    print(data)

    profile = {
        'first_name' : data['first_name'],
        'email' : data['email'],
        'last_name' : data['last_name'],
        'password' : data['password'],
    }


def generate_jwt(email):
    exp_time = datetime.utcnow() + timedelta(minutes=int(os.environ['AUTHENTICATION_TIMEOUT_IN_MINUTES']))

    payload = {
        'email': email,
        'exp': exp_time
    }

    jwt_token = jwt.encode(payload, os.environ['AUTHENTICATION_PRIVATE_KEY'], algorithm='HS256')
    return jwt_token

def decode_jwt(jwt_token):
    payload = jwt.decode(jwt_token, os.environ['AUTHENTICATION_PRIVATE_KEY'], algorithms=['HS256'])
    return payload