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
    $('.modal-content').html('');
    $('.modal-content').append(
      `<h1><span id="Geaga's monologue to go here">Cainnt Geaga le dul anseo</h1>`
    );
    setTimeout(function() {
      $('#btn-menu').css('pointer-events', 'auto');

      $('.modal').fadeOut('slow');
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
var story = [
  { m: 'Hi!' },
  { m: 'This is my new game.' },
  {
    question: 'Do you like it?',
    answers: [{ m: 'yes', next: 'like_yes' }, { m: 'no', next: 'like_no' }]
  },
  { label: 'like_yes', m: 'I am happy you like my game!', next: 'like_end' },
  { label: 'like_no', m: 'You made me sad!', next: 'like_end' },
  { label: 'like_end' },
  { m: "OK, let's change the topic" }
];

function execute_game() {
  var current_line = 0;
  while (current_line < story.length) {
    var current_step = story[current_line];
    if (undefined !== current_step.m) {
      display_message(current_step.m);
      if (undefined !== current_step.next) {
        current_line = find_label(current_step.next);
      } else {
        current_line = current_line + 1;
      }
    } else if (undefined !== current_step.question) {
      alert(current_step.question);
      // display the question: current_step.question
      // display the answers: current_step.answers
      // choose an answer
      // and change current_line accordingly
    }
  }
}
execute_game();
