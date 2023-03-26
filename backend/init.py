from flask import Flask, Blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__) 
    cors = CORS(app)

    #Put blueprints in here
    with app.app_context():
        from routes.profile_routes import profile
        
        app.register_blueprint(profile)

        from routes.movie_routes import movie

        app.register_blueprint(movie)
    return app

    