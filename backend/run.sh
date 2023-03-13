#!/bin/bash  
. venv/bin/activate
pip3 install Flask certifi python-dotenv
python3 -m pip install pymongo
flask --debug run