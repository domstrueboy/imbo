import vkapi
import random
from base import voc

def check_answer(body, item):
    data = body['body'].strip().lower()
    while data.endswith('?') or data.endswith('.') or data.endswith('!'):
        data = data[0 : len(data)-1]

    flag = False
    for i in item['en'] :
        if i == data :
            flag = True
            break

    if item['type'] == '+' or item['type'] == '-':
        sign = '.'
    elif item['type'] == '?':
        sign = '?'


    if flag :
        message = 'Right!'
    else :
        message = '"' + body['body'] + '" is wrong!\n"' + item['en'][0].capitalize() + sign + '" is the right answer'

    return message



def get_question():
    message = random.choice(voc)
    return message



def create_answer(data, token):
   user_id = data['user_id']

   if data['body'] == 'go':
       message = get_question()
       create_answer.voc_item = message
       vkapi.send_message(user_id, token, message['ru'] + ' (' + ', '.join(message['tips']) + ')')

   else:
       message = check_answer(data, create_answer.voc_item)
       vkapi.send_message(user_id, token, message)

       message = get_question()
       create_answer.voc_item = message
       vkapi.send_message(user_id, token, message['ru'] + ' (' + ', '.join(message['tips']) + ')')