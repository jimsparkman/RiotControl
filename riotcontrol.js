var _ = require('lodash');
var RiotControl = {
  _stores: {},
  setStore: function(key, store) {
    this._stores[key] = store;
  },
  getStore: function(key) {
    return this._stores[key]
  },
  reset: function() {
    this._stores = {};
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    _.values(this._stores).forEach(function(el){
      el[api].apply(el, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;