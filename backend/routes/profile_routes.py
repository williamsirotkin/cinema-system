from flask import Flask, Blueprint, request, Response, jsonify
import json
#from db import db
from flask_cors import cross_origin

profile = Blueprint("profile", __name__, url_prefix="/profile")



@profile.route("/")
def profile_home():
    return "This is the profile routes"
'''
@profile.route('/create', methods = ['POST'])
@cross_origin()
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
    '''