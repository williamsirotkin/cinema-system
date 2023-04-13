from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from bson import json_util
from pymongo.collation import Collation

app = Flask(__name__)

seat = Blueprint("seat", __name__, url_prefix="/seat")

@seat.route("/")
def seat_home():
    return "This is the seat routes."



