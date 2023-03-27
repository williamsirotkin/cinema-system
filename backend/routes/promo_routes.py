from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from bson import json_util
from pymongo.collation import Collation

app = Flask(__name__)

promo = Blueprint("promotions", __name__, url_prefix="/promotions")

@promo.route("/")
def promo_home():
    return "This is the promo routes."

@promo.route("/new", methods=['POST'])
def promo_new():
