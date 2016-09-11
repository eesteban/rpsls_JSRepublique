Template.matchStats.helpers({
    results: function(){
        let results = {
            totalGames: 0,
            wins: 0,
            draws: 0,
            loses: 0
        };
        var match = Matches.findOne(Template.instance().data);

        if(match){
            let games = match.games;
            results.totalGames=games.length;

            for(let i=0, l=games.length; i<l; i++){
                var game = games[i];
                var result = game.result;
                if(result){
                    if(result == 'draw'){
                        results.draws++;
                    }else if(result == Meteor.userId()){
                        results.wins++;
                    }else{
                        results.loses++;
                    }
                }
            }
        }

        return results;
    }
});