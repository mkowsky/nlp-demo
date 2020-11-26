import pickle
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re


def rate_single_review(user_review):
    stop_words = set(stopwords.words('english'))
    processed_review = []
    user_review = re.sub('<.*?>', ' ', user_review)
    user_review = re.sub('\W', ' ', user_review)
    user_review = re.sub('\s+[a-zA-Z]\s+', ' ', user_review)
    user_review = re.sub('\s+', ' ', user_review)
    word_tokens = word_tokenize(user_review)
    filtered_review = " ".join([w for w in word_tokens if w not in stop_words])

    processed_review.append(filtered_review)
    print(processed_review[0])

    cv = pickle.load(open('countvectorizer', 'rb'))

    tfidf_transformer = pickle.load(open('tfidf_transformer', 'rb'))

    count_vector = cv.transform(processed_review)
    tf_idf_vector = tfidf_transformer.transform(count_vector)

    document_vector = tf_idf_vector[0]

    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    predict_using_loaded_model = loaded_model.predict(document_vector)

    print(predict_using_loaded_model[0])
    if predict_using_loaded_model[0] == 0:
        return "negative"
    else:
        return "positive"


def rate_multiple_reviews(user_reviews):
    returned_values = []
    stop_words = set(stopwords.words('english'))
    processed_review = []
    number_of_reviews = len(user_reviews)
    for i in range(0, number_of_reviews):
        user_reviews[i] = re.sub('<.*?>', ' ', user_reviews[i])
        user_reviews[i] = re.sub('\W', ' ', user_reviews[i])
        user_reviews[i] = re.sub('\s+[a-zA-Z]\s+', ' ', user_reviews[i])
        user_reviews[i] = re.sub('\s+', ' ', user_reviews[i])
        word_tokens = word_tokenize(user_reviews[i])
        filtered_review = " ".join([w for w in word_tokens if w not in stop_words])
        processed_review.append(filtered_review)

    cv = pickle.load(open('countvectorizer', 'rb'))
    tfidf_transformer = pickle.load(open('tfidf_transformer', 'rb'))
    count_vector = cv.transform(processed_review)
    tf_idf_vector = tfidf_transformer.transform(count_vector)
    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    predict_using_loaded_model = loaded_model.predict(tf_idf_vector)
    for j in range(0, number_of_reviews):
        if predict_using_loaded_model[j] == 0:
            returned_values.append("negative")
        else:
            returned_values.append("positive")
    return returned_values
