const config = {
     apiKey: "AIzaSyBmSeRTYbYqMLwJGzk-urpuMzEcQqmcT4Q",
     authDomain: "rima-67b88.firebaseapp.com",
     databaseURL: "https://rima-67b88.firebaseio.com",
     };

firebase.initializeApp(config);

function logIn(){
     let usr = document.getElementById('usr').value;
     let pwd = document.getElementById('pwd').value;
     const auth = firebase.auth();
     firebase.auth().signInWithEmailAndPassword(usr, pwd)
     .then(function(user){
          redirigir("pp-app.html",usr);
     }).catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;

         if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
         } else {
            alert(errorMessage);
         }
         console.log(error);
});}

function redirigir(page, packed) {
     window.location.replace(page);
     window.location = page + "?" + packed;
}

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
