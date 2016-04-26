$(document).ready(function(){
  var tabsContent = new WeakMap(), tabsContentSize = 0;
  var tabs = $('.tab');
  tabsContent.set(tabs[0] , {'content':$('.container').html(), 'date': '', 'img': null})
  .set(tabs[1] , {'content':'some content of tab Two', 'date': '', 'img': null})
  .set(tabs[2] , {'content':'What\'s up?', 'date': '', 'img': null})
  .set(tabs[3] , {'content':'This is uniqe content!', 'date': '', 'img': null});
  tabsContentSize+=4;

  $('#text').val(0);
  $('#title').val($('.tab').first().text());
  $('#html').val($('.container').html());

  window.s = function(){  //just for debug
    return tabsContent;
  }

  function asideAddMsg(type, message) {
    $.simplyToast(message, type, {appendTo: 'aside', offset : {'from':'bottom'}});
  }

  $('#reset-btn').on('click', (e) => {
    $('#text').val('');
    $('#title').val('');
    $('#html').val('');
  });

  //tabs event handler
  $('.tabs').on('click', function(e){
    return function(e){
      $('.tab').each(function(ind, el){
        $(this).removeClass('active');
        if (el === e.target) {
          $(this).addClass('active');
          var content = tabsContent.get(e.target).content;
          $('.container').html(content);
          $('#text').val(ind);
          $('#title').val($(this).text());
          $('#html').val(content);
        }
      });
    };
  }());

  function addItem(item) {
    var isNotFilled = false;

    $('form input').each(function() {
      if ($(this).val() === '') {
        isNotFilled = true;
        return false;
      }
      return true;
    });

    if ($('#html').val() === ''){
      isNotFilled = true;
    }

    if (isNotFilled) {
      asideAddMsg('danger', 'You should fill all text inputs!');
      return false;
    }

    var index = $('#text').val();
    var title = $('#title').val();

    if (index < 0 || index > tabsContentSize-1) {
      item.appendTo('.tabs').text(title);
    } else {
      item.insertBefore($('.tab').get(index)).text(title);
    }
    return true;
  }

  function tabOffset() { return;
    $('.tab').each(function (ind, el) {
      var offset = -20*ind;
      el.style.left = offset.toString(10) + 'px';
      return true;
    });
  }

  //add button event handler
  $('#add-btn').on('click', function() {
    return function(){
      var tabsBarWidth = parseInt($('.tabs').css('width'),10),
      tabWidth = parseInt($('.tab').css('width'),10),
      tabsCount = $('.tab').length;

      if (tabsCount * tabWidth - (16 * (tabsCount-5))  >= tabsBarWidth) {
        asideAddMsg('danger', 'Max length has been reached!');
        return;
      }
      var item = $('.tab:first').clone();
      if (!addItem(item)) {
        return;
      }
      tabOffset();

      var content = $('#html').val();

      item.removeClass('active');
      tabsContentSize++;
      tabsContent.set(item[0], {'content': content, 'date' : '', 'img' : null});

      asideAddMsg('success', 'Tab successfully added!');
    };
  }());

  $('#edit-btn').on('click', (e) => {
    var item = $('.tab.active');
    if (!addItem(item)) {
      return;
    }
    tabsContent.get(item[0]).content = $('#html').val();
    var event = new Event("click", {bubbles : true});
    item[0].dispatchEvent(event);
    tabOffset();
    asideAddMsg('success', 'Tab successfully edited!');
  });

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
