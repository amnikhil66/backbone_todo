var Workspace = Backbone.Router.extend({
	routes: {
		"": "defaultRoute",
		"finished_tasks": "finshedRoute",
		"incomplete_tasks": "incompleteRoute"
	},

	globals: {
		currentView: null
	},

	defaultRoute: function(){
		this.cleanUp();
		var todos = new Todos();

		this.globals.currentView = new TodoView({
			collection: todos
		});
	},

	finshedRoute: function(){
		this.cleanUp();
		var todos = new Todos();

		this.globals.currentView = new TodoToggleView({
			collection: todos,
			status: true
		});
	},

	incompleteRoute: function(){
		this.cleanUp();
		var todos = new Todos();

		this.globals.currentView = new TodoToggleView({
			collection: todos,
			status: false
		});
	},

	cleanUp: function(){
		if(!!this.globals.currentView){
			this.globals.currentView.remove();
			this.globals.currentView = null;
		}
	}
});