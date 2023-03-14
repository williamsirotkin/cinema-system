import certifi
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

db = MongoClient("mongodb+srv://abc123:" + os.environ['DB_PASSWORD'] + "@cluster0.rayvvnm.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
#print(db['cinema'].find_one({"name": "Thomas"}))
db = db.Cinema