Template.playingArea.helpers({
    options : function() {
        return ['rock', 'paper', 'scissor', 'lizard', 'spock'];
    },
    choiceMade: function () {
        let match = Matches.findOne(Template.instance().data, {games: 1});
        if(match){
            let games = match.games;
            let gamesLength = games.length;
            if(gamesLength==0){
                Session.set('option', null);
                return false;
            }else{
                let lastGame = games[gamesLength-1];
                let optionSet = typeof lastGame[Meteor.userId()] != 'undefined';
                let choiceMade = optionSet && !lastGame.result;
                if(!choiceMade){
                    Session.set('option', null);
                }
                return choiceMade;
            }
        }
    }
});

Template.playingArea.events({
    'click .option': function(event){
        let option = $(event.target).closest('.option').attr('id');
        let matchId = Template.instance().data;
        Session.set('option', option);
        Meteor.call('setOption', matchId, option);
    }
});