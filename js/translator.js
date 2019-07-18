//jshint esversion:6
$(document).ready(function() {
  //   alert('hi from translator');
  //   let irishWords = $(this).text;

  //   $('p').hover(
  //     function() {
  //       $(this).css('background-color', 'yellow');
  //     },
  //     function() {
  //       $(this).css('background-color', 'rgb(255, 232, 157)');
  //     }

  //   );
  let anGaeilge;
  $('.modal .story').hover(
    function() {
      anGaeilge = $(this).html();
      //   $(this).css('font-size', 'larger');
      //   $(this).css('color', 'rgb(0, 0, 0)');
      $(this).text($(this).attr('data-eng'));
      setTimeout(function() {
        $(this).css('font-family', 'Arial,Helvetica, sans-serif');
        // alert('seen');
        $('.modal .story').css('color', 'white');
      }, 700);
    },
    function() {
      $(this).css('color', 'white');
      $(this).text(anGaeilge);
      //   $(this).css('font-size', 'larger');

      $(this).css({ 'font-family': 'urchlo,Arial, Helvetica, sans-serif' });
    }
  );
});
