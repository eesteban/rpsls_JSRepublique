Template.allOptions.events({
    'click .option': function(event){
        let option = $(event.target).closest('.option').attr('id');
        let matchId = Session.get('selectedMatch');
        Session.set('option', option);
        Meteor.call('setOption', matchId, option);
    }
});