$(document).ready(function(){
  game_init();
})

$(document).keydown(function(e){
  if(e.keyCode == 37 && snake.direction != 'r'){
    snake.direction = 'l';
  }else if(e.keyCode == 38 && snake.direction != 'd'){
    snake.direction = 'u';
  }else if(e.keyCode == 39 && snake.direction != 'l'){
    snake.direction = 'r';
  }else if(e.keyCode == 40 && snake.direction != 'u'){
    snake.direction = 'd';
  }else if(e.keyCode == 32 && isPaused == false){
    isPaused = true;
  }else if(e.keyCode == 32 && isPaused == true){
    isPaused = false;
  }
})

function game_init(){
  var board_size = 40;
  var speed = 200;
  console.log(speed);
  isPaused = true;  
  renderController();
  renderBoard(board_size);
  generateSnake(board_size);
  generateFruit(board_size);
  setInterval(function(){
    if (!isPaused) {
    move(board_size);
    } 
  },speed);
  // setInterval(function(){move(board_size)}, speed);

}


function renderController(){
  $('body').html('<div id="controller">'
    +'<h1>Snake Game</h1>'
    +'<p>You may start by pressing space key</p>'
    +'</div>'
  )  
}

function renderBoard(size){
  $('body').append('<div id="board"></div>')
  for(var y=0; y<size; y++){
    $('#board').append("<div class='row'></div>");
  };
  for(var x=0; x<size; x++){
      $('.row').append("<div class='grid'></div>");      
  };
  $.each($('.grid'),function(index){
    var y = size-1-Math.floor(index/size);
    var x = index%40  
    var position = x+'_'+y
    $(this).attr('id',position);
  });
};

function generateFruit(board_size){
  var randX = Math.floor(Math.random()*board_size);
  var randY = Math.floor(Math.random()*board_size);
  fruit = randX+'_'+randY ;
  $('#'+fruit).addClass('fruit');
}

function generateSnake(board_size){
  var randX = Math.floor(Math.random()*board_size);
  var randY = Math.floor(Math.random()*board_size);
  while (randY<2){
    randY = Math.floor(Math.random()*board.length);
  }
  // snake = {direction:'u', body: [[randX, randY], [randX, randY-1], [randX, randY-2]]};
  snake = {direction:'u', body: [randX+'_'+randY, randX+'_'+(randY-1), randX+'_'+(randY-2)]};
  
  $.each(snake.body, function(index,value){
    // var position = value[0]+'_'+value[1];
    
    $('#'+value).addClass('snake');
  });

}

function move(size){
  var tail = snake.body.pop();
  // var tail_pos = tail[0]+'_'+tail[1]
  $('#'+tail).removeClass('snake');

  var new_head = snake.body[0];
  console.log(new_head);

  var new_head_x = parseInt(new_head.split('_')[0])
  var new_head_y = parseInt(new_head.split('_')[1])
  console.log(new_head);

  switch(snake.direction){
    case 'u': new_head_y += 1; break;
    case 'd': new_head_y -= 1; break;
    case 'l': new_head_x -= 1; break;
    case 'r': new_head_x += 1; break;
  }
  new_head = new_head_x+'_'+new_head_y;
  if (new_head_x<0 || new_head_x>=size || new_head_y<0 || new_head_y>=size || snake.body.indexOf(new_head) > -1){
    alert('You lost!');
    return game_init();
  } else{
    snake.body.unshift(new_head);
    $('#'+new_head).addClass('snake');
  }

  if (new_head == fruit) {
    snake.body.push(tail);
    $('#'+tail).addClass('snake');
    $('#'+fruit).removeClass('fruit');
    generateFruit(size);

  }
}






// function game_start(board){
//   setTimeout(function(){
//     $('.grid').removeClass('snack fruit')
//     for (var i=0; i<board.length; i++){
//       for (var j=0; j<board.length; j++){
//         var position = '#' + i + '_' + j;
//         if (board[i][j] == 1){
//           $(position).addClass('fruit');
//         }else if(board[i][j] == 2){
//           $(position).addClass('snake');
//         }
//       }
//     }
//   }, 1000)
// }
