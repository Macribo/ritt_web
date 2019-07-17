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
    $('.modal-content').fadeOut();
    $('#geaga0').fadeIn();
    dropText('#geaga0');

    setTimeout(function() {
      $('#geaga1').fadeIn();
    }, 4000);

    setTimeout(function() {
      $('#geaga2').fadeIn();
      dropText('#geaga1');
      $('#skull1').fadeIn();
    }, 9000);

    setTimeout(function() {
      $('#geaga3').fadeIn();
      $('#skull2').fadeIn();
    }, 15000);
    setTimeout(function() {
      $('#geaga4').fadeIn();
      $('#skull3').fadeIn();
    }, 20000);
    setTimeout(function() {
      $('#geaga5').fadeIn();
      $('#skull4').fadeIn();
    }, 25000);
    setTimeout(function() {
      $('#skull5').fadeIn();

      $('#geaga6').fadeIn();
      dropText('#geaga2');
      dropText('#geaga3');
      dropText('#geaga4');
      dropText('#geaga5');
    }, 34000);
    centerSkulls = () => {
      $('#skull1').animate({ top: '30%', left: '50%' }, 4500);
      $('#skull2').animate({ top: '54%', left: '57%' }, 4700);
      $('#skull3').animate({ top: '37%', left: '55%' }, 4100);
      $('#skull4').animate({ top: '45%', left: '50%' }, 4000);
      $('#skull5').animate({ top: '34%', left: '40%' }, 4000);
      $('.skulls').css('animation', 'none');
    };
    setTimeout(function() {
      centerSkulls();

      //   $('#geaga-portrait').fadeIn();
      $('modal-content').fadeIn('slow');
      setTimeout(function() {
        $('#btn-menu').css('pointer-events', 'auto');
        $('btn-panel').fadeIn();
        $('#about').fadeIn('slow');
      }, 4000);
    }, 38000);
  });
  dropText = textID => {
    $(textID).animate({ top: '20%', opacity: '0' }, 6000);
  };
  $('.button-c').click(function() {
    $('#btn-menu').css('pointer-events', 'auto');
    $('.modal').fadeOut('slow');
    $('#about').fadeIn('slow');
  });
});
