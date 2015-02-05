var _RiotControlApi = ['on','one','off','trigger']
var RiotControl = {
  _stores: [],
  addStore: function(store) {
    this._stores.push(store)
  }
}
_RiotControlApi.forEach(function(api){
	RiotControl[api] = function() {
		var args = [].slice.call(arguments)
		this._stores.forEach(function(el){
	      el[api].apply(null, args)
	    })
	}
})
