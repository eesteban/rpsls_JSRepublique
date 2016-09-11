Template.match.helpers({
    matchId: function () {
        return Session.get('selectedMatch');
    },
    matchExists: function(){
        let matchExists = !!Matches.findOne(Session.get('selectedMatch'));
        return matchExists;
    }
});