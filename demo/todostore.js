// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// In this case, a list of todo items.
function TodoStore() {
  riot.observable(this) // Riot provides our event emitter.
  
  var self = this

  self.todos = [ 
    { title: 'Task 1', done: false },
    { title: 'Task 2', done: false }  
  ]

  // Our store's event handlers / API.
  // This is where we would use AJAX calls to interface with the server.
  // Any number of views can emit actions/events without knowing the specifics of the back-end.
  // This store can easily be swapped for another, while the view components remain untouched.

  self.on('todo_add', function(newTodo) {
    self.todos.push(newTodo) 
    self.trigger('todos_changed', self.todos)        
  })

  self.on('todo_remove', function() {
    self.todos.pop()
    self.trigger('todos_changed', self.todos)
  })

  self.on('todo_init', function() {
    self.trigger('todos_changed', self.todos)
  })

  // The store emits change events to any listening views, so that they may react and redraw themselves.

}
