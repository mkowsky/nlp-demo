from flask import Flask, request
from flask_cors import CORS

from ConverJsonRequestToReviewArray import *
from MultipleUserReviews import *
from SingleUserReview import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getReview', methods=['POST'])
def get_review():
    jsonRequest = request.get_json()
    review = jsonRequest['review']
    return rateSingleReview(review)

@app.route('/getReviews', methods=['POST'])
def get_reviews():
    jsonRequest = request.get_json()
    print(jsonRequest)
    arrayOfUserReview = convert(jsonRequest)
    arrayWithReviews = rateMultipleReviews(arrayOfUserReview)
    stringWithReviews=""
    for i in range(0, len(arrayWithReviews)):
        stringWithReviews += (" " + arrayWithReviews[i])
    return stringWithReviews




if __name__ == '__main__':
    app.run(host='0.0.0.0')
