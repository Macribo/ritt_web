$(document).ready(function() {
  //   alert('hello chat.js(');

  $('.button-a').click(function() {
    $('.modal-content').html('');
    $('.modal-content').append(`<h1>Cad is ainm dhuit?</h1>`);
    $('.modal-content').append(`<input type="text" id="ainm"></input>`);
  });
  let playerName;
  $(document).on('keypress', function(e) {
    if (e.which == 13) {
      //     alert('You pressed enter!');
      playerName = $('#ainm').val();
      $('.modal-content').html('');
      $('.modal-content').append(`<h1>fáilte ` + playerName + `!</h1>`);
      //   setTimeout()
    }
  });
});
