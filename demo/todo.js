
riot.tag('todo', '<h3>{ opts.title }</h3> <ul> <li each="{ items }"> <label class="{ completed: done }"> <input type="checkbox" __checked="{ done }" onclick="{ parent.toggle }"> { title } </label> </li> </ul> <form onsubmit="{ add }"> <input name="input" onkeyup="{ edit }"> <button __disabled="{ !text }">Add #{ items.length + 1 }</button> </form> <button __disabled="{ !items.length }" onclick="{ remove }">Remove</button>', function(opts) {
  var self = this
  self.disabled = true
  self.items = []

  self.on('mount', function() {
    RiotControl.trigger('todo_init')
  })  

  RiotControl.on('todos_changed', function(items) {
    self.items = items
    self.update()
  }) 

  this.edit = function(e) {
    self.text = e.target.value
  }.bind(this)

  this.add = function(e) {
    if (self.text) {
      RiotControl.trigger('todo_add', { title: self.text })
      self.text = self.input.value = ''
    }
  }.bind(this)

  this.toggle = function(e) {
    var item = e.item
    item.done = !item.done
    return true
  }.bind(this)

  this.remove = function(e) {
      RiotControl.trigger('todo_remove')
  }.bind(this)

})