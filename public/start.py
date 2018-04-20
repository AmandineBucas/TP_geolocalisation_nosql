import bottle
import json
import bottle_redis
import redis

redis_db = redis.StrictRedis(host='redis-19311.c2.eu-west-1-3.ec2.cloud.redislabs.com', port=19311,
                            password='IFH3xZOGT1IZdfzjmSehzdkfY7Qu3MNM', db=0)

app = bottle.Bottle()

requiredFields = ("id", "username", "password")


@app.route('/')
@bottle.view('html/login.html')
def hello():
    return 'Hello World!'


@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    rep = {}
    user = redis_db.get(user_id)
    if not user:
        rep["msg"] = "Utilisateur introuvable !"
        return bottle.response(json.dumps(rep), status=404, mimetype="application/json")
    return user


@app.route('/users', methods=['POST'])
def save_user():
    data = bottle.request.get_json(force=True)
    rep = {}
    if all(field in data for field in requiredFields):
        redis_db.set(data["id"], json.dumps(data))
        return bottle.response(status=201)
    else:
        missing_key = str([val for val in requiredFields if val not in dict(data).keys()])
        rep["msg"] = "Le champ " + missing_key + " est obligatoire !"
        return bottle.response(json.dumps(rep), status=400)


@app.route('/users/del/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    rep = {}
    resp = redis_db.delete(user_id)
    if resp == 0:
        rep["msg"] = "Utilisateur introuvable !"
        status = 404
    else:
        rep["msg"] = "Votre compte à été supprimé avec succès !"
        status = 200
    return bottle.response(json.dumps(rep), status=status)


@app.route('/geoloc')
@bottle.view('html/index.html')
def geo():
    return None


if __name__ == '__main__':
    bottle.run(app, host='localhost', port=8080)

