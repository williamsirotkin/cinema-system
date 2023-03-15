from flask import Flask, Blueprint, request, Response, jsonify
import json
from db import db
from flask_cors import CORS

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

    birthDay = ""
    if (data['birthday']):
        birthDay = data['birthday']

    user = {
        'first_name' : data['first_name'],
        'email' : data['email'],
        'last_name' : data['last_name'],
        'password' : data['password'],
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

    result = db.profile.find_one({"email": data['email'], "password": data['password']})
    if result:
        return Response(status=200)
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