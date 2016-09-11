Template.matchSelectionArea.onCreated(function () {
    Meteor.subscribe('myMatches');
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
                    players: 1,
                    status: 1
                }
            }
        );

        if(matches){
            return matches;
        }
    },
    notMatchCreated: function() {
        let userId = Meteor.userId();

        let matches = Matches.find(
            {
                players: userId,
                status: 'available'
            },
            {
                fields: {
                    games: 1
                }
            }
        );

        return matches.count()<1;
    }
});

Template.matchSelectionArea.events({
    'click #createMatch': function(){
        Meteor.call('createMatch');
    },
    'click .available-match': function(event){
        let matchId = $(event.target).closest('li').attr('id');
        Meteor.call('acceptMatch', matchId, function(error){
            if(!error){
                Session.set('selectedMatch', matchId);
            }
        });
    },

    'click .my-match': function(event){
        console.log('myMatch');
        let matchId = $(event.target).closest('li').attr('id');
        console.log(matchId);
        let match = Matches.findOne(matchId, {status:1});
        if(match.status === 'open'){
            Session.set('selectedMatch', matchId);
        }
    }
});