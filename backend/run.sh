#!/bin/bash  
. venv/bin/activate
pip3 install Flask certifi python-dotenv flask-cors
python3 -m pip install pymongo
flask --debug run