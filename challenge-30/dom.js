(function(window){
  'use strict';

function DOM(selectedNodes) {
  this.element = document.querySelectorAll(selectedNodes);
}

DOM.prototype.on = function on(event, callback) {
  Array.prototype.forEach.call(this.element, function (value) {
    value.addEventListener(event, callback, false);
  });
}

DOM.prototype.off = function off(event, callback) {
  Array.prototype.forEach.call(this.element, function (value) {
    value.removeEventListener(event, callback, false);
  });
}
DOM.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this.element, callback);
}

DOM.prototype.map = function (callback) {
  Array.prototype.map.call(this.element, callback);
}

DOM.prototype.filter = function (callback) {
  Array.prototype.filter.call(this.element, callback);
}

DOM.prototype.reduce = function (callback) {
  Array.prototype.reduce.call(this.element, callback);
}

DOM.prototype.reduceRight = function (callback) {
  Array.prototype.reduceRight.call(this.element, callback);
}

DOM.prototype.every = function (callback) {
  Array.prototype.every.call(this.element, callback);
}

DOM.prototype.some = function (callback) {
  Array.prototype.some.call(this.element, callback);
}

DOM.prototype.get = function get(index) {
  if(!index)
    return this.element[0];
  return this.element[index];
}
window.DOM = DOM;
})(window);
