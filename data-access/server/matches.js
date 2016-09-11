Meteor.publish('myMatches', function(){
    let userId = this.userId;
    if(userId){
        var filter = {
            players:1,
            status:1
        };
        filter['games.'+userId] = 1;
        filter['games.result'] = 1;

        var matches = Matches.find(
            {
                players: userId
            },
            {
                fields: filter
            }
        );

        if(matches){
            return matches;
        }
    }

    return this.ready();
});

Meteor.publish('availableMatches', function(){
    let userId = this.userId;
    if(userId){
        var matches = Matches.find(
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
    }

    return this.ready();
});

Meteor.methods({
    createMatch: function () {
        let userId = Meteor.userId();

        var match ={
            players: [userId],
            status: 'available'
        };

        var matchId = Matches.insert(match);
        if (!matchId) throw new Meteor.Error('create-match', 'Match not created');

        return matchId;
    },
    acceptMatch: function (matchId) {
        check(matchId, String);
        let userId = Meteor.userId();

        let match = Matches.findOne({
            _id: matchId,
            status: 'available'
        });
        
        if(match && match.players.length<2){
            Matches.update(matchId, {$push: {players: userId}, $set: {status: 'open', games: []}});
        }else{
            throw new Meteor.Error('accept-match', "That match can't be accepted");
        }
    },
    setOption: function(matchId, option){
        check(matchId, String);
        check(option, Match.OneOf('rock', 'paper', 'scissor', 'lizard', 'spock'));

        let userId = Meteor.userId();

        let match = Matches.findOne({
            _id: matchId,
            players: userId,
            status: 'open'
        });

        if(match){
            let games = match.games;
            var lastGameIndex = games.length-1;
            let lastGame = games[lastGameIndex];

            let update={};

            if(lastGame && !lastGame.result){
                //If there IS an open game: update the game
                lastGame[userId]= option;

                //If both players have specified their option
                if(Object.keys(lastGame).length==2){
                    lastGame.result = calculateResult(lastGame, match.players[0], match.players[1]);
                }

                let key = 'games.'+lastGameIndex;
                update[key] = lastGame;
            }else{
                //If there ISN'T game open; create new game
                let newGame = {};
                newGame[userId]= option;
                
                let key = 'games.'+(lastGameIndex+1);
                update[key] = newGame;
            }
            Matches.update(matchId, {$set: update});

        }else{
            throw new Meteor.Error('accept-match', "That match can't be accepted");
        }
    }
});

function calculateResult (game, player1Id, player2Id){
    let player1Choice = game[player1Id];
    let player2Choice = game[player2Id];

    console.log('Player 1('+player1Id+'): '+player1Choice+ ' VS Player2('+player2Id+'): '+ player2Choice);



    let result = '';
    if(player1Choice===player2Choice){
        result = 'draw';
    } else {
        const rock = 'rock';
        const paper = 'paper';
        const scissor = 'scissor';
        const lizard = 'lizard';
        const spock = 'spock';

        if(player1Choice==rock){
            if(player2Choice == scissor|| player2Choice == lizard){
                result = player1Id;
            }else{
                result = player2Id;
            }
        }else if(player1Choice==paper){
            if(player2Choice == spock || player2Choice == rock){
                result = player1Id;
            }else{
                result = player2Id;
            }
        }else if(player1Choice==scissor){
            if(player2Choice == paper || player2Choice == lizard){
                result = player1Id;
            }else{
                result = player2Id;
            }
        }else if(player1Choice==lizard){
            if(player2Choice == paper|| player2Choice == spock){
                result = player1Id;
            }else{
                result = player2Id;
            }
        }else if(player1Choice==spock){
            if(player2Choice == rock || player2Choice == scissor){
                result = player1Id;
            }else{
                result = player2Id;
            }
        }
    }

    console.log('Result'+ result);
    return result;
}
