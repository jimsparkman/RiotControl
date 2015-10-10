var RiotControl = {
  _stores: [],
  addStore: function(key, store) {
    this._stores.push({"key": key, "store": store});
  },
  getStore: function(key) {
    var store = null;
    this._stores.forEach(function(el){
      if (el.key === key) {
        store = el.store;
      }
    });
    return store;
  },
  reset: function() {
    this._stores = [];
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    this._stores.forEach(function(el){
      el.store[api].apply(el.store, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;