Template.match.helpers({
    matchId: function () {
        return Session.get('selectedMatch');
    },
    matchExists: function(){
        return !!Matches.findOne(Session.get('selectedMatch'));
    }
});