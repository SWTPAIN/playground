
$(document).ready(function(){
  var nums = [];
  var equation;
  $(".numpad").click(function(){
    var tmp = $(this).text();
    nums.push(tmp);
    console.log(nums);
  });
  $(".operator").click(function(){
    var tmp = $(this).text();
    if (nums.length>1 && ["+","-","/","*"].indexOf(nums[nums.length-1])>-1){
      nums[nums.length-1] = tmp;
    }else {
      nums.push(tmp);
    };
    console.log(nums);
  });

  $("#clear").click(function(){
    nums = [];
    $("#result").empty();
    console.log(nums);    
  });
  $("#del").click(function(){
    nums.pop()  ;
    console.log(nums);
  });

  $(".keys").click(function(){
    equation = nums.join('')
    $("#equation").empty().append(equation);
  })

  $("#equal").click(function(){
    ans = eval(equation)
    $("#result").empty().append(ans);
    nums = [];
  });


});
