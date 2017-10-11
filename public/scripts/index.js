<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
    <title>RIMA</title>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="bower_components/polymerfire/firebase-app.html">
    <link rel="import" href="reserva.html">
    <style>
      pre {
        display: none;
      }
    </style>
  </head>
  <body>
    <script>
    function reservarA(){
      document.getElementById('btn3').style.display = 'none';
      document.getElementById('btn2').style.display = 'none';
      document.getElementById('x').style.display = 'block';
    }
    function reservarM(){
      document.getElementById('btn3').style.display = 'none';
      document.getElementById('btn2').style.display = 'none';
      document.getElementById('y').style.display = 'block';
    }
    function regresar(){
      document.getElementById('btn3').style.display = 'block';
      document.getElementById('btn2').style.display = 'block';
      document.getElementById('x').style.display = 'none';
      document.getElementById('y').style.display = 'none';
    }
  </script>

  <pre id="x">
    <reserva-app></reserva-app>
  </pre>

  <pre id="y">
    <prestamo></prestamo>
  </pre>

    <div>
    <button type="button" class="btn btn-primary"  onclick="reservarA()" id="btn2">Reservar aula</button>
    <button type="button" class="btn btn-primary" onclick="reservarM()" id="btn3">Prestar material</button>
    </div>

    <button type="button" class="btn btn-primary" onclick="regresar()" id="btn4"> Volver</button>
  </body>
</html>