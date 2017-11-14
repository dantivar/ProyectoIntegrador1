/*jshint esversion : 6*/

$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });

});

/**
document.getElementById('btn1').addEventListener("click", function () {
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
  });
});

function redirigir(page, packed) {
     window.location.replace(page);
     window.location = page + "?" + packed;
}
**/
