from flask import Flask, request, Response
from init import create_app
from flask_cors import CORS
from db import db

app = create_app()

@app.route('/',methods=['GET'])
def hello_world():
    return 'This is our backend'

if __name__ == '__main__':
    app.run()