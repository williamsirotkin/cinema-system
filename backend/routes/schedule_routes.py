from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from datetime import datetime
from bson import json_util
import re
from pymongo.collation import Collation

app = Flask(__name__)

schedule = Blueprint("schedule", __name__, url_prefix="/schedule")


@schedule.route("/")
def schedule_home():
    return "This is the schedule routes."


@schedule.route('/getAllRoomSchedule', methods=['GET'])
def get_room_schedule():
    # postman param of collection name only, example "room_one"
    collection_name = request.args.get('collection')
    collection = db[collection_name]
    showtimes = []
    for doc in collection.find({}, {'_id': 0, 'showtime': 1}):
        showtime = doc['showtime']
        showtimes.append(showtime)
    return jsonify({'showtimes': showtimes})


@schedule.route('/getMovieSchedule', methods=['GET'])
def get_movie_schedule():
    movie_title = request.args.get('movie_title')
    query = {'movie_title': movie_title}
    projection = {'schedule': 1, '_id': 0}
    schedules = db.movie_schedule.find_one(query, projection)

    if not schedules:
        return jsonify({'message': 'Movie not found'})

    return jsonify({'schedule': schedules['schedule']})


@schedule.route('/scheduleMovie', methods=['POST'])
def schedule_movie():
    data = request.json
    # test if data.user.is admin
    # return Response(status=401) unauthorized
    for key, value in data.items():
        if value is None or value == "":
            return Response(status=400)
    # # Example of input
    # {
    #     "showtime": "2023-04-03T06:15:27Z",
    #     "movie_title": "Superbad",
    #     "movie_id": "6421daad33a6f676ac62ee53"
    # }
    # #
    # #
    movie_title = request.json.get('movie_title'),
    seats_available = [True] * 25
    collection_name = request.args.get('collection')
    collection = db[collection_name]

    time_check = {'showtime': datetime.fromisoformat(request.json.get('showtime'))}
    if collection.find_one(time_check):
        print("There is a movie at that given time.")
        return Response(status=400)
    try:
        schedule_room = {
            'showtime': datetime.fromisoformat(request.json.get('showtime')),
            'movie_id': ObjectId(request.json.get('movie_id')),
            'movie_title': request.json.get('movie_title'),
            'seats_available': seats_available,
            "roomData": {"room_Id": "collection"}
        }
    except KeyError as e:
        missing_key = str(e).strip("'")
        error_msg = f"Missing value for '{missing_key}' key in movie_map"
        print(error_msg)
        return Response(status=400)

    room_scheduling = collection.insert_one(schedule_room)
    room_scheduling_id = room_scheduling.inserted_id
    room_scheduling_object_id = ObjectId(room_scheduling_id)

    result_find = db.movie_schedule.find_one({'movie_id': ObjectId(request.json.get('movie_id'))})
    if result_find:
        new_schedule = {
            'room_name': collection_name,
            'showtime': datetime.fromisoformat(request.json.get('showtime'))
        }
        print("testCase1")
        movie_master_scheduling = db.movie_schedule.update_one(
            {'movie_id': ObjectId(request.json.get('movie_id'))},
            {'$push': {'schedule': new_schedule}}
        )
        print("movies thing", movie_master_scheduling)
    else:
        print("testCase2")
        try:
            movie_master_schedule = {
                'movie_id': ObjectId(request.json.get('movie_id')),
                'movie_title': request.json.get('movie_title'),
                'room_schedule_id': room_scheduling_object_id,
                'schedule': [
                    {'room_name': collection_name, 'showtime': datetime.fromisoformat(request.json.get('showtime'))}]
            }
        except KeyError as e:
            missing_key = str(e).strip("'")
            error_msg = f"Missing value for '{missing_key}' key in movie_details_map"
            print(error_msg)
            return Response(status=400)

        movie_master_scheduling = db.movie_schedule.insert_one(movie_master_schedule)

    # return the ID of the inserted document
    if room_scheduling is None or movie_master_scheduling is None:
        return Response(status=400)
    return "Success for" + str(room_scheduling_object_id) + " and " + str(movie_master_scheduling) + "."

# @schedule.route("/createCollection")
# # DO NOTE DELETE DO NOT EXECUTE please UwU UwU
# def schedule_collection():
#     db.create_collection("room_five", timeseries={
#         "timeField": "showtime",
#         "metaField": "roomData",
#         "granularity": "hours"
#     })
#
#     return "Success"

# @schedule.route("/cleanCollection")
# # DO NOTE DELETE DO NOT EXECUTE please UwU UwU
# def clean_collection():
#     collection_name = request.args.get('collection')
#     collection = db[collection_name]
#     stink = db.collection.remove({})
#     return stink
#
