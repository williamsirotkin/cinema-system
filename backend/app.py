from flask import Flask, request

app = Flask(__name__)

@app.route('/',methods=['GET'])
def hello_world():
    return 'This is our backend'

@app.route('/names', methods=['POST'])
def names():
    data = request.json
    name = data['name']
    age = data['age']
    if name == "William":
        return "Sirotkin"
    if name == "Tom":
        return "Kostoryano"

if __name__ == '__main__':
    app.run()