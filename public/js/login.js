import express from 'express'
import http from 'http'

require('dotenv').config()

const app = express()
const server = http.Server(app)

app.use('/css',express.static(`${__dirname}/public/css`))
app.use('/js',express.static(`${__dirname}/public/js`))
app.use('/images',express.static(`${__dirname}/public/images`))
app.use('/html',express.static(`${__dirname}/public/html`))

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

server.lastPlayderID = 0

// Appel du serveur sur le port 8081.
server.listen(8081, () => {
    console.log('Listening on '+server.address().port)
})

// Connexion à la base de données Redis

var redis = require('redis');
var client = redis.createClient();
client.auth('IFH3xZOGT1IZdfzjmSehzdkfY7Qu3MNM', function (err) {
    if (err) throw err;
});