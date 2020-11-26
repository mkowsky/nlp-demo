import numpy as np
from sklearn import metrics
from sklearn.metrics import confusion_matrix


def get_metrics(classification_result, expected_result):
    array_clas = np.array(classification_result)
    array_exp = np.array(expected_result)
    array_clas = np.where(array_clas == 'positive', '1', '0').astype('int32')
    array_exp = np.where(array_exp == 'positive', '1', '0').astype('int32')
    accuracy_score = metrics.accuracy_score(array_clas, array_exp)
    tn, fp, fn, tp = confusion_matrix(array_exp, array_clas).ravel()
    return [accuracy_score, tn, fp, fn, tp]