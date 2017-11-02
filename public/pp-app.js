/*jshint esversion:6*/
const config = {
     apiKey: "AIzaSyBmSeRTYbYqMLwJGzk-urpuMzEcQqmcT4Q",
     authDomain: "rima-67b88.firebaseapp.com",
     databaseURL: "https://rima-67b88.firebaseio.com",
     };

firebase.initializeApp(config);

let usr = '';
let nR = 0;
document.addEventListener("DOMContentLoaded", function(event) {
  leer('/aulas/', 'sel1');
  leer('/objetos/', 'sel2');
  cargarUsr();
});

function leer(tipo, id) {
  firebase.database().ref(tipo).once('value').then(function(snapshot){
       snapshot = snapshot.val();
       let arrk = Object.keys(snapshot);
       for (var i = 0; i < arrk.length; i++) {
                 document.getElementById(id).innerHTML += '<option>' + arrk[i] + '</option>';
       }
  });
}

function intermediario(id, tipo) {
  id = usr;
  firebase.database().ref('/usuarios/'+ id + '/'+ tipo +'/numeroDe' +tipo+ '/').once('value').then(function(snapshot){
      if(tipo==='reserva'){
        reservar(id,snapshot.val())
      } else if (tipo==='prestamo') {

      }
  });
}

function reservar(usr,nR) {
  let aulaV = document.getElementById('sel1').value;
  let fechaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(0,10);
  let horaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(11,19);
  nR+=1;

  var updates = {};

  firebase.database().ref('/usuarios/' + usr + '/reserva/reserva' + nR).set({
    aula : aulaV,
    fecha : fechaV,
    hora : horaV
  });
}



function prestar() {
  let aulaV = document.getElementById('sel1').value;
  let fechaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(0,10);
  let horaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(11,19);
  nR+=1;
  firebase.database().ref('/usuarios/' + usr + '/reserva/reserva' + nR).set({
    aula : aulaV,
    fecha : fechaV,
    hora : horaV
  });
}

function cargarUsr() {
  let enlace = window.location.href;
  var i = 0;
  while(enlace[i] != '?'){
    i++;
  }
  i++;
  while (enlace[i] != '@') {
    usr+=enlace[i];
    i++;
  }
}
