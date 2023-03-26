from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
# import jwt

app = Flask(__name__)

movie = Blueprint("movie", __name__, url_prefix="/movie")

@movie.route("/")
def movie_home():
    return "This is the movie routes."

@movie.route("/addMovie", methods = ['POST'])
def add_movie():
    data = request.json
    # test if data.user.is admin
    # return Response(status=401) unauthorized

    for key, value in data.items ():
        if value is None or value =="":
            return Response(status=400)

    # print(data['title'])
    # myquery = {"title": data['title']}
    # result = db.movie.find({}, myquery)
    # for x in result:
    #     print("result is: ", result)
    # if result:
    #     return Response(status=412)

    query_title = {"title": data['title']}
    if db.movie.find_one(query_title, {'_id': 1}):
        return Response(status=409)


    movie_map = {
            "title": data['title'],
            "MPAA_rating": data['MPAA_rating'],
            "photo_link": data['photo_link'],
            "trailer_link": data['trailer_link'],
            "category": data['category']
        }

    result1 = db.movie.insert_one(movie_map)
    movie_id = result1.inserted_id
    movie_object_id = ObjectId(movie_id)

    movie_details_map = {
        "movie_id": movie_object_id,
        "cast": data['cast'],
        "director": data['director'],
        "producer": data['producer'],
        "synopsis": data['synopsis'],
        "reviews": data['reviews']
         }

    result = db.movie_details.insert_one(movie_details_map)

    if result:
        return Response(status=201)
    else:
        return Response(status=400)

@movie.route("/removeMovie", methods = ['DELETE'])
def remove_movie():
    data = request.json
    # test if data.user.is admin
    # return Response(status=401) unauthorized

    if 'title' in data:
        if data['title'] is None or data['title'] == "":
            print("title is none")
            return Response(status=400)
    else:
        return Response(status=400)

    query_title = {"title": data['title']}
    movie_query_result = db.movie.find_one(query_title, {'_id': 1})

    if movie_query_result is None:
        return Response(status=406)

    movie_id = ObjectId(movie_query_result["_id"])

    result_movie_details = db.movie_details.delete_one({"movie_id": movie_id})
    result_movie = db.movie.delete_one({"_id": movie_id})

    #MAKE SURE TO DELETE SCHEDUEL TOO

    if result_movie_details.deleted_count == 1 and result_movie.deleted_count == 1:
        return Response(status=202)
    else:
        return Response(status=204)
