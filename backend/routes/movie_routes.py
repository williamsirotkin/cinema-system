from flask import Flask, Blueprint, request, Response, jsonify
import json, os
from db import db
from bson import ObjectId
from bson import json_util
from pymongo.collation import Collation

app = Flask(__name__)

movie = Blueprint("movie", __name__, url_prefix="/movie")

@movie.route("/")
def movie_home():
    return "This is the movie routes."

@movie.route("/getAllMovies", methods=['GET'])
def get_all_movies():
    isDetails = request.args.get('isDetails')
    print(isDetails)

    #query param of isDetails ise equal to the string "true"

    if isDetails == "true" :
        pipeline = [
            {
                "$lookup": {
                    "from": "movie_details",
                    "localField": "_id",
                    "foreignField": "movie_id",
                    "as": "details"
                }
            },
            {
                "$addFields": {
                    "details": {"$arrayElemAt": ["$details", 0]}
                }
            }
        ]
        movie_collection_result = db.movie.aggregate(pipeline)
    else:
        movie_collection_result = db.movie.find()

    movie_collection = list(movie_collection_result)
    json_result = json_util.dumps(movie_collection)

    return json_result



@movie.route("/searchMovie", methods=['GET'])
def search_movie():
    query_name = request.args.get('query_name')
    collation = Collation(locale='en', strength=2)
    # result = db.movie.find_one({'title': {'$regex': query_name, '$options': 'i'}, 'collation': collation})
    #white space trails & syntax done on front end plz
    #use colobertaisonlnda
    # movie_query_result = db.movie.find_one({'title': query_name})
    # movie_query_Json = json_util.dumps(movie_query_result)

    pipeline = [
        {'$match': {'title': query_name}},
        {'$lookup': {
            'from': 'movie_details',
            'localField': '_id',
            'foreignField': 'movie_id',
            'as': 'details'
        }},
        {'$unwind': '$details'},
    ]
    movie_collection_result = list(db.movie.aggregate(pipeline))
    print(query_name)
    if len(movie_collection_result) > 0:
        movie_query_json = json_util.dumps(movie_collection_result)
        return movie_query_json
    else:
        return Response(status=404)

@movie.route("/searchByCategory", methods=['GET'])
def search_by_categroy():
    category = request.args.get('category')
    collation = Collation(locale='en', strength=2)
    # result = db.movie.find_one({'title': {'$regex': query_name, '$options': 'i'}, 'collation': collation})
    #white space trails & syntax done on front end plz
    #use colobertaisonlnda
    # movie_query_result = db.movie.find_one({'title': query_name})
    # movie_query_Json = json_util.dumps(movie_query_result)
    pipeline = [
        {'$match': {'category': category}},
        {'$lookup': {
            'from': 'movie_details',
            'localField': '_id',
            'foreignField': 'movie_id',
            'as': 'details'
        }},
        {'$unwind': '$details'},
    ]
    movie_collection_result = list(db.movie.aggregate(pipeline))
    if len(movie_collection_result) > 0:
        movie_query_json = json_util.dumps(movie_collection_result)
        return movie_query_json
    else:
        return Response(status=404)



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
    try:
        movie_map = {
            "title": data['title'],
            "MPAA_rating": data['MPAA_rating'],
            "photo_link": data['photo_link'],
            "trailer_link": data['trailer_link'],
            "isShowing": data['isShowing'],
            "category": data['category']
        }
    except KeyError as e:
        missing_key = str(e).strip("'")
        error_msg = f"Missing value for '{missing_key}' key in movie_map"
        print(error_msg)
        return Response(status=400)

    result1 = db.movie.insert_one(movie_map)
    movie_id = result1.inserted_id
    movie_object_id = ObjectId(movie_id)
    try:
        movie_details_map = {
            "movie_id": movie_object_id,
            "cast": data['cast'],
            "director": data['director'],
            "producer": data['producer'],
            "synopsis": data['synopsis'],
            "reviews": data['reviews']
         }
    except KeyError as e:
        missing_key = str(e).strip("'")
        error_msg = f"Missing value for '{missing_key}' key in movie_details_map"
        print(error_msg)
        return Response(status=400)


    result = db.movie_details.insert_one(movie_details_map)

    if result:
        return Response(status=201)
    else:
        return Response(status=400)

@movie.route("/removeMovie", methods = ['DELETE'])
def remove_movie():
    param_title = request.args.get('title')
    #data = request.json

    ##########################
    # test if data.user.is admin
    # return Response(status=401) unauthorized
    ###############################


    if param_title is None or param_title == "":
            print("title is none or ")
            return Response(status=404)
    query_title = {"title": param_title}
    movie_query_result = db.movie.find_one(query_title, {'_id': 1})

    if movie_query_result is None:
        return Response(status=406)

    movie_id = ObjectId(movie_query_result["_id"])

    result_movie_details = db.movie_details.delete_one({"movie_id": movie_id})
    result_movie = db.movie.delete_one({"_id": movie_id})

    ########################
    #MAKE SURE TO DELETE SCHEDULE TOO
    ############################

    if result_movie_details.deleted_count == 1 and result_movie.deleted_count == 1:
        return Response(status=202)
    else:
        return Response(status=204)
