Template.matchStats.helpers({
    results: function(){
        let results = {
            totalGames: 0,
            wins: 0,
            draws: 0,
            loses: 0
        };
        var match = Matches.findOne(Session.get('selectedMatch'));

        if(match){
            let games = match.games;
            results.totalGames=games.length;

            if(match.type=='online'){
                for(let i=0, l=games.length; i<l; i++){
                    let game = games[i];
                    let result = game.result;
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
            }else{
                for(let i=0, l=games.length; i<l; i++){
                    let game = games[i];
                    let result = game.result;
                    if(result){
                        if(result == 'draw'){
                            results.draws++;
                        }else if(result == 'Player 1'){
                            results.wins++;
                        }else{
                            results.loses++;
                        }
                    }
                }
            }
        }

        return results;
    }
});