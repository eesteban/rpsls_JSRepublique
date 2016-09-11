Template.option.helpers({
    remarkOption: function (currentOption) {
        let matchId = Session.get('selectedMatch');
        let match = Matches.findOne(matchId, {type: 1});
        if(match) {
            if(match.type=='local'){
                return false;
            }else{
                return currentOption === Session.get('option');
            }
        }
    }
});