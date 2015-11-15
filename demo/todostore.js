// Required
importScripts('../rc.store.js');

todos = [
	{ title: 'Task 1', done: false },
	{ title: 'Task 2', done: false }
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
