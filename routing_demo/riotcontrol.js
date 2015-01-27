var RiotControl = {
  _stores: [],
  addStore: function(store) {
    this._stores.push(store)
  },
  trigger: function() {
    var args = [].slice.call(arguments)
    this._stores.forEach(function(el,i,a){
      el.trigger.apply(null, args)
    })
  },
  on: function(ev, callback) {
    this._stores.forEach(function(el,i,a){
      el.on(ev, callback)
    })
  }
}
