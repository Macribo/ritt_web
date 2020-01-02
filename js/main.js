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



  // function holdKeyDown() {
  //   // alert(keyPressed);
    
  //   // alert(keysToShow)
  //   for (let i = 0; i<keysToShow.length; i++){
  
  //     let newButton = `<button id=`+keysToShow[i]+` onclick = "				$('#output').append(this.id);
  //     " type="button" class="btn btn-right-logo btn-outline-dark">`+keysToShow[i]+`</button>`
      
  //     $('#j-line').append(newButton)	
  //   }
  
  //   $('#j-line').fadeIn();
  //   let newLeft = $('#'+keyPressed).offset().left;
  //   let newTop = $('#'+keyPressed).offset().top -50;
  //   $('#j-line').css({"left": newLeft});
  //   $('#j-line').css({"top": newTop});
  //   setTimeout(function(){
  //     $('#j-line').fadeOut();
  //     // alert("removed");
  // },2000
  // )
  // }

  $('.eye').on('touchend',function() {
    Cookies.set('province', this.id);
    console.log('hi from cookie script');
  
    setTimeout(() => {
  
  $('#eire-map').fadeOut(200);
}, 1000);
  });
















  //HOVER ON PROVINCES:
  //ULSTER
  $('#eye1').on('touchstart',function() {
    console.log('hover1');
    // $('.selectedLv').css('background-image', "url('v1.png')");
    $('#eire-map').css('background-image', 'url("./images/u.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text(`Uladh`);
  });























  //LEINSTER
  $('#eye3').on('touchstart',function() {
    
    $('#eire-map').fadeOut(500);
    console.log('hover3');
    $('#eire-map').css('background-image', 'url("./images/l.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text('Laighean');
  });

  //MUNSTER
  $('#eye5').on('touchstart',function() {
    console.log('hover3');
    // $('.selectedLv').css('background-image', "url('v5.png')");
    $('#eire-map').css('background-image', 'url("./images/m.png")');
    $('#eire-map').fadeIn(500);
    $('.levelDescription').text('An Mhumhain');
  });

  //CONNAUGHT
  $('#eye7').on('touchstart',function() {
    console.log('hover3');
    $('#eire-map').css('background-image', 'url("./images/c.png")');
    $('#eire-map').fadeIn(500);

    $('.levelDescription').text('Connachta');
  });

  $('#eye1').on('touchend',function() {
    // alert('u');
    Cookies.set('province', 'ulster');
    console.log(Cookies.get('province'));
    setTimeout(() => {
      
      location.href = './countySelector.html';
    }, 1000);
  });

  $('#eye3').on('touchend',function() {
    // alert('l');

    Cookies.set('province', 'leinster');
    setTimeout(() => {
      
      location.href = './countySelector.html';
    }, 1000);
  });

  $('#eye5').on('touchend',function() {
    // alert('m');
    Cookies.set('province', 'munster');
    setTimeout(() => {
      
      location.href = './countySelector.html';
    }, 1000);
  });

  $('#eye7').on('touchend',function() {
    Cookies.set('province', 'connacht');
    // alert('c');
    setTimeout(() => {
      
      location.href = './countySelector.html';
    }, 1000);
  });
});
