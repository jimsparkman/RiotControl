
<item-app>
	
	<h3>Gadget Browser <a href="https://github.com/jimsparkman/RiotControl">(GitHub)</a></h3>
	<div>Notice the URL routing, back button works as expected.</div>
	<br/>
	<div if={ !edit }>
		<span>Search:</span>
		<br/>
		<input name='input' onkeyup={ search }>
		<form onsubmit={ clear }>
			<button disabled={ !txt }>Clear</button>
		</form>
		<ul>
			<li each={ items }>
				<a href={ '#view/' + id }>{ title }</a>
			</li>
		</ul>

		<item-detail item={ detail }></item-detail>
		<div if={ !detail }>
			<span>Choose a product.</span>
		</div>
		<br/>
		<div>
			<button onclick={ add }>Add</button>
		</div>
	</div>
	<div if={ edit }>
		<form onsubmit={ submit }>
			<input name='title'>
			<button>Submit</button>
		</form>
		<button onclick={ cancel }>Cancel</button>
	</div>

	// This is essentially the equivalent of the Flux view-controller.
	// Could be broken down further into more sub-componenets, if you wished to re-use views.

	var self = this

	self.items = []
	self.txt = null
	self.detail = null
	self.edit = false	

	search(e) {
		self.txt = e.target.value
		RiotControl.trigger('item_list_search', self.txt)
	}

	clear(e) {
		self.txt = ''
		this.input.value = ''
		RiotControl.trigger('item_list_search','')	
	}

	add(e) {
		riot.route('add')
	}

	submit(e) {
		RiotControl.trigger('item_detail_add', this.title.value)
		this.title.value = ''
		this.edit = false
		riot.route('view')
	}

	cancel(e) {
		this.title.value = ''
		this.edit = false
		riot.route('view')
	}

	self.on('mount', function() {
		RiotControl.trigger('item_list_init')
	})

	RiotControl.on('item_list_changed', function(items) {
		self.items = items
		self.update()
	})

	RiotControl.on('item_detail_changed', function(item) {
		self.edit = false
	    self.detail = item
	    riot.update()
	})

	RiotControl.on('item_detail_create', function() {
		self.edit = true
		self.update()
	})

</item-app>