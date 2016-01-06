//Global Variables
var interval;
var nextArrow = '\u2192';
var prevArrow = '\u2190';
var index;
var maxID;

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
            animalSearch(data);
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
        $('.dots-holder').append('<button class="dot" id="' + i + '" data-dotID="' + i + '"></button>');
    }
    $('.dots-holder').children().first().addClass('highlighted')
}

//Function to append dom with divs containing the theta info from data.people.
function logData(data){
    for(i=0; i<data.people.length; i++) {
        $('#container').append('<div class="person ' + i + '" data-id="' + i + '">');

        var $el = $('#container').children().last();

        $el.append('<p class="person-name">Name: ' + data.people[i].name + '</p>');
        $el.append('<p class="person-name">Location: ' + data.people[i].location + '</p>');
        $el.append('<p class="person-name">Spirit Animal: ' + data.people[i].animal + '</p></div>');

        $el.hide();
    }

    $('#container').children().first().show();
    $('#container').children().first().addClass('visible');

    maxID = data.people.length - 1;
    index = 0;
}

function animalSearch(data){
    //animal = data.people.animalSearch;
    //for(i=0; i < data.people.length; i++) {
    //    $.ajax("http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=1&api_key=dc6zaTOxFJmzC")
    //        .then(function (response) {
    //            console.log(response);
    //            var animal = response;
    //
    //            var $animalgif = '<img src="' + animal.embed_url + '" </img>';
    //
    //            $("").html($animalgif);
    //
    //        })
    //}
}

//Below is the interval timer to move the carousel effect.
intervalTimer = function(){
        interval = setInterval(function () {
            clickNext();
//10 second interval
        }, 10000);
};

//function for what happens when you click "next"
function clickNext(){


    $('.visible').fadeOut().removeClass('visible').next().fadeIn().addClass('visible');
    $('#container').find("div:last").after($('#container').find("div:first"));
    $('.highlighted').removeClass('highlighted').next().addClass('highlighted');

    index++;
    looper();
    resetTimer();
}

//function for what happens when you click "previous"
function clickPrevious(){
    $('#container').find("div:first").before($('#container').find("div:last"));
    $('.visible').fadeOut().removeClass('visible').prev().fadeIn().addClass('visible');
    $('.highlighted').removeClass('highlighted').prev().addClass('highlighted');

    index--;
    looper();
    resetTimer();
}

//Function to allow dot buttons to jump to the person with specified index #
function jumpTo() {
    var dotNum = $(this).attr("id");
    $('.visible').fadeOut().removeClass('visible').parent().find('[data-id="' + dotNum + '"]').delay(400).fadeIn().addClass('visible');
    $('.highlighted').removeClass('highlighted').parent().find('[data-dotID="' + dotNum + '"]').addClass('highlighted');

    index = dotNum;
    resetTimer();
}

//function to loop through in a continuous cycle
function looper(){
    if(index > maxID){
        $('.highlighted').removeClass('highlighted');
        $('#0').addClass('highlighted');
        index = 0;
    }else if(index < 0){
        $('.highlighted').removeClass('highlighted');
        $('.dots-holder').children().last().addClass('highlighted');
        index = 20;
    }
}

//function to reset the timers on clicking a button that calls it
function resetTimer(){
    clearInterval(interval);
    intervalTimer();
}