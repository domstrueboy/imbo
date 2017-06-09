import vk

session = vk.Session()
api = vk.API(session)

def send_message(user_id, token, message):
    api.messages.send(access_token=token, user_id=str(user_id), message=message)