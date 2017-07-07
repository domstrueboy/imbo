from flask import Flask, request, json, redirect, url_for#, Response
from settings import *
import messageHandler

app = Flask(__name__, static_url_path='', static_path='')

@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('static', filename='index.html'))
    #content = app.get_file('index.html')
    #return Response(content, mimetype="text/html")
    #return app.send_static_file('index.html')

@app.route('/', methods=['POST'])
def processing():
    data = json.loads(request.data)
    if 'type' not in data.keys():
        return 'not vk'
    if data['type'] == 'confirmation':
        return confirmation_token
    elif data['type'] == 'message_new':
        messageHandler.create_answer(data['object'], token)
        return 'ok'