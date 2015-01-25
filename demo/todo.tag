
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>
  <button disabled={ !items.length } onclick={ remove }>Remove</button>

  var self = this
  self.disabled = true
  self.items = []

  self.on('mount', function() {
    // Trigger init event when component is mounted to page.
    // Any store could respond to this.
    RiotControl.trigger('todo_init')
  })  

  // Register a listener for store change events.
  RiotControl.on('todos_changed', function(items) {
    self.items = items
    self.update()
  }) 

  edit(e) {
    self.text = e.target.value
  }

  add(e) {
    if (self.text) {
      // Trigger event to all stores registered in central dispatch.
      // This allows loosely coupled stores/components to react to same events.
      RiotControl.trigger('todo_add', { title: self.text })
      self.text = self.input.value = ''
    }
  }

  toggle(e) {
    var item = e.item
    item.done = !item.done
    return true
  }

  remove(e) {
      RiotControl.trigger('todo_remove')
  }

</todo>