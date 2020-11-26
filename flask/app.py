from flask import Flask, request
from flask_cors import CORS

from convert_json_request_to_review_array import *
from user_reviews import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getReview', methods=['POST'])
def get_review():
    json_request = request.get_json()
    review = json_request['review']
    return rate_single_review(review)


@app.route('/getReviews', methods=['POST'])
def get_reviews():
    jsonRequest = request.get_json()
    arrayOfUserReview = convert(jsonRequest)
    arrayWithReviews = rate_multiple_reviews(arrayOfUserReview)
    stringWithReviews = ""
    for i in range(0, len(arrayWithReviews)):
        stringWithReviews += (" " + arrayWithReviews[i])
    return stringWithReviews


if __name__ == '__main__':
    app.run(host='0.0.0.0')
