// View
// To display either completed or incompleted tasks
var TodoToggleView = Backbone.View.extend({
	//Parent element to which the template is appended to
	el: "#main",

	//Events hash
	events: {
	},

	//Templates
	todosTemplate: _.template($("#todos_template").html()),

	//View constructor
	initialize: function(options){
		//Additional options
		this.options = options;

		//Model binds to make rendering process async
		this.listenTo(this.collection, "reset", this.render);

		//Do a collection fetch for a specific type of tasks
		this.collection.getSet(this.options);
	},

	//Function used to render the final template after being loaded with the data
	render: function(){
		var $section = $("<section>").attr("id", "tasks_main");

		$section.append(this.todosTemplate({
			todos: this.collection.toJSON()
		}));
		this.$el.append($section);

		this.setElement("#tasks_main");
	}
});