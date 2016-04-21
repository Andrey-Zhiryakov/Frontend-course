(function (){
  //function for check types
  function type(v) {
    if (v === null) { return 'null'; }
    if (typeof v === undefined) { return 'undefined'; }
    return Object.prototype.toString.call(v). slice(8, -1).toLowerCase();
  }

  var JQuery = function(selector) {
    if (!(this instanceof JQuery)){  //if this call is from document, we make a new instance of jQuery object
      return new JQuery(selector);
    } //we make new jquery object
    if (this instanceof JQuery) {  //if this call as constructor
    if (typeof selector === 'string') { //if this selector is simple css selector
      var result = document.querySelectorAll(selector);

      if (result.length > 0) {
        this.selectedNodes = result;
      } else {
        this.selectedNodes = null;
      }
    } else if (typeof selector === 'object') { //if this selector is node from previous function execution
        this.selectedNodes = selector;  //we store this node as selected
      }
    }
  }

  //check on Node.js/browser
  // typeof window !== 'undefined' ?
     window.$ = JQuery;
    //  global.$ = JQuery;

  JQuery.prototype.each = function(func) {
    if (type(func) === 'function') {  //check on function, if this isn't function, we cannot do 'each'
      var nodes = this.selectedNodes;
      if (nodes) {
        for (var i = 0; i < nodes.length; i++) {
          if (func.call(nodes[i], i, nodes[i]) === false) { // we call function with assigning node as 'this'
            break;
          }
        }
      }
    }

    return this;
  };

  JQuery.prototype.addClass = function() {

  };

  JQuery.prototype.append = function(value) {
    switch (typeof value) {
      case 'string':
        this.each(function() {
          var oldText = $(this).html();
          $(this).html(oldText + value);
        });
        break;
      case 'object':
      this.each(function(index, node) {
        node.appendChild(value.cloneNode(true));
      });
        break;
    }
    return this;
  };

  JQuery.prototype.html = function(value) {
    var nodes = this.selectedNodes;
    if (nodes) {
      if (arguments.length === 0) { //if we haven't got arguments, we return html content of the first element in collection
      if (nodes.length) {
        return nodes[0].innerHTML; //this if 'nodes' have more than 1 element
      } else {
        return nodes.innerHTML; // this if 'nodes' is a single element
      }
      }

      switch (type(value)) {
        case 'string': //if we receive the html string
          if (nodes.length && nodes.length > 1) {  //is it node collection and has in more than one element?
            this.each(function() {  //we call 'each' function for change html content of all items
              this.innerHTML = value;
            });
          } else if (nodes.length && nodes.length === 1){  //I think that it work faster than if we did call 'each' function for one element,
                                                           //because it don't make new record of function scope and so on
            nodes[0].innerHTML = value;
          } else {
            nodes.innerHTML = value;  //this if we call 'html' form jquery object with 'this' selector
          }
          break;
        case 'function' :
          if (nodes.length) { //if 'nodes' is elements collection
            for (var i = 0; i < nodes.length; i++) {
              var result = value.call(nodes[i], i, (function(){var oldHTML = nodes[i].innerHTML; return oldHTML;})());

              if (result && type(result) === 'string') { //check on getting result from function
                nodes[i].innerHTML = result;
              }
            }
          } else { // if 'nodes' is single element form jquery object with 'this' selector
            var result = value.call(nodes, -1, (function(){var oldHTML = nodes.innerHTML; return oldHTML;})()); //I made the self-calling function for save old condition of html content of node

            if (result && type(result) === 'string') {
              nodes.innerHTML = result;
            }
          }
          break;
      }
    }

    return this;
  };

  JQuery.prototype.attr = function() {

  };

  JQuery.prototype.children = function() {

  };

  JQuery.prototype.css = function() {

  };

  JQuery.prototype.data = function() {

  };

  JQuery.prototype.on = function() {

  };

  JQuery.prototype.one = function() {

  };
})();
