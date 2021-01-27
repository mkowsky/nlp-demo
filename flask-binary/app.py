from flask import Flask, request, jsonify
from flask_cors import CORS

from convert_json_request_to_review_array import *
from user_reviews import *


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/getReviewsAndKeywords', methods=['POST'])
def get_reviews_and_keywords():
    jsonRequest = request.get_json()
    arrayOfUserReview = convert(jsonRequest)
    arrayWithReviews, keywords = rate_multiple_reviews_add_keywords(arrayOfUserReview)
    return jsonify(arrayWithReviews, keywords)

if __name__ == '__main__':
    app.run('host=0.0.0.0')
