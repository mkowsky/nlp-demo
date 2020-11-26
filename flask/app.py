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
    json_request = request.get_json()
    array_of_user_review = convert(json_request)
    array_with_reviews = rate_multiple_reviews(array_of_user_review)
    string_with_reviews = ""
    for i in range(0, len(array_with_reviews)):
        string_with_reviews += (" " + array_with_reviews[i])
    return string_with_reviews


if __name__ == '__main__':
    app.run(host='0.0.0.0')
