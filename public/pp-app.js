/*jshint esversion:6*/
const config = {
     apiKey: "AIzaSyBmSeRTYbYqMLwJGzk-urpuMzEcQqmcT4Q",
     authDomain: "rima-67b88.firebaseapp.com",
     databaseURL: "https://rima-67b88.firebaseio.com",
     };

firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", function(event) {
     firebase.database().ref('/aulas/').once('value').then(function(snapshot){
          snapshot = snapshot.val();
          let arr = snapshot.keys();
          document.getElementById('listaAulas').innerHTML = '<a class="dropdown-item">' + snapshot.val() + '</a>';
          console.log(arr.next().value);
     });
});

function revelar(id){
     ocultar(id);
     let element = document.getElementById(id);
     element.style.display = "block";
}

function ocultar(id){
     for (var i = 1; i < 5; i++) {
          if (i!=id){
               let element = document.getElementById(i);
               element.style.display="none";
          }
     }
}
