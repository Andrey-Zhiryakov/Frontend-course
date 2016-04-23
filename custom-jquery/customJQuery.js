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

  window.$ = JQuery; // add jQuery variable to global object 'window'

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

  JQuery.prototype.addClass = function(value) {
    if (!arguments.length) {
      return this;
    }

    var nodes = this.selectedNodes, classesArray;

    var addClassFunc = function(index,node) { //function that iterate classes
      for (var i = 0; i < classesArray.length; i++) {
          node.classList.add(classesArray[i]);
      }
    };

    switch (type(value)) {
      case 'string':    //if we get a string to add to nodes
        classesArray = value.split(' '); //make array for easier operating

        if (nodes.length > 1) { //if selected nodes more than one, we call 'each' function for iterate nodes
          this.each(addClassFunc);
        } else if (nodes.length === 1) {  //if we have one selected node
          addClassFunc(0,nodes[0]);
        }
        break;
      case 'function': //if we get a function to process class names
        if (nodes.length > 1) {
          this.each(function(index, node){
            var result = value.call(node, index, [].join.call(node.classList, ' '));  //we call received function
            if (type(result)=== 'string') {
              classesArray = result.split(' ');
              addClassFunc(index, node);
            }

          });
        } else if (nodes.length === 1) {
          result = value.call(nodes[0], 0, [].join.call(nodes[0].classList, ' '));
          if (type(result)=== 'string') {
            classesArray = result.split(' ');
            addClassFunc(0,nodes[0]);
          }
        }
        break;
    }
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
            var result = value.call(nodes, -1, (function(){var oldHTML = nodes.innerHTML; return oldHTML;})()); //I made the self-calling function for save old condition of the html content of the node

            if (result && type(result) === 'string') {
              nodes.innerHTML = result;
            }
          }
          break;
      }
    }

    return this;
  };

  JQuery.prototype.attr = function(attrName, value) {
    if (arguments.length === 0) {
      return this;
    }
    if (arguments.length === 1) { //return attribute of first matched node
      return this.selectedNodes[0].getAttribute(attrName);
    }

    if (this.selectedNodes.length > 1) {  // if more than one matched node, we call 'each' method
      this.each(function(index, node) {
        node.setAttribute(attrName, value); //set attributes to all matched nodes
      });
    } else if (this.selectedNodes.length === 1) { // if only one matched node
      this.selectedNodes[0].setAttribute(attrName, value);
    } else {
      this.selectedNodes.setAttribute(attrName, value); // this if metod has been called from '$(this)'
    }

    return this;
  };

  JQuery.prototype.children = function(value) {
    if (arguments.length === 0) {
      if (this.selectedNodes) { //check for matched nodes, if no nodes matched, return empty array in order don't get an error
        if (this.selectedNodes.length) {
          return this.selectedNodes[0].children; // we return children of the first matched node
        } else {
          return this.selectedNodes.children; // this if metod has been called from '$(this)'
        }
      }
      return [];
    }

    var children = [];  //array of children nodes accepted by selector
    this.each(function(ind, node) { //we iterate each node of matched ...
      children = children.concat([].slice.call(node.querySelectorAll(value))); //... and match children nodes by 'querySelectorAll'
    });

    return children;
  };

  JQuery.prototype.css = function(value) {
    if (arguments.length === 0) {
      return this;
    }
    if (this.selectedNodes) { //check for matched nodes, if no nodes matched, return 'this' in order don't get an error
      switch (type(value)) {
        case 'string':  //if we gen a string value, then we must return property value
          if (this.selectedNodes.length > 0) {  // if matched nodes, then return property value of first matched element
            return this.selectedNodes[0].style[value];
          } else {
            return this.selectedNodes.style[value]; //if method was called by '$(this)', and 'selectedNode' is a single element
          }
          break;
        case 'object':  //if we get on object, then we must set properties to all matched nodes
          this.each(function (ind, node) {
            for (var item in value) {
              node.style[item] = value[item].toString(); //set value to style property as string value
            }
          });
          break;
      }
    }

    return this;
  };

  JQuery.prototype.data = function(dataName, value) {
    if (this.selectedNodes) { // if we have matched nodes

      var nodes = this.selectedNodes;
      var returnValue = function(val) {
        if (nodes.length > 0) {   //check of single node
          return val ? nodes[0].dataset[val] : Object.assign({}, nodes[0].dataset);  //if we have data attribute name, return value, otherwise return dataset
        } else {
          return val ? nodes.dataset[val] : Object.assign({}, nodes.dataset);   //if we have data attribute name, return value, otherwise return dataset
        }
      }

      if (!dataName) {  // if we don't have name of data attribute, return all dataset
        return returnValue();
      } else {
        switch (type(dataName)) {
          case 'string':  //if we get attribute as string
            if (!value) {
              return returnValue(dataName);  //no value received, so we return current value
            } else {
              this.each(function(ind, node) { // else set value to all matched nodes
                node.dataset[dataName] = value;
              });
            }
            break;
          case 'object':
            this.each(function(ind, node) {  //if we receive an object with data items, we set each item to all matched nodes
              for (item in dataName) {
                node.dataset[item] = dataName[item];
              }
            });
            break;
        }
      }
    }

    return this;
  };

  JQuery.prototype.on = function(event/*, selector, callback*/) {
    if (arguments.length < 2) {
      return this;  //if we get less than 2 arguments, we cannot set event listener
    }

    if (this.selectedNodes) {   // if we have some matched nodes
      var callbackFunc, selector;
      if (arguments.length === 3) { // if we receive selector for dalegate callback
        selector = arguments[1];
        callbackFunc = arguments[2];


      var delegate = function(e) {    //delegate function
        if ([].slice.call(this.querySelectorAll(selector)).indexOf(e.target) > -1) { //if event target matches to selector
          callbackFunc(e);  //we call callback function
        }
      }
    }

      if (this.selectedNodes.length > 0) {    //check of single node, if function was called from '$(this)'
        if (arguments.length ===2) {  //if we didn't receive selector, we set callback function, otherwise we set delegate functiom
          this.selectedNodes[0].addEventListener(event, arguments[1]);
        } else {
          this.selectedNodes[0].addEventListener(event, delegate);
        }
      } else {
        if (arguments.length ===2) {  //if we didn't receive selector, we set callback function, otherwise we set delegate functiom
          this.selectedNodes.addEventListener(event, arguments[1]);
        } else {
          this.selectedNodes.addEventListener(event, delegate);
        }
      }
    }
  };

  JQuery.prototype.one = function(event, callback) {
    if (arguments.length < 2) {
      return this;   //if we get less than 2 arguments, we cannot set event listener
    }
    if (this.selectedNodes) {   // if we have some matched nodes
      var eventNode;

      if (this.selectedNodes.length > 0) {  //check for single node
        eventNode = this.selectedNodes[0];
      } else {
        eventNode = this.selectedNodes;
      }

      // this.on(event,  function(e){  // this is the first variant of one-time call function
      //     eventNode.removeEventListener(e.type, arguments.callee);
      //     return callback.call(that, e);
      //   });

      this.on(event,function(){  // this is the second variant of one-time call function, made with closure
        var callFunc = function(e){
            eventNode.removeEventListener(e.type, callFunc); //at first we remove event listener
            return callback.call(eventNode, e); // ...and call our callback function
          };

          return callFunc;
      }());
    }
  };
})();
