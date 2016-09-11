Template.gameInfo.helpers({
    playerOption: function () {
        var game = Template.instance().data;
        return game[Meteor.userId()];
    },
    adaptedResult: function(){
        var game = Template.instance().data;
        var result = game.result;
        
        if(result == 'draw'){
            return 'Draw'
        }else if (result == Meteor.userId()){
            return 'Win'
        }else{
            return 'Lost'
        }
    }
});