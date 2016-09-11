FlowRouter.route('/', {
    name: 'Home',
    action: function(){
        BlazeLayout.render("simpleLayout", {content: "main"});
    }
});