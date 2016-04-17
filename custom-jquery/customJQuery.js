(function (){
  var selectedNodes = null;

  var JQuery = function(selector) {
    var result = document.querySelectorAll(selector);

    if (result.length > 0) {
      selectedNodes = result;
    } else {
      selectedNodes = null;
    }

    return JQuery;
  }

  //function for check types
  function type(v) {
      if (v === null) { return 'null'; }
      if (typeof v === undefined) { return 'undefined'; }
      return Object.prototype.toString.call(v). slice(8, -1).toLowerCase();
  }

  //check for Node.js/browser
  typeof window !== 'undefined' ?
    (window.customJquery = JQuery, window.$ = JQuery) :
    (global.customJquery = JQuery, global.$ = JQuery);

  JQuery.each = function(func) {
    if (type(func) === 'function') {
      if (selectedNodes) {
        var index = -1;
        for (node in selectedNodes) {
          if (!func(++index, node)) {
            break;
          }
        }
      }
    }

    return JQuery;
  };

  JQuery.addClass = function() {

  };

  JQuery.append = function() {

  };

  JQuery.html = function() {

  };

  JQuery.attr = function() {

  };

  JQuery.children = function() {

  };

  JQuery.css = function() {

  };

  JQuery.data = function() {

  };

  JQuery.on = function() {

  };

  JQuery.one = function() {

  };
})();
