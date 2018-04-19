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


function connectAccount(){
	
//Récupération de l'username et du password
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

// Login = Bamaca ; Password = bamaca44
if ( username == "Bamaca" && password == "bamaca44"){
	alert ("Login successfully");

// Si la connexion est passée, affichage de la page de géolocalisation.
window.location = "index.html";
return false;
}
else{
	
	// Initialisation d'un nombre d'essais à 3.
	var attempt = 3;
	
	// Décrémentation du nombre d'essai
	attempt --;
	alert("Il vous reste "+attempt+" essais.");

if( attempt == 0){
	// Desactivation des champs après trois essais.
	document.getElementById("username").disabled = true;
	document.getElementById("password").disabled = true;
	document.getElementById("connect").disabled = true;
return false;
		}
	}
}