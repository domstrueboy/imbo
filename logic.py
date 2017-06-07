# -*- coding: utf-8 -*-
import time
import vk_api
vk = vk_api.VkApi(login = 'login', password = 'password')
#vk_api.VkApi(token = 'a02d...e83fd') #Авторизоваться как сообщество
vk.auth()
values = {'out': 0,'count': 100,'time_offset': 60}

def write_msg(user_id, s):
    vk.method('messages.send', {'user_id':user_id,'message':s})

while True:
    response = vk.method('messages.get', values)
    if response['items']:
        values['last_message_id'] = response['items'][0]['id']
    for item in response['items']:
            write_msg(item[u'user_id'],u'Привет, Хабр!')
    time.sleep(1)
