from flask import Flask, Blueprint, request, Response, jsonify
import json
from db import db

profile = Blueprint("profile", __name__, url_prefix="/profile")

@profile.route("/")
def profile_home():
    return "This is the profile routes"