var tab_area = "<div id='tab_menu'> \
                  <ul> \
                    <li><a href='#tabs-1'>Manu</a></li> \
                    <li><a href='#tabs-2'>Contact</a></li> \
                  </ul> \
                  <div id='tab_container'> \
                    <div class='tab' id='tabs-1'> \
                     <img src='http://www.lovinghut.com/portal/data/file/menu_hk_en/thumb_stores/menu1062731519_f26241e3_happycurry.jpg'/> \
                     <p>Happy curry rice $37</p> \
                     <img src='http://www.lovinghut.com/portal/data/file/menu_hk_en/thumb_stores/menu1062731519_d5946b20_braisedfreshtomatospaghetti.jpg'/> \
                     <p>HBraised fresh tomato and button mushroom spaghett..$37</p> \
                    </div> \
                    <div class='tab' id='tabs-2'> \
                      <p>We welcome your ideas and suggestions regarding our menu and service. Thank you for taking your valuable time and efforts. We will improve and thrive under your loving support. <br/> \
                        Please write to the individual Loving Hut outlets directly if it's related to the particular outlet and you can find most of their contact information on their webpage. <br/> \
                        For all other matters, please feel free to contact us on Loving Hut Customer Service Email: service@lovehut.com,thank you.</p> \
                    </div> \
                  </div> \
                </div>"

$(document).ready(function(){
  //generate basic content
  $('#content').append("<h1>HK Vegan Restaurant</h1>")
  .append("<p>Loving Hut believes that a plant-based diet is healthier, more compassionate, and is the only sustainable diet for the whole planet.\
   We invite you to the world of delicious vegan cuisine. Bon appétit!</p>")
  .append("<img src='http://www.lovinghut.com/portal/data/file/restaurants_hk_en/1886930129_cec27548_kb.jpg'/>");

  //default tab view
  $('#content').append(tab_area)
  $('ul li').first().addClass('selected');
  $('#tabs-1').fadeIn().siblings().hide()

  //event listener for clicking tab
  $('ul li').click(function(){
    var selected_tab = $(this).find('a').attr('href');
    $(this).addClass('selected').siblings('.selected').removeClass('selected');
    $(selected_tab).fadeIn(600).siblings().hide()
  })

});