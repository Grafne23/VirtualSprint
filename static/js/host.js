//Should move socket IO and jquery includes here no?

var socket = io();
var time;
var counterOn;
var results = [0, 0, 0, 0];

socket.on('team name', function(msg){
    console.log(msg + " has joined!");
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
    }
    displayResults();
});

displayResults = function() {
    console.log("display results called");
    var chart = AmCharts.makeChart("resultsSpace", {
        "type": "serial",
        "theme": "light",
        "columnWidth": 1,
        "dataProvider": [{
          "category": "0"
        }, {
          "category": "A",
          "count": 1
        }, {
          "category": "B",
          "count": 4
        }, {
          "category": "C",
          "count": 5
        }, {
          "category": "D",
          "count": 0
        }],
        "graphs": [{
          "fillColors": "#c55",
          "fillAlphas": 0.9,
          "lineColor": "#fff",
          "lineAlpha": 0.7,
          "type": "column",
          "valueField": "count"
        }],
        "categoryField": "category",
        "categoryAxis": {
          "startOnAxis": true,
          "title": "Results"
        },
        "valueAxes": [{
          "title": "Count"
        }]
      });
    //var histogram = d3.histogram().domain(x.domain();
  /*  var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([height, 0]);
    var y = d3.scaleLinear().rangeRound([0, width]).padding(0.1);

    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data)*/
    /*d3.select("#resultsSpace")
    .selectAll("div")
    .data(results)
    .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });*/
}

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