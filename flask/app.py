from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from UserReviewsLight import *
from MultipleUserReviews import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getReview', methods=['POST'])
def get_review():
    print('get')
    global userReview
    jsonRequest = request.get_json()
    print(jsonRequest)
    params = jsonRequest['params']
    print(params)
    userReview = params['recenzja']
    print(userReview)
    print(rateReview(userReview))
    print(rateMultipleReviews(userReview))
    return 'OK'


@app.route('/answer', methods=['GET'])
def send_answer():
    print("post")
    return rateReview(userReview)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
