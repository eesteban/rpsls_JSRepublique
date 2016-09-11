Template.playingArea.helpers({
    choiceMade: function () {
        let match = Matches.findOne(Session.get('selectedMatch'), {games: 1});
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