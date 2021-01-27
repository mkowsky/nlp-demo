import pickle
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re


import keras
from keras.preprocessing.sequence import pad_sequences
import numpy as np

import heapq


def rate_multiple_reviews_add_keywords(user_reviews):
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

    tf_idf_matrix = tf_idf_vector.T.todense()
    shape_of_matrix = tf_idf_matrix.shape
    number_of_vectors = shape_of_matrix[1]
    number_of_features = shape_of_matrix[0]
    output_features = []
    feature_names = cv.get_feature_names()

    for i in range(0, number_of_vectors):
        detected_features_in_vector = []
        tf_idf_values_in_vector = []
        for j in range(0, number_of_features):
            if (tf_idf_matrix[j, i] != 0):
                tf_idf_values_in_vector.append(tf_idf_matrix[j, i])
                detected_features_in_vector.append(feature_names[j])
        biggest_indices_in_vector = []
        biggest_values_in_vector = heapq.nlargest(3, tf_idf_values_in_vector, key=None)
        for value in biggest_values_in_vector:
            biggest_indices_in_vector.append(tf_idf_values_in_vector.index(value))
        output_features_vector = []
        for inx in biggest_indices_in_vector:
            output_features_vector.append(detected_features_in_vector[inx])
        output_features.append(output_features_vector)

    return returned_values, output_features

def linear_classification_and_average(user_reviews):
    stop_words = set(stopwords.words('english'))
    processed_reviews = []

    for review in range(0, len(user_reviews)):
        single_review = user_reviews[review]
        single_review = re.sub('<.*?>', ' ', single_review)
        single_review = re.sub('\W', ' ', single_review)
        single_review = re.sub('\s+[a-zA-Z]\s+', ' ', single_review)
        single_review = re.sub('\s+', ' ', single_review)
        word_tokens = word_tokenize(single_review)
        filtered_sentence = " ".join([w for w in word_tokens if w not in stop_words])
        processed_reviews.append(filtered_sentence)

    tokenizer = pickle.load(open("tokenizer_equaldistribution.sav", "rb"))
    x_tokens = tokenizer.texts_to_sequences(processed_reviews)
    max_tokens = 288    #tutaj wiadomo mozliwe ze bedzie trzeba bedzie
    pad = 'pre'
    x_pad = pad_sequences(x_tokens, maxlen=max_tokens, padding=pad, truncating=pad)
    model = keras.models.load_model("Model_Equal_Distribution_10epochs")
    y_pred = model.predict(x=x_pad)
    y_res = []
    for i in range(0, len(y_pred)):
        rate = np.argmax(y_pred[i])
        y_res.append(rate)

    avrg_rate = sum(y_res) / len(y_res)
    #return y_pred, avrg_rate
    return avrg_rate

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


