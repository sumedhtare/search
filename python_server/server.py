from flask import Flask, request
import json

app = Flask(__name__)

names = ['sumedh', 'alex', 'mattan', 'jhon']

@app.route('/getnames')
def getnames():
    return json.dumps(names)

@app.route('/name',methods=['GET','POST'])
def getname():
    if request.method == 'GET':
        return request.args.get('name')
    elif request.method == 'POST':
        names.append(request.args.get('name'))
        return json.dumps(names)

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
