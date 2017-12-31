//Should move socket IO and jquery includes here no?

var socket = io();
var time;
var counterOn;

socket.on('team name', function(msg){
    console.log(msg + " has joined!");
    $( "#playersList" ).append( "<p class='teamName'>" + msg +"</p>" );
});

socket.on('scores', function(users){
    console.log("Scores!");
    console.log(users);
});

$('#Q1').click(function(){
    console.log("Q1 pressed");
    socket.emit('Q', "1");
    $('#QImage').attr("src", "images/Q1.jpg");
    $('#QImage').show();
    startCounter(10);
});

questionOver = function() {
    $('#QImage').hide();
    socket.emit('QF', "1");
    $('#QImage').attr("src", "images/Q1_A.jpg");
    $('#QImage').show();
}

startCounter = function(t) {
    if(!counterOn) {
        counterOn = true;
        time = t;
        var timer = setInterval(function(){
            time--;
            $('#counter').text(time);
            if(time == 0) { 
                clearInterval(timer);
                questionOver();
                counterOn = false;
            }
        }, 1000);
    }
}