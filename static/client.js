//Should move socket IO and jquery includes here no?

var socket = io();

$(function () {
    var socket = io();
    $('#D').click(function(){
        console.log("D pressed");
      socket.emit('chat message', "You pressed D!");
      return false;
    });
  });

console.log("helllllloooo");