$(document).ready(function(){
  var tabsContent = new WeakMap(), tabsContentSize = 0;
  var tabs = $('.tab');
  tabsContent.set(tabs[0] , {'content':$('.container').html(), 'date': '', 'img': null})
  .set(tabs[1] , {'content':'some content of tab Two', 'date': '', 'img': null})
  .set(tabs[2] , {'content':'What\'s up?', 'date': '', 'img': null})
  .set(tabs[3] , {'content':'This is uniqe content!', 'date': '', 'img': null});
  tabsContentSize+=4;

  window.s = function(){  //just for debug
    return tabsContent;
  }

  function addButton() {

  }


  function asideAddMsg(type, message) {
    $.simplyToast(message, type, {appendTo: 'aside', offset : {'from':'bottom'}});
  }

  //tabs event handler
  $('.tabs').on('click', function(e){
    return function(e){
      $('.tab').each(function(ind, el){
        $(this).removeClass('active');
        if (el === e.target) {
          $(this).addClass('active');
          $('.container').html(tabsContent.get(e.target).content);
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

      var index = $('#text').val();
      var title = $('#title').val();
      var content = $('#html').val();
      var item = $('.tab:first').clone();

      if (index > tabsContentSize-1) {
        item.appendTo('.tabs').text(title).removeClass('active');
      } else {
        item.insertBefore($('.tab').get(index)).text(title).removeClass('active');
      }
      tabsContentSize++;
      tabsContent.set(item[0], {'content': content, 'date' : '', 'img' : null});


      asideAddMsg('success', 'Tab successfully added!');
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
