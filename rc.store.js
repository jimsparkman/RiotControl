var RiotControl = {
	_count: 0,
	_events: [],
	trigger: function(strEvent, oMsg) {
		postMessage({e:strEvent,message:oMsg});
	},
	on: function(strEvent, fnCallback) {
		if (this._events[strEvent] == null) {
			this._events[strEvent] = [];
		}
		fnCallback._id = this._count++;
		this._events[strEvent].push(fnCallback);
	}
}

onmessage = function(e) {
	if (e.data.e == null) { return; }
	if (RiotControl._events[e.data.e] == null) { return; }
	RiotControl._events[e.data.e].forEach(
		function(fn) {
			fn(e.data.message);
		});
}
