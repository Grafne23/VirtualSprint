//Should move socket IO and jquery includes here no?

var socket = io();
var time;
var counterOn;
var results = [0, 0, 0, 0];

// Let's see if we can keep the host's users insync with the server's
var teams = new Object();
//{name:score}

socket.on('team name', function(msg){
    console.log(msg + " has joined!");
    teams[msg] = 0;
    $( "#playersList" ).append( "<p class='teamName'>" + msg +"</p>" );
});

socket.on('scores', function(users){
    console.log("choices recieved!");
    console.log(users);
    
    for(user in users){
        if(users[user].choice == 'A') results[0]++;
        if(users[user].choice == 'B') results[1]++;
        if(users[user].choice == 'C') results[2]++;
        if(users[user].choice == 'D') results[3]++;

        if(teams[user] != undefined) teams[user] = users[user].score;
    }
    displayResults();
    updateRankings();
});

updateRankings = function() {
    console.log("update rankings called");
    console.log(teams);
    $( "#playersList" ).empty();
    teamsSorted = Object.keys(teams).sort(function(a,b){return teams[b]-teams[a]})
    console.log(teamsSorted);
    for(var i=0; i < teamsSorted.length; i++) {
        $( "#playersList" ).append( "<p class='teamName'>" + teamsSorted[i] + " : " + teams[teamsSorted[i]] +"</p>" );
    }
}

displayResults = function() {
    console.log("display results called");
    
}

$('#Q1').click(function(){
    console.log("Q1 pressed");
    socket.emit('Q', "1");
    $('#QImage').attr("src", "images/Q1.jpg");
    $('#QImage').show();
    startCounter(10, questionOver);
});

$('#Q2').click(function(){
    console.log("Q2 pressed");
    socket.emit('Q', "2");
    $('#QImage').attr("src", "images/Q2_B.PNG");
    $('#QImage').show();
    startCounter(15, showLines);
});

showLines = function() {
    $('#QImage').attr("src", "images/Q2_L.PNG");
    startCounter(10, questionOver);
}

questionOver = function() {
    $('#QImage').hide();
    socket.emit('QF', "1");
    $('#QImage').attr("src", "images/Q2_A.PNG");
    $('#QImage').show();
}

startCounter = function(t, callback) {
    if(!counterOn) {
        counterOn = true;
        time = t;
        $('#counterText').text(time);
        var timer = setInterval(function(){
            time--;
            $('#counterText').text(time);
            if(time == 0) { 
                clearInterval(timer);
                counterOn = false;
                callback();
            }
        }, 1000);
    }
}