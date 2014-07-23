spa.shell = (function(){
  var configMap = {
    main_html: String()
    + '<div class="spa-shell-head">'
      + '<div class="spa-shell-head-logo"></div>'
      + '<div class="spa-shell-head-acct"></div>'
      + '<div class="spa-shell-head-search"></div>'
    + '</div>'
      + '<div class="spa-shell-main">'
      + '<div class="spa-shell-main-nav"></div>'
      + '<div class="spa-shell-main-content"></div>'
    + '</div>'
    + '<div class="spa-shell-foot"></div>'
    + '<div class="spa-shell-chat"></div>'
    + '<div class="spa-shell-modal"></div>',
    chat_extend_time: 1000,
    chat_retract_time: 500,
    chat_extend_height: 450,
    chat_retract_height: 15,
    chat_extended_title: 'Click to retract',
    chat_retracted_title: 'Click to extend'
    },
    stateMap = { 
      $container: null,
      is_chat_retracted: true
    },
    jqueryMap = {},

    setJqueryMap, toggleChat, onClickChat, initModule
  ;
  setJqueryMap = function(){
    var $container = stateMap.$container;
    jqueryMap = { 
      $container: $container,
      $chat: $container.find('.spa-shell-chat')
    };
  };

  //Begin DOM method /toggleChat/
  //Purpose: Extends or retracts chat slider
// Arguments :
//  * do_extend - if true, extends slider; if false retracts
//  * callback - optional function to execute at end of animation
// Settings :
//  * chat_extend_time, chat_retract_time
//  * chat_extend_height, chat_retract_height
// Returns: boolean
//* true - slider animation activated
//* false - slider animation not activated
// State : sets stateMap.is_chat_retracted
//  * true - slider is retracted
//  * false - slider is extended
  toggleChat = function(do_extend, callback){
    var
      px_chat_ht = jqueryMap.$chat.height(),
      is_open = px_chat_ht === configMap.chat_extend_height,
      is_closed = px_chat_ht === configMap.chat_retract_height,
      is_sliding = ! is_open && ! is_closed;
      console.log(px_chat_ht);
      console.log(configMap.chat_extend_height);
      console.log(configMap.chat_retract_height);
      // avoid race condition
    if (is_sliding) { return false;}

    if (do_extend) {
      console.log(configMap.chat_extend_height);
      console.log(configMap.chat_extend_time);
      jqueryMap.$chat.animate(
        {height: configMap.chat_extend_height},
        configMap.chat_extend_time,
        function(){
          jqueryMap.$chat.attr(
            'title', configMap.chat_extended_title
          );
          stateMap.is_chat_retracted = false;
          if (callback) { callback( jqueryMap.$chat);}
        }
      );
      return true;
    }
      //Begin retract chat slider
    jqueryMap.$chat.animate(
      { height: configMap.chat_retract_height },
      configMap.chat_retract_time,
      function(){
        jqueryMap.$chat.attr(
          'title', configMap.chat_retracted_title
        );
        stateMap.is_chat_retracted = true;
        if (callback) { callback( jqueryMap.$chat); }
      }
    );
    return true;
  };

  //END DOM METHODS
  //BEGIN EVENT HANDLER
  
  onClickChat = function(event){
    toggleChat(stateMap.is_chat_retracted);
    return false;
  }

  //END EVENT HANDLERS

  //BEGIN Public method

  initModule = function($container){
    //load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html);
    setJqueryMap();

    //initialize chat_slider and bind click handler
    stateMap.is_chat_retracted = true;
    jqueryMap.$chat
      .attr('title', configMap.chat_retracted_title)
      .click(onClickChat);
  };
  return { initModule : initModule };
}());