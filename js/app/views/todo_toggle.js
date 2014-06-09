var TodoToggleView = Backbone.View.extend({
	el: "#main",

	events: {
	},

	todosTemplate: _.template($("#todos_template").html()),

	initialize: function(){
		this.listenTo(this.collection, "reset", this.render);

		this.collection.getSet(this.status);
	},

	render: function(){
		var $section = $("<section>").attr("id", "tasks_main");

		$section.append(this.todosTemplate({
			todos: this.collection.toJSON()
		}));
		this.$el.append($section);

		this.setElement("#tasks_main");
	}
});