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
    return "This is the promotions routes."

@promo.route('/get-all', methods=['GET'])
def get_all():
    all_items = list(db.promotions.find())
    for item in all_items:
        item['_id'] = str(item['_id'])
    return jsonify(all_items)

@promo.route("/add", methods=['POST'])
def promo_add():
    data = request.json
    db.promotions.insert_one(data)
    return 'OK'

@promo.route("/delete/<promoId>", methods=['DELETE'])
def promo_delete(promoId):
    print(promoId)
    db.promotions.delete_one({'_id': ObjectId(promoId)})
    return 'OK'

