Template.localPlayingArea.helpers({
    currentPlayer: function(){
        let matchId = Session.get('selectedMatch');
        let match = Matches.findOne(matchId, {games: 1});
        if(match){
            const player1 = 'Player 1';
            const player2 = 'Player 2';
            let games = match.games;
            let gamesLength = games.length;

            if(gamesLength==0){
                return player1;
            }else{
                let lastGame = games[gamesLength-1];
                if(lastGame.result){
                    return player1;
                }else{
                    let optionPlayer1Set = typeof lastGame[player1] != 'undefined';
                    if(optionPlayer1Set){
                        return player2;
                    }else{
                        return player1;
                    }
                }
            }
        }
    }
});
