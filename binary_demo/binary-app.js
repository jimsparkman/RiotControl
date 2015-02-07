riot.tag('binary-app', '<h3>Binary Calculator</h3> <span>Enter hex:</span> <br></br> <span>0x</span> <input name="input" onkeyup="{ hexChanged }"> <span each="{ bitlist }"> { value } </span> <br></br> <div class="bit" each="{ bitlist }" onclick="{ parent.toggle }"> <span>{ pos }</span> <input type="checkbox" __checked="{ value }"> </div> <br></br>', function(opts) {

	var self = this
	self.bitlist = []

	this.hexChanged = function(e) {
		e.target.value = e.target.value.toUpperCase()
		RiotControl.trigger('hex_changed', e.target.value)
	}.bind(this);

	this.toggle = function(e) {
		RiotControl.trigger('bit_changed', e.item.pos)
	}.bind(this);

	RiotControl.on('binary_changed', function(bitlist) {		
		self.bitlist = bitlist
		riot.update()
	})

	RiotControl.on('hex_forced_change', function(hexVal) {		
		self.input.value = hexVal.toUpperCase()
		RiotControl.trigger('hex_changed', self.input.value)
	})


});