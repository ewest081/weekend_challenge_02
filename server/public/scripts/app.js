//Global Variables
var interval;
var nextArrow = '\u2192';
var prevArrow = '\u2190';



//Document ready and event listeners
$(document).ready(function(){
    init();
});

function init(){
    enable();
}

function enable(){
    getData();
    buttonMaker();
    intervalTimer();

    $('.button-holder').on('click', '.previous', clickPrevious);
    $('.button-holder').on('click', '.next', clickNext);
    $('.dots-holder').on('click', '.dot' , jumpTo);
}

//get data function we were given.
function getData(){
    var data={};

    $.ajax({
        type: "GET",
        url:"/data",
        success: function(people){
            data = people;
            logData(data);
            createDots(data);
        }
    });
}

//next/prev button creator in the doc.ready
function buttonMaker(){
    $('.button-holder').append('<button class="previous">' + prevArrow + '</button>');
    $('.button-holder').append('<button class="next">' + nextArrow + '</button>');
}

//function to create dot-buttons to show where in the carousel we are... if I get that far (called in getData)
function createDots(data){
    for(i=0; i<data.people.length; i++){
        $('.dots-holder').append('<button class="dot" id="' + i + '"></button>');
    }
}

//Function to allow dot buttons to jump to the person with specified index #
function jumpTo(){
    dotNum = $(this).attr("id");

    //Somehow access the index number on the button ID...
    //Use it to somehow jump to the desired person...
    //I'll get there someday... maybe.

    console.log("dotNUM: " + dotNum);
    resetTimer();
};

//Function to append dom with divs containing the theta info from data.people. Also the longest line of code i've ever writen.
function logData(data){
    for(i=0; i<data.people.length; i++) {

        $('#container').children().append('<li><div class="person ' + i + '"><p class="person-name">Name: ' + data.people[i].name + '</p><p class="person-location">City: ' + data.people[i].location + '</p><p class="person-animal">Spirit Animal: ' + data.people[i].animal + '</p></div></li>');
    }
}

//Below is the interval timer to move the carousel effect.
var intervalTimer = function(){
        interval = setInterval(function () {

            //This one would cause a slide out left effect. Not what the "client" specified upon further inspection of the directions.
            //$("#container ul").animate({marginLeft:-480},1000,function(){
            //    $(this).find("li:last").after($(this).find("li:first"));
            //    $(this).css({marginLeft:0});
            //})

            //This is the fade out - change - fade in interval, looping back to the start.
            $('#container ul').fadeOut(500, function () {
                $(this).find("li:last").after($(this).find("li:first"))
            });
            $('#container ul').fadeIn(500, function () {
            });
//10 second interval
        }, 10000);
};

//function for what happens when you click "previous"
function clickPrevious(){
    $('#container ul').fadeOut(500,function(){
        $(this).find("li:first").before($(this).find("li:last"))
    });
    $('#container ul').fadeIn(500,function(){
    });
    resetTimer();
}

//function for what happens when you click "next"
function clickNext(){
    $('#container ul').fadeOut(500,function(){
        $(this).find("li:last").after($(this).find("li:first"))
    });
    $('#container ul').fadeIn(500,function(){
    });
    resetTimer();
}

//function to reset the timers on clicking a button that calls it
function resetTimer(){
    clearInterval(interval);
    intervalTimer();
}