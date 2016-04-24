$(document).ready(function(){
  var tabsContent = [{'index': 0, 'title':'One', 'content':'', 'date': '', 'img': null},
                     {'index': 1, 'title':'Two', 'content':'some content of tab Two', 'date': '', 'img': null},
                     {'index': 2, 'title':'Three', 'content':'What\'s up?', 'date': '', 'img': null},
                     {'index': 3, 'title':'Four', 'content':'This is uniqe content!', 'date': '', 'img': null}];

  tabsContent[0].content = $('.container').html();

  window.s = function(){  //just for debug
    return tabsContent;
  }

  function addButton() {

  }


  function asideAddMsg(type, message) {
    $.simplyToast(message, type, {appendTo: 'aside', offset : {'from':'bottom'}});
  }

  $('.tabs').on('click', function(e){
    return function(e){
      $('.tab').each(function(ind, el){
        $(this).removeClass('active');
        if (el === e.target) {
          $('.container').html(tabsContent[ind].content);
          $(this).addClass('active');
        }
      });
    };
  }());

  //add button event handler
  $('#add-btn').on('click', function() {
    return function(){
      var isNotFilled = false;

      $('form input').each(function() {
        if ($(this).val() === '') {
          isNotFilled = true;
          return false;
        }
        return true;
      });

      if (isNotFilled) {
        asideAddMsg('danger', 'You should fill all text inputs!');
        return;
      }

      asideAddMsg('success', 'Everything is OK!');
    };
  }());

  // aside event handler
  $('a.collapse').on('click',function(){
    var isCollapsed = false;
    return function() {
      if (isCollapsed) {
        $('aside').animate({'left' : '0'}, 300);
        $('main').animate({'margin-left': '500px'}, 300);
        $('a.collapse').html('&#8656;');
        isCollapsed = !isCollapsed;
      } else {
        $('aside').animate({'left' : '-455px'}, 300);
        $('main').animate({'margin-left': '45px'}, 300);
        $('a.collapse').html('&#8658;');
        isCollapsed = !isCollapsed;
      }
    };
  }());
});
