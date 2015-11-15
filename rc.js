var RiotControl = {
	_count: 0,
	_events: [],
	_stores: [],
	addStore: function(strFile) {
		var worker = new Worker(strFile);
		worker.onmessage = _RiotControlHandler;
		this._stores.push(worker);
	},
	trigger: function(strEvent, oMsg) {
		this._stores.forEach(
			function(el){
				el.postMessage({
					e: strEvent,
					message: oMsg
				});
			});
	},
	on: function(strEvent, fnCallback) {
		if (this._events[strEvent] == null) {
			this._events[strEvent] = [];
		}
		fnCallback._id = this._count++;
		this._events[strEvent].push(fnCallback);
	},
	off: function(strEvent, fnCallback) {
		if (fnCallback._id === null) { return; }
		this._events[strEvent].forEach(
			function(el, i, arr) {
				if (el._id === fnCallback._id) {
					arr.splice(i, 1);
				}
			});
	}
}

_RiotControlHandler = function(e) {
	if (RiotControl._events[e.data.e] != null) {
		RiotControl._events[e.data.e].forEach(
			function(fn) {
				fn(e.data.message);
			});
	}
}
