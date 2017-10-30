/*jshint esversion: 6*/

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


//var userId = firebase.auth().currentUser.uid;
//return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//});

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
