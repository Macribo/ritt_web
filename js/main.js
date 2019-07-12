$(document).ready(function() {
  $('.county').tilt({
    scale: 1.1,
    maxTilt: '7',
    perspective: 400,
    speed: 3000
  });
  $('.eyes').tilt({
    scale: 1.1,
    maxTilt: '7',
    perspective: 400,
    speed: 3000
  });

  $('.eyes').fadeIn();
  $('#eire-map').fadeIn();
  $('#eire-mapBG').fadeIn();

  $('.eye').mouseleave(function() {
    $('#eire-map').fadeOut(200);
  });
  //HOVER ON PROVINCES:
  //ULSTER
  $('#eye1').mouseenter(function() {
    console.log('hover1');
    // $('.selectedLv').css('background-image', "url('v1.png')");
    $('#eire-map').css('background-image', 'url("./images/u.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text(`Uladh`);
  });

  //LEINSTER
  $('#eye3').mouseenter(function() {
    console.log('hover3');
    $('#eire-map').css('background-image', 'url("./images/l.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text('Laighean');
  });

  //MUNSTER
  $('#eye5').mouseenter(function() {
    console.log('hover3');
    // $('.selectedLv').css('background-image', "url('v5.png')");
    $('#eire-map').css('background-image', 'url("./images/m.png")');
    $('#eire-map').fadeIn(500);
    $('.levelDescription').text('An Mhumhain');
  });

  //CONNAUGHT
  $('#eye7').mouseenter(function() {
    console.log('hover3');
    $('#eire-map').css('background-image', 'url("./images/c.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text('Connachta');
  });

  $('#eye1').click(function() {
    // alert('u');
    Cookies.set('province', 'ulster');
    console.log(Cookies.get('province'));
    location.href = './countySelector.html';
  });

  $('#eye3').click(function() {
    // alert('l');

    Cookies.set('province', 'leinster');
    location.href = './countySelector.html';
  });

  $('#eye5').click(function() {
    // alert('m');
    Cookies.set('province', 'munster');
    location.href = './countySelector.html';
  });

  $('#eye7').click(function() {
    Cookies.set('province', 'connacht');
    // alert('c');
    location.href = './countySelector.html';
  });
});
