//Should move socket IO and jquery includes here no?

var socket = io();

$(function () {
    socket.on('team name', function(msg){
        console.log(msg + " has joined!");
        $( "#playersList" ).append( "<p class='teamName'>" + msg +"</p>" );
    });
});
