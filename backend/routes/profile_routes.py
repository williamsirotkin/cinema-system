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

    promos = False
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
        'registered_for_promos': data['promos'],
        'card_info': cardInfo,
        'birthday': birthDay
    }

    print(user)

    db.profile.insert_one(user)
    return Response(status=201)

@profile.route('/login', methods = ['POST'])
def login():
    data = request.json
    
    # Login with email and password if there is no JWT from user, send JWT to user
    jwt_token = generate_jwt(data['email'])
    print(bcrypt.generate_password_hash(data['password']))
    result = db.profile.find_one({"email": data['email']})
    if result:
        if (bcrypt.check_password_hash(result['password'], data['password'])):
            jwt_token = generate_jwt(data['email'])
            isAdmin = db.admin.find_one({"email": data['email']})
            if isAdmin:
                return jsonify({'firstName': result['first_name'], 'lastName': result['last_name'], 'email': result['email'], 'admin': True, 'token': jwt_token})
            return jsonify({'firstName': result['first_name'], 'lastName': result['last_name'],  'email': result['email'], 'admin': False, 'token': jwt_token})
    return Response(status=404)

@profile.route('/jwt/login', methods = ['POST'])
def jwt_login():
    data = request.json

    # Login with JWT if user sends valid JWT 
    email = ""
    if (data['jwt']):
        jwtGeneratedEmail = decode_jwt(data['jwt'])['email']
        jwt_token = data['jwt']
        result = db.profile.find_one({"email": jwtGeneratedEmail})
        isAdmin = db.admin.find_one({"email": jwtGeneratedEmail})
        temp = False
        if isAdmin:
            temp = True
        return jsonify({'firstName': result['first_name'],
                        'lastName': result['last_name'],
                        'email': result['email'],
                        'birthday': result['birthday'],
                        'active': result['active'],
                        'billing_address': result['billing_address'],
                        'promos': result['registered_for_promos'],
                        'admin': temp,
                        'token': jwt_token
                        })
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
    email = data['email']

    update_dict = {}
    for key, value in data.items():
        if key != 'email' and key != 'oldPassword' and key != 'newPassword' and value is not None and value != "":
            update_dict[key] = value
    if 'oldPassword' in data:
        result = db.profile.find_one({"email": data['email']})
        if bcrypt.check_password_hash(result['password'], data['oldPassword']):
            update_dict['password'] = bcrypt.generate_password_hash(data['newPassword'])
        else:
            return Response(status=401)
    cardInfo = ""
    if (update_dict['card_info']):
        cardInfo = data['card_info']
        cardInfo['name'] = bcrypt.generate_password_hash(cardInfo['name'])
        cardInfo['cardNumber'] = bcrypt.generate_password_hash(cardInfo['cardNumber'])
        cardInfo['expiry'] = bcrypt.generate_password_hash(cardInfo['expiry'])
        cardInfo['cvc'] = bcrypt.generate_password_hash(cardInfo['cvc'])
        data['card_info'] = cardInfo

    result = db.profile.update_one({'email': email}, {'$set': update_dict});
    if result:
        return Response(status=200)
    return Response(status=400)


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

@profile.route('/retrieveProfile', methods = ['PATCH'])
def retrieve_profile():
    data = request.json
