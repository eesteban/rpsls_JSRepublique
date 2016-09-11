Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('online', function () {
    let match = Matches.findOne(Session.get('selectedMatch'));
    if(match){
        return match.type === 'online';
    }
});