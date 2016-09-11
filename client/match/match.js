Template.match.helpers({
    matchExists: function(){
        return !!Matches.findOne(Session.get('selectedMatch'));
    }
});