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
    order_data = request.json

    # calculate final total amount
    promo_value = float(order_data["promoValue"])
    total_amount = order_data["total"] - promo_value

    # get movie information
    movie_name = order_data["movie"]["name"]
    room_name = order_data["movie"]["room"]
    showtime = datetime.fromisoformat(order_data["movie"]["showtime"])

    # update seats availability in MongoDB
    seats_collection = db[room_name]
    for seat in order_data["seats"]:
        seat_number = seat["seatNumber"] - 1
        seat_type = seat["seatType"]
        seats_collection.update_one({"showtime": showtime}, {"$set": {f"seats_available.{seat_number}": False}})

    # create order tickets documents
    order_tickets = []
    for seat in order_data["seats"]:
        order_tickets.append({
            "seatNumber": seat["seatNumber"],
            "seatType": seat["seatType"],
            "movieName": movie_name,
            "roomName": room_name,
            "showtime": showtime,
            "orderBookingId": None
        })

    # create order booking document
    order_booking = {
        "subtotal": order_data["total"],
        "total": total_amount,
        "promoApplied": order_data["promoApplied"],
        "email": order_data["email"],
        "movieName": movie_name,
        "roomName": room_name,
        "showtime": showtime,
        "orderTickets": order_tickets
    }
    order_booking_id = db.order_Booking.insert_one(order_booking).inserted_id

    # update order tickets documents with order booking id
    for order_ticket in order_tickets:
        order_ticket["orderBookingId"] = order_booking_id
        db.order_Tickets.insert_one(order_ticket)

    # return success response
    response_data = {
        "message": "Order created successfully",
        "orderId": str(order_booking_id)
    }
    return jsonify(response_data), 201

@order.route("/getInvoice/<string:email>")
# /getInvoice/williamsirotkin@gmail.com
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


@order.route('/getTickets/<orderBookingId>', methods=['GET'])
# /getTickets/<64482e9ef9da294df84487ed>
#[
#     {
#         "movieName": "Superbad",
#         "orderBookingId": "64482e9ef9da294df84487ed",
#         "roomName": "room_one",
#         "seatNumber": 14,
#         "seatType": "Child",
#         "showtime": "2023-04-10 18:00:00"
#     },
#     {
#         "movieName": "Superbad",
#         "orderBookingId": "64482e9ef9da294df84487ed",
#         "roomName": "room_one",
#         "seatNumber": 15,
#         "seatType": "Adult",
#         "showtime": "2023-04-10 18:00:00"
#     }
# ]
#
def get_order_tickets(orderBookingId):
    order_tickets = []
    for ticket in db.order_Tickets.find({"orderBookingId": ObjectId(orderBookingId)}):
        ticket_dict = {
            "seatNumber": int(ticket["seatNumber"]),
            "seatType": ticket["seatType"],
            "movieName": ticket["movieName"],
            "roomName": ticket["roomName"],
            "showtime": str(ticket["showtime"]),
            "orderBookingId": str(ticket["orderBookingId"])
        }
        order_tickets.append(ticket_dict)
    return jsonify(order_tickets)