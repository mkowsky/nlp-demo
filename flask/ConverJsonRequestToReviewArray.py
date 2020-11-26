def convert(jsonRequest):
    values = []
    length = len(jsonRequest['reviews'])

    for i in range(0, length):
        values.append(jsonRequest['reviews'][i]['content'])
        print(jsonRequest['reviews'][i]['content'])
    return values
