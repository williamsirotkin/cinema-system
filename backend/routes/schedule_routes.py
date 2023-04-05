from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from datetime import datetime, timedelta
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
    room_id = request.args.get('room_id')
    # Get the current date.
    current_date = datetime.utcnow()

    # Calculate the end date of the third week from now.
    end_date = current_date + timedelta(weeks=10)

    # Query the database for all showtimes for the given room during the next three weeks.
    showtimes = db.showtimes.find({'room': room_id, 'start_time': {'$gte': current_date, '$lte': end_date}}).sort(
        'start_time')

    # Create an empty dictionary to store the showtimes by week.
    showtimes_by_week = {}

    # Loop through all showtimes and group them by week.
    for showtime in showtimes:
        # Calculate the week number of the showtime.
        week_number = (showtime['start_time'].date() - current_date.date()).days // 7 + 1

        # Get the week name for the current week number.
        week_name = f'week_{week_number}'

        # Create an empty list for the week if it doesn't exist yet.
        if week_name not in showtimes_by_week:
            showtimes_by_week[week_name] = []

        # Add the ISO-formatted showtime to the list for the current week.
        showtimes_by_week[week_name].append(showtime['start_time'].strftime('%Y-%m-%d %H:%M:%S'))


    # Return the JSON object.
    return jsonify(showtimes_by_week)


@schedule.route('/getMovieSchedule', methods=['GET'])
def get_movie_showtimes():
    ###### param is movie_title
    #### RETURNS THIS #####
    # {
    #     "week_35": [
    #         "2023-09-03T00:27:00"
    #     ],
    #     "week_36": [
    #         "2023-09-04T00:27:00"
    #     ],
    #     "week_40": [
    #         "2023-10-03T02:15:27",
    #         "2023-10-05T02:15:27"
    #     ],
    #     "week_44": [
    #         "2023-11-03T03:15:27"
    #     ],
    #     "week_45": [
    #         "2023-11-06T03:15:27"
    #     ]
    # }
    movie_title = request.args.get('movie_title')
    showtimes = list(db.showtimes.find({'movie_title': movie_title}))
    if len(showtimes) == 0:
        print("No movies or no Schedule exists for: " + movie_title + ".")
        return Response(status=400)

    showtimes_by_week = {}

    for showtime in showtimes:
        week = f'week_{(showtime["start_time"].isocalendar()[1])}'
        if week not in showtimes_by_week:
            showtimes_by_week[week] = []
        showtimes_by_week[week].append(showtime['start_time'].strftime('%Y-%m-%d %H:%M:%S'))


    return jsonify(showtimes_by_week)


@schedule.route('/scheduleMovie', methods=['POST'])
def schedule_movie():
    ## param example  collection=room_three
    # {
    #     "showtime": [
    #         "2023-09-04 06:27",
    #         "2023-09-05 02:15:27",
    #         "2023-10-06 03:15:27"
    #     ],
    #     "movie_title": "Interstellar",
    #     "movie_id": "6421dcfc33a6f676ac62ee55"
    # }

    data = request.json
    movie_title = data.get('movie_title')
    movie_id = ObjectId(data.get('movie_id'))
    showtimes = data.get('showtime')
    room = request.args.get('collection')

    seats = [True] * 25

    # Check if the same movie is playing in the same room at the same time
    for showtime in showtimes:
        start_time = datetime.fromisoformat(showtime)
        end_time = start_time + timedelta(hours=3)
        same_showtime = db.showtimes.find_one(
            {'room': room, 'start_time': {'$lte': end_time}, 'end_time': {'$gte': start_time}})
        if same_showtime:
            return jsonify({'error': f'{movie_title} is already playing in {room} at {showtime}.'}), 400

    # Insert showtimes into the database
    for showtime in showtimes:
        start_time = datetime.fromisoformat(showtime)
        end_time = start_time + timedelta(hours=3)
        db.showtimes.insert_one(
            {'room': room, 'movie_title': movie_title, 'movie_id': movie_id, 'start_time': start_time,
             'end_time': end_time, 'seats': seats})

    return jsonify({'success': f'{movie_title} has been scheduled in {room} at {showtimes}.'}), 201

@schedule.route('/deleteShowtime', methods=['DELETE'])
def delete_movie_schedule():
    movie_title = request.args.get('movie_title')
    start_time = request.args.get('showtime')
    room_name = request.args.get('room_name')

    start_time = datetime.fromisoformat(start_time)

    # Delete the showtime from the database
    result = db.showtimes.delete_one({'movie_title': movie_title, 'start_time': start_time})

    # Check if a document was deleted
    if result.deleted_count == 1:
        return jsonify({'success': f'Showtime for {movie_title} on {start_time} has been deleted.'}), 200
    else:
        return jsonify({'error': f'No showtime found for {movie_title} on {start_time}.'}), 404

@schedule.route('/deleteMovieShowtimes', methods=['DELETE'])
def delete_showtimes_by_title():
    movie_title = request.args.get('movie_title')

    result = db.showtimes.delete_many({'movie_title': movie_title})

    return jsonify({'deleted_count': result.deleted_count, 'movie_title': movie_title})

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



