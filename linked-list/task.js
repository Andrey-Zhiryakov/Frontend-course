'use strict'

//double linked list
function List(){
  this.listHead = null;
  this.listTail = null;
}

List.prototype = {
  head : function() {
    return this.listHead;
  },

  tail : function() {
    return this.listTail;
  },

  append : function(data) {
    var node = {
      next: null,
      prev: null,
      data: data
    };

    if (this.listHead === null) {
      this.listHead = node;
      this.listTail = node;
      return this;
    }

    var temp = this.listTail;
    this.listTail = node;
    temp.next = node;
    node.prev = temp;
    return this;
  },

  at : function(index) {
    if (typeof index != 'number' || index < 0) {
      return undefined;
    }

    var item = this.listHead;
    for (var i = 0; i < index; i++) {
      if (item.next) {
        item = item.next;
      } else {
        return undefined;
      }

    }
    return item;
  },
  insertAt : function(index, data) {
    var currentItem = this.at(index);
  },
  deleteAt : function(index) {},
  reverse : function() {},
  each : function(func) {},
  indexOf : function(data) {},
  length : function() {
    if (this.listHead) {
      var tmp = this.listHead, count = 0;
      while (tmp.next) {
        count++;
        tmp = tmp.next;
      }
      return count+1;
    }
  }
};



var shit = new List();
shit.append(2);
console.log(shit.tail().data);

shit.append(4);
shit.append(6);
console.log(shit.tail().data);
console.log("Длина листа: "+shit.length());
console.log("--------------------");
console.log(shit.at(0).data);
console.log(shit.at(1).data);
console.log(shit.at(2).data);
console.log(shit.at(-11).data);
