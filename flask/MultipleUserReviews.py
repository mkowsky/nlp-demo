import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import pickle


def rateMultipleReviews(userReviews):
    userReview = 'It feels like it was written by a 13 year old boy. Very naive assumptions of how criminals and even how people in general behave. Its really hard to believe or relate to anything in this movie.$#$#One of the best films of all time, an absolute masterpiece. The Godfather is arguably the best gangster drama as well as setting the standard for cinema.'
    userReview = userReview.split("$#$#")
    returnedValues = []
    stop_words = set(stopwords.words('english'))
    processed_review = []
    numberOfReviews = len(userReview)
    for i in range(0, numberOfReviews):
        userReview[i] = re.sub('<.*?>', ' ', userReview[i])
        userReview[i] = re.sub('\W', ' ', userReview[i])
        userReview[i] = re.sub('\s+[a-zA-Z]\s+', ' ', userReview[i])
        userReview[i] = re.sub('\s+', ' ', userReview[i])
        word_tokens = word_tokenize(userReview[i])
        filtered_review = " ".join([w for w in word_tokens if w not in stop_words])
        processed_review.append(filtered_review)

    cv = pickle.load(open('countvectorizer', 'rb'))
    tfidf_transformer = pickle.load(open('tfidf_transformer', 'rb'))
    count_vector = cv.transform(processed_review)
    tf_idf_vector = tfidf_transformer.transform(count_vector)
    feature_names = cv.get_feature_names()
    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    predict_using_loaded_model = loaded_model.predict(tf_idf_vector)
    for j in range(0, numberOfReviews):
        if (predict_using_loaded_model[j] == 0):
            returnedValues.append("negative")
        else:
            returnedValues.append("positive")
    return returnedValues
