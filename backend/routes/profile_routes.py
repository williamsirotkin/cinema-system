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

    user = {
        'first_name' : data['first_name'],
        'email' : data['email'],
        'last_name' : data['last_name'],
        'password' : data['password'],
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
    