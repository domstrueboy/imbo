import vkapi
import random
import json

with open('imbo/base.json', 'r') as f:
#with open('base.json', 'r') as f:
     voc = json.load(f)

def check_answer(body, item):
    data = body['body'].strip().lower()

    if data.endswith('?'):
        sign = '?'
    else:
        sign = ''

    data = data.replace('?', '').replace('!', '').replace('.', '').replace('`', '').replace("'", '').replace(',', '')

    flag = False
    for i in item['en'] :
        if i == data :
            flag = True
            break

    sticker = False
    if flag :
        sticker = random.choice([1,37])
        message = 'Right!'
    else :
        sticker = random.choice([35])
        message = '"' + body['body'] + '" is wrong!\n"' + item['en'][0].capitalize() + sign + '" is the right answer'

    return message, sticker



def get_question(previous_question):
    while True:
        message = random.choice(voc)
        if message != previous_question:
            break

    return message



def create_answer(data, token):
   user_id = data['user_id']

   if data['body'].strip().lower() == 'go':
       create_answer.voc_item = ''
       message = get_question(create_answer.voc_item)
       create_answer.voc_item = message
       vkapi.send_message(user_id, token, message['ru'] + ' (' + ', '.join(message['tips']) + ')')

   else:
       message, sticker = check_answer(data, create_answer.voc_item)
       vkapi.send_message(user_id, token, message)
       #vkapi.send_message(user_id, token, message, sticker)

       message = get_question(create_answer.voc_item)
       create_answer.voc_item = message
       vkapi.send_message(user_id, token, message['ru'] + ' (' + ', '.join(message['tips']) + ')')