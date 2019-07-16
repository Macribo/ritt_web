var xhr = new XMLHttpRequest({ mozSystem: true });
$(document).ready(function() {
  //   alert('hello chat.js(');

  $('.button-a').click(function() {
    // alert('test a');
    $('.modal-content').html('');
    $('.modal-content').append(`<h1>Cad is ainm dhuit?</h1>`);
    $('.modal-content').append(`<input type="text" id="ainm"></input>`);
  });
  let playerName;
  $(document).on('keypress', function(e) {
    $('#btn-menu').css('pointer-events', 'auto');
    if (e.which == 13) {
      //     alert('You pressed enter!');
      playerName = $('#ainm').val();
      $('.modal-content').html('');
      $('.modal-content').append(`<h1>fáilte ` + playerName + `!</h1>`);

      setTimeout(function() {
        $('.modal').fadeOut('slow');
      }, 1000);
      $('#about').fadeIn('slow');

      //   $('btn-panel').fadeIn();
    }
  });

  $('.button-b').click(function() {
    // $('.modal-content').html('');
    // $('.modal-content').append(`<h1>A</h1>`);
    $('#div1').load('../geaga_test.txt');
    setTimeout(function() {
      $('#btn-menu').css('pointer-events', 'auto');

      //   $('.modal').fadeOut('slow');
    }, 2000);
    // $('btn-panel').fadeIn();
    $('#about').fadeIn('slow');
  });

  $('.button-c').click(function() {
    $('#btn-menu').css('pointer-events', 'auto');
    $('.modal').fadeOut('slow');
    $('#about').fadeIn('slow');
  });
});
