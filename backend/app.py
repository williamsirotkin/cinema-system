from flask import Flask, request
from init import create_app

app = Flask(__name__)

app = create_app()

@app.route('/',methods=['GET'])
def hello_world():
    return 'This is our backend'

if __name__ == '__main__':
    app.run()