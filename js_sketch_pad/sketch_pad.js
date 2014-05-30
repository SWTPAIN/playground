$(document).ready(function(){
  restart();
  $("#button-group").on("click","button",function(){
    var button_id = this.id;
    $('#container').unbind();
    if (button_id == 'blackColor'){
      blackColor();
    }else if (button_id == 'ranColor'){
      randomColors();
    }else if (button_id == 'opacity'){
      opacity();   
    }else if (button_id == 'restart'){
      restart();
    }else if (button_id == 'clean'){
      clean();
    }else if(button_id == 'shinny'){
      shinning();
    }
  })

});

function genDivs(v){
  for(var y=0; y<v; y++){
    $('#container').append("<div class='row'></div>");
  }
  for(var x=0; x<v; x++){
      $('.row').append("<div class='column'></div>");      
  }
}

function restart(){
  num = prompt("How many rows do you would to make the new grid?")
  var side_length = 960/num-2;
  $('.row').remove();
  genDivs(num);
  $('.column').css({"width":side_length,"height":side_length})
  blackColor();
}

function randomColors(){
  $('#container').on("mouseenter", ".column", function(){
    var randomColor = "rgb("+Math.floor(Math.random(10)*256)+','+Math.floor(Math.random(10)*256)+','+Math.floor(Math.random(10)*256)+')';
    $(this).css({"background-color":randomColor});
  });
}

function blackColor(){
  $('#container').on("mouseenter", ".column", function(){
    $(this).css({"background-color":"black","opacity":1});
  });
}

function opacity(){
  $('#container').on("mouseenter", ".column", function(){
    var currentOpacity = + $(this).css('opacity');
    if (currentOpacity<1){
      $(this).css('opacity',currentOpacity+0.1);
    }else{
      $(this).css('opacity',0.1);
    }
  });
}

function clean(){
  $(".column").css('background-color','#666');
  $(".column").css('opacity',0.1);
}


function shinning(){
  
  $('#container').on("mouseenter", ".column", function(){
    var currentOpacity = + $(this).css('opacity');
    $(this).fadeTo(300,0).fadeTo(600,currentOpacity);
  });
}