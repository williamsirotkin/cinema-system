from flask import Flask, Blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__) 
    cors = CORS(app)

    #Put blueprints in here
    with app.app_context():
        from routes.profile_routes import profile
        from routes.movie_routes import movie
        from routes.promo_routes import promo
        
        app.register_blueprint(profile)
        app.register_blueprint(movie)
        app.register_blueprint(promo)
    return app

    