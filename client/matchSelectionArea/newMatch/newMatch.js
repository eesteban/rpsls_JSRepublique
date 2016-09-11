Template.newMatch.onRendered(function(){
    $('#newMatchForm').validate({
        rules:{
            name: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Name is required'
            }
        },
        submitHandler: function() {
            let name = $('#name').val();
            let type = $("input[name='match_type']:checked").val();
            Meteor.call('createMatch', name, type, function(error){
                if(!error){
                    $('#newMatch').modal('hide');
                }
            });
        }
    })
});

Template.newMatch.events({
    'submit #newMatchForm': function(event){
        event.preventDefault();
    }
});