def convert(json_request):
    values = []
    length = len(json_request['reviews'])

    for i in range(0, length):
        values.append(json_request['reviews'][i]['content'])
        print(json_request['reviews'][i]['content'])
    return values
