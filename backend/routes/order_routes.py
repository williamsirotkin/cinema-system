from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from datetime import datetime
from bson import ObjectId
from bson import json_util
from pymongo.collation import Collation
from pymongo import MongoClient, ReturnDocument

app = Flask(__name__)

order = Blueprint("order", __name__, url_prefix="/order")

@order.route("/")
def order_home():
    return "This is the order routes."

@order.route('/reserveTickets', methods=['POST'])
def order_submit():
    # {
    #     "total": 34.45,
    #     "movie": {
    #         "name": "Superbad",
    #         "room": "room_one",
    #         "showtime": "2023-04-10T18:00:00.000+00:00"
    #     },
    #     "seats": [
    #         {
    #             "seatNumber": 14,
    #             "seatType": "Child"
    #         },
    #         {
    #             "seatNumber": 15,
    #             "seatType": "Adult"
    #         }
    #     ],
    #     "promoApplied": "PercentTest",
    #     "promoValue": "10.99",
    #     "email": "williamsirotkin@gmail.com"
    # }
    order_tickets = db['order_Tickets']
    order_booking = db['order_Booking']
    data = request.get_json()

    print(data)

    # calculate final total amount
    promo_value = float(data['promoValue'])
    total_amount = float(data['total']) - promo_value

    # find the document in the room collection
    room_name = data['movie']['room']
    showtime = datetime.fromisoformat(data['movie']['showtime'])
    room = db[room_name].find_one({'showtime': showtime})

    # update seats_available array
    seats = data['seats']
    for seat in seats:
        seat_number = seat['seatNumber']
        room['seats_available'][seat_number] = False
    db[room_name].update_one({'_id': room['_id']}, {'$set': {'seats_available': room['seats_available']}})

    # create documents in order_tickets collection
    tickets = []
    for seat in seats:
        ticket = {
            'seatNumber': seat['seatNumber'],
            'seatType': seat['seatType'],
            'movie': data['movie']['name'],
            'room': room_name,
            'showtime': showtime
        }
        ticket_id = order_tickets.insert_one(ticket).inserted_id
        tickets.append(ticket_id)

    # create document in order_booking collection
    booking = {
        'total_amount': total_amount,
        'movie': data['movie'],
        'seats': seats,
        'promo_applied': data['promoApplied'],
        'email': data['email'],
        'tickets': tickets
    }
    order_booking.insert_one(booking)

    return 'Order successfully created!'

@order.route("/getInvoice/<string:email>")
# [
#     {
#         "_id": "6447460a44cc31f75e2261af",
#         "email": "williamsirotkin@gmail.com",
#         "movie": {
#             "name": "Superbad",
#             "room": "room_one",
#             "showtime": "2023-04-10T18:00:00.000+00:00"
#         },
#         "promo_applied": "PercentTest",
#         "seats": [
#             {
#                 "seatNumber": 14,
#                 "seatType": "Child"
#             },
#             {
#                 "seatNumber": 15,
#                 "seatType": "Adult"
#             }
#         ],
#         "tickets": [
#             {
#                 "$oid": "6447460a44cc31f75e2261ad"
#             },
#             {
#                 "$oid": "6447460a44cc31f75e2261ae"
#             }
#         ],
#         "total_amount": 23.46
#     }
# ]
def get_orders_by_email(email):
    orders = db.order_Booking.find({"email": email})
    order_list = []
    for order in orders:
        order["_id"] = str(order["_id"])
        order_list.append(order)
    return json.loads(json_util.dumps(order_list))

@order.route("/getTicket/<id>")
def get_order_ticket(id):
    order_ticket = db.order_Tickets.find_one({"_id": ObjectId(id)})
    if order_ticket:
        order_ticket["_id"] = str(order_ticket["_id"])
        return jsonify(order_ticket)
    else:
        return jsonify({"message": "Order ticket not found"})



@order.route("/getTickets", methods=["POST"])
# {
#     "tickets": [
#         "61f0b7c2670fc2b71223a39f",
#         "61f0b7c2670fc2b71223a3a0",
#         "61f0b7c2670fc2b71223a3a1"
#     ]
# }
def get_order_tickets():
    request_data = request.get_json()
    ticket_ids = request_data.get("tickets")
    order_tickets = []
    for ticket_id in ticket_ids:
        order_ticket = db.order_Tickets.find_one({"_id": ObjectId(ticket_id)})
        if order_ticket:
            order_tickets.append(order_ticket)
    return json.loads(json_util.dumps(order_tickets))