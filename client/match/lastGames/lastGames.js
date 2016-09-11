Template.lastGames.helpers({
    lastGames: function () {
        var match = Matches.findOne(Template.instance().data);

        if(match){
            let games = match.games;
            let gamesLength = games.length;
            if(gamesLength>0){
                let lastGame = games[gamesLength-1];
                if(!lastGame.result){
                    games.pop();
                }
                return games.splice(-9).reverse();
            }

        }
    }
});