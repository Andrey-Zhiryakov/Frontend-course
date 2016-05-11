'use strict'

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
  insertAt : function(index, data) {
    var currentItem = this.at(index, true);
    if (currentItem) {
      if (index === 0) {
        var newItem = new Node(currentItem.data, currentItem, currentItem.next);
        currentItem.next = newItem;
        currentItem.data = data;
        newItem.next.prev = newItem;
      } else {
        var newItem = new Node(data, currentItem.prev, currentItem);
        currentItem.prev.next = newItem;
        currentItem.prev = newItem;
      }
    } else {
      if ( typeof index === 'number' && index > 0) {
        this.append(data);
      }
    }
    return this;
  },
  deleteAt : function(index) {
    var itemToDelete = this.at(index, true);
    if (itemToDelete) {
      if (  itemToDelete.prev) {
        itemToDelete.prev.next = itemToDelete.next;
      } else {
        this.listHead = itemToDelete.next;
      }
      if (  itemToDelete.next) {
        itemToDelete.next.prev = itemToDelete.prev;
      } else {
        this.listTail = itemToDelete.prev;
      }
    }
    return this;
  },
  reverse : function() {
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
      //pass value and index of current element, current list
      func(item.data, index++, this);
      item = item.next ? item.next : undefined;
    }
    return this;
  },
  indexOf : function(data) {
    if (!data) {
      return -1;
    }

    var item = this.listHead, index = 0;
    while (item.data !== data && item.next) {
      item = item.next;
      index++;
    }
    return item.data === data ? index : -1;
  },
  length : function() {
    if (this.listHead) {
      var tmp = this.listHead, count = 0;
      while (tmp.next) {
        count++;
        tmp = tmp.next;
      }
      return count+1;
    }
  },
  setValue(index, data) {
    var item = this.at(index, true);
    if (item) {
      item.data = data;
    }
    return this;
  }
};
