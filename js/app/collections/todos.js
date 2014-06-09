var Todos = Backbone.Collection.extend({
	model: Todo,

	localStorage: new Backbone.LocalStorage("Todo"),

	getSet: function(status){
		this.fetch();

		var filtered = this.filter(function(todo){
			return todo.get("completed") === status;
		});

		this.reset(filtered);
	}
});