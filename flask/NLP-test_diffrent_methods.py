import numpy as np
import pandas as pd
import re
import nltk
from sklearn import metrics
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import LinearSVC
import pickle


imdb_data=pd.read_csv('IMDB Dataset.csv')
print(imdb_data.shape)
imdb_data.head(10)
imdb_data.info()
tfidf = TfidfVectorizer(min_df=2, max_df=0.5, ngram_range=(1,2))
text_count_matrix = tfidf.fit_transform(imdb_data.review)


x_train, x_test, y_train, y_test = train_test_split(text_count_matrix, imdb_data.sentiment, test_size=0.20, random_state=2)


y_train = (y_train.replace({'positive': 1, 'negative': 0})).values
y_test = (y_test.replace({'positive': 1, 'negative': 0})).values

MNB = MultinomialNB()
MNB.fit(x_train, y_train)
accuracy_score = metrics.accuracy_score(MNB.predict(x_test), y_test)
print("accuracy_score without data pre-processing = " + str('{:04.2f}'.format(accuracy_score*100))+" %")


nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(stopwords.words('english'))

processed_review = []
single_review = "string to iniialize <br /> my email id is charilie@waoow.com. You can also reach to me at charlie's "
reviews = imdb_data.review
for review in range(0,50000):
    single_review = imdb_data.loc[review,'review']
    
    single_review = re.sub('<.*?>',' ',single_review)
    single_review = re.sub('\W',' ',single_review)
    single_review = re.sub('\s+[a-zA-Z]\s+',' ', single_review)
    single_review = re.sub('\s+',' ', single_review)
    word_tokens = word_tokenize(single_review)
    filtered_sentence = []
    filtered_sentence2 = " ".join([w for w in word_tokens if w not in stop_words])
    processed_review.append(filtered_sentence2)    
print(processed_review[10])
text_count_matrix2 = tfidf.fit_transform(processed_review)
X_train, X_test, Y_train, Y_test = train_test_split(text_count_matrix2, imdb_data.sentiment, test_size=0.20, random_state=2)
Y_train = (Y_train.replace({'positive': 1, 'negative': 0})).values
Y_test = (Y_test.replace({'positive': 1, 'negative': 0})).values

MNB.fit(X_train, Y_train)
accuracy_score = metrics.accuracy_score(MNB.predict(X_test), Y_test)
print(str('{:04.2f}'.format(accuracy_score*100))+" %")
print("Classification Report: \n", classification_report(Y_test, MNB.predict(X_test),target_names=['Negative','Positive']))
print("Confusion Matrix: \n", confusion_matrix(Y_test, MNB.predict(X_test)))
LSVC = LinearSVC()
LSVC.fit(X_train, Y_train)
accuracy_score = metrics.accuracy_score(LSVC.predict(X_test), Y_test)
print("Linear SVC accuracy = " + str('{:04.2f}'.format(accuracy_score*100))+" %")
print("Classification Report: \n", classification_report(Y_test, LSVC.predict(X_test),target_names=['Negative','Positive']))
print("Confusion Matrix: \n", confusion_matrix(Y_test, LSVC.predict(X_test)))
SGDC = SGDClassifier()
SGDC.fit(X_train, Y_train)
predict = SGDC.predict(X_test)
accuracy_score = metrics.accuracy_score(predict, Y_test)
print("Stocastic Gradient Classifier accuracy = " + str('{:04.2f}'.format(accuracy_score*100))+" %")
print("Classification Report: \n", classification_report(Y_test, predict,target_names=['Negative','Positive']))
print("Confusion Matrix: \n", confusion_matrix(Y_test, predict))
LR = LogisticRegression()
LR.fit(X_train, Y_train)
predict = LR.predict(X_test)
accuracy_score = metrics.accuracy_score(predict, Y_test)
print("LR = " + str('{:04.2f}'.format(accuracy_score*100))+" %")
print("Classification Report: \n", classification_report(Y_test, predict,target_names=['Negative','Positive']))
print("Confusion Matrix: \n", confusion_matrix(Y_test, predict))
filename = 'finalized_model.sav'
pickle.dump(LSVC, open(filename, 'wb'))
loaded_model = pickle.load(open(filename, 'rb'))
result = loaded_model.score(X_test, Y_test)
print(result)




