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


@app.route('/getReviews', methods=['POST'])
def get_reviews():
    json_request = request.get_json()
    array_of_user_review = convert(json_request)
    array_with_reviews = rate_multiple_reviews(array_of_user_review)
    return jsonify(array_with_reviews)

@app.route('/getReviewsAndAverage', methods=['POST'])
def get_reviews_and_average():
    jsonRequest = request.get_json()
    arrayOfUserReview = convert(jsonRequest)
    average = linear_classification_and_average(arrayOfUserReview)
    print(average)
    return jsonify(average)

@app.route('/getLinearClassification', methods=['POST'])
def get_linear():
    jsonRequest = request.get_json()
    arrayOfUserReview = convert(jsonRequest)
    arrayWithReviews = linear_classification(arrayOfUserReview)
    print(arrayWithReviews)

    return jsonify(arrayWithReviews)




if __name__ == '__main__':
    app.run('host=0.0.0.0')
