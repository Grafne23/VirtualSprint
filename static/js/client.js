//Should move socket IO and jquery includes here no?

var socket = io();

$(function () {
    $('#D').click(function(){
        console.log("D pressed");
        socket.emit('chat message', "You pressed D!");
        return false;
    });
});

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

console.log("helllllloooo");