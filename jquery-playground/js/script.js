$(document).ready(function(){
  var tabsContent = [];
  function addButton() {

  }


  function asideAddMsg(type, message) {
    $.simplyToast(message, type, {appendTo: 'aside', offset : {'from':'bottom'}});
  }

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
        $('a.collapse').html('&#8656;');
        isCollapsed = !isCollapsed;
      } else {
        $('aside').animate({'left' : '-455px'}, 300);
        $('a.collapse').html('&#8658;');
        isCollapsed = !isCollapsed;
      }
    };
  }());
});
