Template.matchSelectionArea.onCreated(function () {
    Meteor.subscribe('myMatchesOnline');
    Meteor.subscribe('myMatchesLocal');
    Meteor.subscribe('availableMatches');
});

Template.matchSelectionArea.helpers({
    myMatches: function(){
        let userId = Meteor.userId();

        let matches = Matches.find(
            {
                players: userId
            },
            {
                fields: {
                    name:1,
                    type:1,
                    players: 1,
                    games: 1,
                    status: 1
                }
            }
        );

        if(matches){
            return matches;
        }
    },
    availableMatches: function(){
        let userId = Meteor.userId();

        let matches = Matches.find(
            {
                players: {$ne: userId},
                status: 'available'
            },
            {
                fields: {
                    name:1,
                    type:1,
                    players: 1,
                    status: 1
                }
            }
        );

        if(matches){
            return matches;
        }
    }
});

Template.matchSelectionArea.events({
    'click .available-match': function(event){
        let matchId = $(event.target).closest('li').attr('id');
        Meteor.call('acceptMatch', matchId, function(error){
            if(!error){
                Session.set('selectedMatch', matchId);
            }
        });
    },

    'click .my-match': function(event){
        let matchId = $(event.target).closest('li').attr('id');
        let match = Matches.findOne(matchId, {status:1});
        if(match.status === 'open'){
            Session.set('selectedMatch', matchId);
        }
    }
});