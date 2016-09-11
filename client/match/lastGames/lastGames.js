Template.lastGames.helpers({
    lastGames: function () {
        var match = Matches.findOne(Template.instance().data);

        if(match){
            let games = match.games;
            return games.splice(-9);
        }
    }
});