Template.gameInfo.helpers({

    playerOption: function () {
        var game = Template.instance().data;
        return game[Meteor.userId()];
    },
    player1Option: function () {
        var game = Template.instance().data;
        return game['Player 1'];
    },
    player2Option: function () {
        var game = Template.instance().data;
        return game['Player 2'];
    },
    adaptedResult: function(){
        var game = Template.instance().data;
        var result = game.result;
        
        if(result == 'draw'){
            return 'Draw'
        }else{
            let match = Matches.findOne(Session.get('selectedMatch'));
            if(match.type == 'online'){
                if (result == Meteor.userId()){
                    return 'Win'
                }else{
                    return 'Lost'
                }
            }else{
                return result;
            }

        }
    }
});