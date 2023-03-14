'''
from flask import Flask, Blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__)  
    CORS(app, resources={r"/*": {"origins": "*"}})

    with app.app_context():
        from routes.profile_routes import profile

        app.register_blueprint(profile)
    return app
'''
    