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

@promo.route('/get-promos', methods=['GET'])
def get_promos():
    all_items = list(db.promotions.find())
    for item in all_items:
        item['_id'] = str(item['_id'])
    return jsonify(all_items)

@promo.route('/get-emails', methods=['GET'])
def get_emails():
    emails = list(db.profile.find({'registered_for_promos': True, 'active': 'active'}).distinct('email'))
    print(jsonify(emails))
    return jsonify(emails)

@promo.route('/get-promo-value', methods = ['POST'])
def get_promo_value():
    data = request.json
    promo = list(db.promotions.find({'promoName': data['promoName']}))
    print(promo)
    print(promo[0])
    return jsonify({
        'promoName': data['promoName'],
        'discountAmnt': promo[0]['discountAmnt'],
        'discountType': promo[0]['discountType']
    })

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

