var RiotControl = {
  _stores: [],
  addStore: function(key, store) {
    this._stores.push({"key": key, "store": store});
  },
  getStore: function(key) {
    this._stores.forEach(function(el){
      if (el.key === key) {
        return el.store;
      }
    });
    return null;
  },
  reset: function() {
    this._stores = [];
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    this._stores.forEach(function(el){
      el[api].apply(el.store, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;
