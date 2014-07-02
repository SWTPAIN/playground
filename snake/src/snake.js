$(document).ready(function(){
  game_init();
})

$(document).keydown(function(e){
  if(e.keyCode == 37){
    snake.direction = 'l';
  }else if(e.keyCode == 38){
    snake.direction = 'u';
  }else if(e.keyCode == 39){
    snake.direction = 'r';
  }else if(e.keyCode == 40){
    snake.direction = 'd';
  }
})

function game_init(){
  var board_size = 40;
  var speed = 200;
  renderBoard(board_size);
  generateSnake(board_size);
  generateFruit(board_size);
  // setTimeout(function(){gameUpdate()}, speed);
  setInterval(function(){move(board_size)}, speed);

}


function renderBoard(size){
  $('body').html('<div id="board"></div>')
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
  snake = {direction:'u', body: [[randX, randY], [randX, randY-1], [randX, randY-2]]};
  $.each(snake.body, function(index,value){
    var position = value[0]+'_'+value[1];
    $('#'+position).addClass('snake');
  });

}


// function gameUpdate(size){
//   move(size);
// }

function move(size){
  console.log(snake.body);
  var tail = snake.body.pop();
  var tail_pos = tail[0]+'_'+tail[1]
  $('#'+tail_pos).removeClass('snake');
  var new_head = [snake.body[0][0],snake.body[0][1]];
  console.log(snake.body);


  switch(snake.direction){
    case 'u': new_head[1] = new_head[1]+1; break;
    case 'd': new_head[1] = new_head[1]-1; break;
    case 'l': new_head[0] = new_head[0]-1; break;
    case 'r': new_head[0] = new_head[0]+1; break;
  }
  console.log(snake.body);

  if (new_head[0]<0 || new_head[0]>=size || new_head[1]<0 || new_head[1]>=size){
    alert('You lost!');
    return game_init();
  }else{
    snake.body.unshift(new_head);
    var new_head_pos = new_head[0]+'_'+new_head[1]
    $('#'+new_head_pos).addClass('snake');
  }

  if (new_head[0]+'_'+new_head[1] == fruit) {
    snake.body.push(tail);
    $('#'+tail_pos).addClass('snake');
    $('#'+fruit).removeClass('fruit');
    generateFruit(size);

  }
  console.log(snake.body);
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
