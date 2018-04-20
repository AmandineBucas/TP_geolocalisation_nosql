//---------------------------------------------------------------------------------------------------\\

// Fonction permettant de géolocaliser quelqu'un

function maPosition(position) {
  var infopos = "Position déterminée :\n";
  infopos += "Latitude : " + position.coords.latitude +"\n";
  infopos += "Longitude: " + position.coords.longitude +"\n";
  document.getElementById("infoposition").innerHTML = infopos;
  
  var map = "<iframe width=\"500\" height=\"500\" frameborder=\"0\" id=\"iframeMap\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"http:\/\/cartosm.eu/map?lon=" + position.coords.longitude + "&lat=" + position.coords.latitude + "&zoom=18&width=500&height=500&mark=true&nav=true&pan=false&zb=bar&style=default&icon=down\"></iframe>";
  document.getElementById("map").innerHTML = map;
}

if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);

//$.post("http://localhost/NoSql/index.html",{lat:position.coords.latitude,lng:position.coords.longitude});

//---------------------------------------------------------------------------------------------------\\

// Fonction permettant de suivre les déplacements

function surveillePosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : " + position.coords.latitude +"\n";
    infopos += "Longitude: " + position.coords.longitude +"\n";
    document.getElementById("infoposition").innerHTML = infopos;
}

// On déclare la variable survId afin de pouvoir par la suite annuler le suivi de la position
var survId = navigator.geolocation.watchPosition(surveillePosition);

// Annule le suivi de la position si nécessaire.
// navigator.geolocation.clearWatch(survId);


//---------------------------------------------------------------------------------------------------\\

// Fonction de callback en cas d’erreur

function erreurPosition(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
    case error.TIMEOUT:
        info += "Timeout !";
    break;
    case error.PERMISSION_DENIED:
    info += "Vous n’avez pas donné la permission";
    break;
    case error.POSITION_UNAVAILABLE:
        info += "La position n’a pu être déterminée";
    break;
    case error.UNKNOWN_ERROR:
        info += "Erreur inconnue";
    break;
  }
  document.getElementById("infoposition").innerHTML = info;
}


//---------------------------------------------------------------------------------------------------\\

// Met à jour la position toute les minutes au maximum (60000 milliseconde)

navigator.geolocation.getCurrentPosition(maPosition, erreurPosition,{maximumAge:60000,enableHighAccuracy:true});


//---------------------------------------------------------------------------------------------------\\

// Connexion à la base de données Redis 
// Nous avons été obligés de la mettre à la fin car la connexion de l'école bloque
// la connexion à la bdd et que la géolocalisation ne s'affiche pas

var redis = require('redis');
var client = redis.createClient();
client.auth('IFH3xZOGT1IZdfzjmSehzdkfY7Qu3MNM', function (err) {
    if (err) throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});