//province has been selected

$(document).ready(function() {
  

    /*disable cookie for testing on chrome*/
    let province = Cookies.get('province');
    // let province = 'munster';
    // alert(province);
    $('.emblems').fadeOut();
  console.log('province from cookie: ' + province);
  
  //IN CASE OF ULSTER:
  if (province === 'ulster') {
    $('.emblems').fadeIn();
    
    $('.province-mapBG').css('background-image', "url('./images/maps/u2.png')");
    $('.province-map').css('background-image', "url('./images/maps/u2.png')");
    $('.levelDescription').text('Ulaḋ');
    $('.uladh').fadeIn(1200);

    //ULSTER hover:
    $('#antrim').hover(function() {
      $('.levelDescription').text(`Co. Aontroma`);
      $('.province-map').fadeIn(500);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Antr.png')"
      );
    });

    $('#armagh').hover(function() {
      $('.levelDescription').text(`Co. Ard Ṁaċa`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Arma.png')"
      );
    });
    $('#cavan').hover(function() {
      $('.levelDescription').text(`Co. An Caḃáin`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Cava.png')"
      );
    });
    $('#derry').hover(function() {
      $('.levelDescription').text(`Co. Ḋoire`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Derr.png')"
      );
    });

    $('#donegal').hover(function() {
      $('.levelDescription').text(`Co. Ḋún na nGall`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Done.png')"
      );
    });

    $('#down').hover(function() {
      $('.levelDescription').text(`Co. An Dúin`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Down.png')"
      );
    });

    $('#fermanagh').hover(function() {
      $('.levelDescription').text(`Co. Ḟear Manaċ`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Ferm.png')"
      );
    });

    $('#tyrone').hover(function() {
      $('.levelDescription').text(`Co. Ṫír Eoghain`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Tyro.png')"
      );
    });

    $('#monaghan').hover(function() {
      $('.levelDescription').text(`Co. Ṁuineaċáin`);
      $('.province-map').fadeIn(500);

      $('.province-map').css(
        'background-image',
        "url('./images/maps/u2Mona.png')"
      );
    });
  }
  //IN CASE OF LEINSTER:
  if (province === 'leinster') {
    $('.emblems').fadeIn();

    $('.province-map').css('background-image', "url('./images/maps/l2.png')");
    $('.province-mapBG').css('background-image', "url('./images/maps/l2.png')");
    $('.levelDescription').text('An Laighean');
    // alert('leinster') 
    $('.province-map').fadeIn('slow');
    $('.laighean').fadeIn();
    $('.province-mapBG').css('margin-top','48% !important');


    $('#carlow').hover(function() {
      $('.levelDescription').text(`Co. Ċeaṫarlaċ`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Carl.png')"
      );
    });

    $('#dublin').hover(function() {
      $('.levelDescription').text(`Co. Átha Ċliath`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Dubl.png')"
      );
    });
    $('#kildare').hover(function() {
      $('.levelDescription').text(`Co. Ċill Dara`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Kild.png')"
      );
    });
    $('#kilkenny').hover(function() {
      $('.levelDescription').text(`Co. Ċill Ċainniġ`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Kilk.png')"
      );
    });

    $('#laois').hover(function() {
      $('.levelDescription').text(`Co. Laoise`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Laoi.png')"
      );
    });

    $('#longford').hover(function() {
      $('.levelDescription').text(`Co. An LongFoirt`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Long.png')"
      );
    });

    $('#louth').hover(function() {
      $('.levelDescription').text(`Co.Lú`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Lout.png')"
      );
    });

    $('#meath').hover(function() {
      $('.levelDescription').text(`Co. Na Mí`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Meat.png')"
      );
    });

    $('#offaly').hover(function() {
      $('.levelDescription').text(`Co. Uíḃ Ḟailí`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Offa.png')"
      );
    });

    $('#westmeath').hover(function() {
      $('.levelDescription').text(`Co. Na hIarṁí`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2West.png')"
      );
    });

    $('#wexford').hover(function() {
      $('.levelDescription').text(`Co. Loch Garman`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Wexf.png')"
      );
    });

    $('#wicklow').hover(function() {
      $('.levelDescription').text(`Co. Ċill Ṁantáin`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/l2Wick.png')"
      );
    });
  }
  //IN CASE OF CONNACHT:
  if (province === 'connacht') {
    $('.emblems').fadeIn();

    $('.province-map').css('background-image', "url('./images/maps/c2.png')");
    $('.province-mapBG').css('background-image', "url('./images/maps/c2.png')");
    $('.levelDescription').text('Connaċta');

    $('.province-map').fadeIn('slow');
    $('.connachta').fadeIn();

    $('#galway').hover(function() {
      $('.levelDescription').text(`Co. na Gailliṁe`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/c2Gal.png')"
      );
    });

    $('#leitrim').hover(function() {
      $('.levelDescription').text(`Co. Liatroma`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/c2Leit.png')"
      );
    });

    $('#mayo').hover(function() {
      $('.levelDescription').text(`Co. Mhaigh Eo`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/c2Mayo.png')"
      );
    });

    $('#roscommon').hover(function() {
      $('.levelDescription').text(`Co. Ros Comáin`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/c2Rosc.png')"
      );
    });

    $('#sligo').hover(function() {
      $('.levelDescription').text(`Co. Shligigh`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/c2Slig.png')"
      );
    });
  }

  //IN CASE OF MUNSTER
  if (province === 'munster') {
    $('.emblems').fadeIn();

    $('.province-map').css('background-image', "url('./images/maps/m2.png')");
    $('.province-mapBG').css('background-image', "url('./images/maps/m2.png')");
    $('.levelDescription').text('An Ṁuṁain');

    $('.province-map').fadeIn('slow');
    $('.mumhain').fadeIn();

    $('#clare').hover(function() {
      $('.levelDescription').text(`Co. An Ċláir`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Clar.png')"
      );
    });
    $('#tipperary').hover(function() {
      $('.levelDescription').text(`Co. Ṫiobraid Árann`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Tipp.png')"
      );
    });

    $('#cork').hover(function() {
      $('.levelDescription').text(`Co. Ċorcaí `);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Cork.png')"
      );
    });

    $('#kerry').hover(function() {
      $('.levelDescription').text(`Co. Ċiarraí`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Kerr.png')"
      );
    });

    $('#limerick').hover(function() {
      $('.levelDescription').text(`Co. Luimnigh`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Limr.png')"
      );
    });

    $('#waterford').hover(function() {
      $('.levelDescription').text(`Co. Ṗort Láirge`);
      $('.province-map').css(
        'background-image',
        "url('./images/maps/m2Wate.png')"
      );
    });
  }
  let myEmblem;
  $('.county').on('touchstart',function() {
    //   alert('enter')
    //   console.log(this.id);
    myEmblem = this.id;
    let myEmblemImg = "url('./images/emblems/" + myEmblem + '.png';
    //   $('.county').css('filter', 'grayscale(100%)');
    $('.county').css(
      'background-image',
      "url('./images/emblems/nullEmblem.png')"
    );
    $('#' + myEmblem).css('background-image', myEmblemImg);
  });

  $('.county').mouseleave(function() {
    //   alert('leave');
  });

  $('.county').on(function() {
    // chosenCounty = this.id;
    Cookies.set('playerCounty', myEmblem);
    console.log('hi from cookie script');

    leave();
    //   alert('test');
  });


  $('.county').click('touchend',function() {
    // chosenCounty = this.id;
    Cookies.set('playerCounty', myEmblem);
    console.log('hi from cookie script');

    leave();
    //   alert('test');
  });
if (provice === null){
  location.replace('https://ritt-web-bucket-0.s3-eu-west-1.amazonaws.com/ritt_web/index.html');
  
}
  function leave() {
    setTimeout(function(){

      location.href = './locations.html';
    },1000)
  }
});
