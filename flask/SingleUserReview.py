import pickle
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re


def rateSingleReview(userReview):
    stop_words = set(stopwords.words('english'))
    processed_review = []
    userReview = re.sub('<.*?>', ' ', userReview)
    userReview = re.sub('\W', ' ', userReview)
    userReview = re.sub('\s+[a-zA-Z]\s+', ' ', userReview)
    userReview = re.sub('\s+', ' ', userReview)
    word_tokens = word_tokenize(userReview)
    filtered_review = " ".join([w for w in word_tokens if w not in stop_words])

    processed_review.append(filtered_review)
    print(processed_review[0])

    cv = pickle.load(open('countvectorizer', 'rb'))

    tfidf_transformer = pickle.load(open('tfidf_transformer', 'rb'))

    count_vector = cv.transform(processed_review)
    tf_idf_vector = tfidf_transformer.transform(count_vector)
    feature_names = cv.get_feature_names()

    document_vector = tf_idf_vector[0]

    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    predict_using_loaded_model = loaded_model.predict(document_vector)

    print(predict_using_loaded_model[0])
    if (predict_using_loaded_model[0] == 0):
        return "negative"
    else:
        return "positive"
