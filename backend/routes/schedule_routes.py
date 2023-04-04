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

    if collection_name not in db.list_collection_names():
        return jsonify({'error': f'Collection {collection_name} not found.'}), 400

    collection = db[collection_name]
    showtimes = []
    for doc in collection.find({}, {'_id': 0, 'showtime': 1}):
        showtime = doc['showtime']
        showtimes.append(showtime)

    return jsonify({'showtimes': showtimes})


@schedule.route('/getMovieSchedule', methods=['GET'])
def get_movie_schedule():
    movie_id = request.args.get('movie_id')
    movie_title = request.args.get('movie_title')

    if movie_id:
        query = {'movie_id': ObjectId(movie_id)}
    elif movie_title:
        query = {'movie_title': movie_title}
    else:
        return jsonify({'message': 'Please provide a movie_id or movie_title'})

    projection = {'schedule': 1, '_id': 0}
    schedules = db.movie_schedule.find_one(query, projection)

    if not schedules:
        return jsonify({'message': 'Movie not found'})

    return jsonify({'schedule': schedules['schedule']})

@schedule.route('/scheduleMovie', methods=['POST'])
def schedule_movie():
    # param is = "room_one", "room_two"....
    # data=
    # {
    #     "showtime": [
    #         "2023-09-03 01:00:00",
    #         "2023-11-03 02:00:00",
    #         "2023-12-03 03:00:00"
    #     ],
    #     "movie_title": "Superbad",
    #     "movie_id": "6421daad33a6f676ac62ee53"
    # }
    data = request.json
    print(data)
    showtimes = data.get('showtime')

    for key, value in data.items():
        if value is None or value == "":
            return Response(status=400)

    collection_name = request.args.get('collection')
    print(request.args)
    collection = db[collection_name]

    time_checks = [{'showtime': datetime.fromisoformat(showtime)} for showtime in showtimes]
    existing_schedules = collection.find({'$or': time_checks})

    for schedule in existing_schedules:
        print(f"There is already a movie scheduled at {schedule['showtime']}")
        return Response(status=400)

    try:
        schedule_rooms = [{
            'showtime': datetime.fromisoformat(showtime),
            'movie_id': ObjectId(data.get('movie_id')),
            'movie_title': data.get('movie_title'),
            'seats_available': [True] * 25,
        } for showtime in showtimes]
    except KeyError as e:
        missing_key = str(e).strip("'")
        error_msg = f"Missing value for '{missing_key}' key in movie_map"
        print(error_msg)
        return Response(status=400)

    room_scheduling = collection.insert_many(schedule_rooms)
    room_scheduling_ids = room_scheduling.inserted_ids
    room_scheduling_object_ids = [ObjectId(id) for id in room_scheduling_ids]

    result_find = db.movie_schedule.find_one({'movie_id': ObjectId(data.get('movie_id'))})
    if result_find:
        new_schedules = [{'room_name': collection_name, 'showtime': datetime.fromisoformat(showtime)} for showtime in
                         showtimes]
        print("testCase1")
        movie_master_scheduling = db.movie_schedule.update_one(
            {'movie_id': ObjectId(data.get('movie_id'))},
            {'$push': {'schedule': {'$each': new_schedules}}}
        )
        print("movies thing", movie_master_scheduling)
    else:
        print("testCase2")
        try:
            movie_master_schedule = {
                'movie_id': ObjectId(data.get('movie_id')),
                'movie_title': data.get('movie_title'),
                'schedule': [{'room_name': collection_name, 'showtime': datetime.fromisoformat(showtime)} for showtime
                             in showtimes]
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
    else:
        return Response(status=201)

@schedule.route('/deleteShowtime', methods=['DELETE'])
def delete_movie_schedule():
    movie_title = request.args.get('movie_title')
    showtime = request.args.get('showtime')
    room_name = request.args.get('room_name')

    t_obj = datetime.strptime(showtime, "%Y-%m-%d %H:%M:%S")

    # Find the movie schedule document
    movie_schedule = db.movie_schedule.find_one({'movie_title': movie_title})
    if not movie_schedule:
        return jsonify({'error': 'Movie schedule not found.'}), 404

    # Find the room name where the movie is playing and ensure that it matches the given room name
    room_name_found = False
    for schedule in movie_schedule['schedule']:
        if str(schedule['showtime']) == showtime and schedule['room_name'] == room_name:
            room_name_found = True
            break
    if not room_name_found:
        return jsonify({'error': 'Showtime not found for the given room name.'}), 404

    # Delete the document in the timeseries collection
    room_schedule_collection = db[room_name]
    room_schedule = room_schedule_collection.find_one({'showtime': t_obj})
    if not room_schedule:
        return jsonify({'error': 'Room schedule not found.'}), 404
    room_schedule_collection.delete_many({'showtime': t_obj})

    # Remove the showtime from the schedule array in the movie schedule document
    for i, schedule in enumerate(movie_schedule['schedule']):
        if str(schedule['showtime']) == showtime and schedule['room_name'] == room_name:
            movie_schedule['schedule'].pop(i)
            break
    db.movie_schedule.update_one({'_id': movie_schedule['_id']}, {'$set': {'schedule': movie_schedule['schedule']}})

    return jsonify({'message': 'Showtime deleted successfully.'}), 200


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



