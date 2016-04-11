'use strict'
debugger;
//double linked list
function Node(data, prev, next) {
  this.data = data ? data : null;
  this.prev = prev ? prev : null;
  this.next = next ? next : null;
}

function List(){
  this.listHead = null;
  this.listTail = null;
}

List.prototype = {
  head : function() {
    return this.listHead.data;
  },

  tail : function() {
    return this.listTail.data;
  },

  append : function(data) {
    var node = new Node(data);

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

  at : function(index, isReturnNode) {
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
    return isReturnNode ? item : item.data;
  },
  insertAt : function(index, data) { //complete with given the fact, that element == head or tail
    var currentItem = this.at(index, true);
    if (currentItem) {
      var newItem = new Node(data, currentItem.prev, currentItem);
      currentItem.prev.next = newItem;
      currentItem.prev = newItem;
    }
    return this;
  },
  deleteAt : function(index) {
    var itemToDelete = this.at(index, true);
    if (itemToDelete) {
      itemToDelete.prev.next = itemToDelete.next;
      itemToDelete.next.prev = itemToDelete.prev;
    }
    return this;
  },
  reverse : function() {
    debugger;
    if (this.listHead === null) {
      return;
    }

    var oldHead = this.listHead;
    this.listHead = this.listTail;
    this.listTail = oldHead;

    var currentItem = this.listHead;
    while (currentItem) {
        var oldPrev = currentItem.prev, oldNext = currentItem.next;
        currentItem.next = oldPrev;
        currentItem.prev = oldNext;
        currentItem = oldPrev;
    }
    return this;
  },
  each : function(func) {
    var item = this.listHead, index = 0;
    while (item) {
      func(item.data, index++);
      item = item.next ? item.next : undefined;
    }
    return this;
  },
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
