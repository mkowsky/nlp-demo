
def convert(jsonRequest):

    values=[]
    length = len(jsonRequest['recenzje'])

    for i in range(0,length):
        values.append(jsonRequest['recenzje'][i]['content'])
        print(jsonRequest['recenzje'][i]['content'])



    return values