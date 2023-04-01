from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from bson import json_util
import re
from pymongo.collation import Collation

app = Flask(__name__)

schedule = Blueprint("schedule", __name__, url_prefix="/schedule")

@schedule.route("/")
def schedule_home():
    return "This is the schedule routes."