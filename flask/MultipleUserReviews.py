import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import pickle


def rateMultipleReviews(userReviews):
    returnedValues = []
    stop_words = set(stopwords.words('english'))
    processed_review = []
    numberOfReviews = len(userReviews)
    for i in range(0, numberOfReviews):
        userReviews[i] = re.sub('<.*?>', ' ', userReviews[i])
        userReviews[i] = re.sub('\W', ' ', userReviews[i])
        userReviews[i] = re.sub('\s+[a-zA-Z]\s+', ' ', userReviews[i])
        userReviews[i] = re.sub('\s+', ' ', userReviews[i])
        word_tokens = word_tokenize(userReviews[i])
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
