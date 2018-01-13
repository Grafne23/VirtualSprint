//Should move socket IO and jquery includes here no?

var socket = io();
var answer;
var teamName;

var numChoices     = [ 3,   3,   3,   4,   3,   3,   4,   4,   4,   3,   4,   2];
var descriptions = ["Choose the SHORTEST route",
                    "Choose the FASTEST route"];

//has no effect?
var $currentInput = $('#nameInput').focus();

$('#A').click(function(){
    setColoured('A');
    socket.emit('choice', "A");
});
$('#B').click(function(){
    setColoured('B');
    socket.emit('choice', "B");
});
$('#C').click(function(){
    setColoured('C');
    socket.emit('choice', "C");
});
$('#D').click(function(){
    setColoured('D');
    socket.emit('choice', "D");
});

setColoured = function(X) {
    $('#A').css("background-color", "white");
    $('#B').css("background-color", "white");
    $('#C').css("background-color", "white");
    $('#D').css("background-color", "white");
    $('#' + X).css("background-color", "green");
}

showButtons = function(num) {
    var numberChoices = numChoices[num - 1];
    $('#A').css("background-color", "white");
    $('#B').css("background-color", "white");
    $('#C').css("background-color", "white");
    $('#D').css("background-color", "white");

    $('#C').show();
    $('#D').show();

    if(numberChoices == 3) {
        $('#D').hide();
    } else if(numberChoices == 2) {
        $('#D').hide();
        $('#C').hide();
    }

    $('#multipleChoiceContainer').show();
}

$(function () {
    $('#submitName').click(function(){
        console.log("okay pressed");
        var name = $('#name').val();
        socket.emit('team name', name);
        $('#title').text("Hello there " + name + "!");
        $('#nameInput').hide();
        $('#multipleChoiceContainer').show();
        return false;
    });
});

socket.on('Q', function(num){
    $('#questionNumber').text("Question Number " + num);
    if(num <= 5) {
        $('#questionDescription').text(descriptions[0]);
    } else {
        $('#questionDescription').text(descriptions[1]);
    }
    showButtons(num);
});

socket.on('QF', function(num){
    $('#questionNumber').text("Question Number " + num + " over");
    $('#multipleChoiceContainer').hide();
});

socket.on('reconnect', function () {
    console.log('you have been reconnected');
    if (teamName) {
        socket.emit('team name', teamName);
    }
});


console.log("helllllloooo");