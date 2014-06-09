var TodoView = Backbone.View.extend({
	el: "#main",

	events: {
		"keypress #task_container > input": "createTask",
		"change #tasks_container input.task-completed": "toggleTask"
	},

	todoInputTemplate: _.template($("#todo_input_template").html()),

	todosTemplate: _.template($("#todos_template").html()),

	taskTemplate: _.template($("#todo_template").html()),

	initialize: function(){
		this.listenTo(this.collection, 'reset', this.render);

		this.collection.fetch({
			reset: true
		});
	},

	render: function(){
		this.$el.append(this.todoInputTemplate());
		this.$el.find("#tasks_main").append(this.todosTemplate({
			todos: this.collection.toJSON()
		}));

		this.setElement("#tasks_main");
	},

	createTask: function(event){
		if(event.keyCode == 13){
			var $target = $(event.target);
			var task = $target.val();
			$target.val("");

			var todo = new Todo({
				id: this.idGenerator(),
				task: task
			});

			this.collection.add(todo);
			todo.save();

			this.$el.find("#tasks_container").append(this.taskTemplate({
				todo: todo.toJSON()
			}));
		}
	},

	toggleTask: function(event){
		var $target = $(event.target);
		var todo = this.collection.get($target.val());

		if($target.prop("checked")){
			todo.set({
				completed: true
			});
		}else{
			todo.set({
				completed: false
			});
		}

		todo.save();
	},

	idGenerator: function(){
		var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    				return v.toString(16);
				});

		return id;
	}
});