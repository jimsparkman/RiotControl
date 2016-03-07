// Required
importScripts('../../rc.store.js');

todos = [
	{ title: 'Task 1', done: false },
	{ title: 'Task 2', done: true }
];

// Listen to view sending a new todo
RiotControl.on('todo_add', function(newTodo) {
	todos.push(newTodo);
	RiotControl.trigger('todos_changed', todos);
});

// Listen to view requesting remove last todo
RiotControl.on('todo_remove', function() {
	todos.pop();
	RiotControl.trigger('todos_changed', todos);
});

// Listen to view requesting initial todo list
RiotControl.on('todo_init', function() {
	RiotControl.trigger('todos_changed', todos);
});

RiotControl.on('todo_toggle', function(index) {
	todos[index].done = !todos[index].done
	RiotControl.trigger('todos_changed', todos);
});

