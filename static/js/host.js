//Should move socket IO and jquery includes here no?

var socket = io();
var time;
var counterOn;
var results = [0, 0, 0, 0]; //Stores the count of A-D presses for the current Q
var correctAnswers = ['C', 'B', 'C', 'D', 'A', 'C'];

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
    $('#Abar').css({
        "background-color": "yellow",
        "width": "40px",
        "height": (results[0] * 20 + 1) + "px"
    });
    $('#Bbar').css({
        "background-color": "blue",
        "width": "40px",
        "height": (results[1] * 20 + 1) + "px"
    });
    $('#Cbar').css({
        "background-color": "orange",
        "width": "40px",
        "height": (results[2] * 20 + 1) + "px"
    });
    $('#Dbar').css({
        "background-color": "pink",
        "width": "40px",
        "height": (results[3] * 20 + 1) + "px"
    });
    $('#Abar p').text(results[0]);
    $('#Bbar p').text(results[1]);
    $('#Cbar p').text(results[2]);
    $('#Dbar p').text(results[3]);
    startCounter(15, colourAnswer, 3);
}

colourAnswer = function(num) {
    console.log("colourAnswer called");
    $('#Abar').css({
        "background-color": "red",
    });
    $('#Bbar').css({
        "background-color": "red",
    });
    $('#Cbar').css({
        "background-color": "red",
    });
    $('#Dbar').css({
        "background-color": "red",
    });

    $('#' + correctAnswers[num - 1] + 'bar').css({
        "background-color": "green"
    });
}

$('#Q1').click(function(){
    showRouteChoiceQ(1);
});

$('#Q2').click(function(){
    showRouteChoiceQ(2);
});

$('#Q3').click(function(){
    showRouteChoiceQ(3);
});

showRouteChoiceQ = function(num) {
    socket.emit('Q', num);
    if(num == 1)
        $('#QImage').attr("src", "images/Q" + num + "_B.jpg");
    else
        $('#QImage').attr("src", "images/Q" + num + "_B.png");
    $('#QImage').show();
    $('#Q' + num).css("background-color", "green");

    startCounter(15, showLines, num);
}

showLines = function(num) {
    $('#QImage').attr("src", "images/Q" + num + "_L.PNG");
    startCounter(10, questionOver, num);
}

questionOver = function(num) {
    $('#QImage').hide();
    socket.emit('QF', num);
    $('#QImage').attr("src", "images/Q" + num + "_A.PNG");
    $('#QImage').show();
}

startCounter = function(t, callback, num) {
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
                callback(num);
            }
        }, 1000);
    }
}