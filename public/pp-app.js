/*jshint esversion:6*/
/**
document.addEventListener("DOMContentLoaded", function(event) {
  leer('/aulas/', 'sel1');
  leer('/objetos/', 'sel2');
  cargarUsr();
});

function leer(tipo, id) {
  firebase.database().ref(tipo).once('value').then(function(snapshot){
       for (var i = 0; i < arrk.length; i++) {
                 document.getElementById(id).innerHTML += '<option>' + arrk[i] + '</option>';
       }
  });
}

function reservar() {
  let id = usr;
  let aulaV = document.getElementById('sel1').value;
  let fechaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(0,10);
  let horaV = $('#datetimepicker1').data('DateTimePicker').date()._i.substring(11,19);
  nR+=1;

  let numero = 'reserva' + nR;
  var updates = {};
  updates['/usuarios/' + id + '/reserva/'] = {
    aula : aulaV,
    fecha : fechaV,
    hora : horaV
  };

  firebase.database().ref().update(updates);
}



function prestar() {
  let id = usr;
  let objetoV = document.getElementById('sel2').value;
  let horaV = $('#datetimepicker2').data('DateTimePicker').date()._i;
  console.log(horaV);
  var updates = {};
  updates['/usuarios/' + id + '/prestamo/'] = {
    objeto : objetoV,
    hora : horaV
  };

  updates['/objetos/'] = {
    Guitarra : 0
  };

  firebase.database().ref().update(updates);
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
**/
