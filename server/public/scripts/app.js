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
            animalGif(data);
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

//random number function used in animalGif to pull a random giphy from the API data returned
function randomNumber() {
    var min = 0;
    var max = 24;
        return Math.floor(Math.random() * (1 + max - min) + min);
}

//function that pulls data from the giphi api and appends it into a new container for the images
animalGif = function(data){
    setTimeout(function () {
        for (i = 0; i < data.people.length; i++) {

            var animalGiphy = data.people[i].animalSearch;
            var urlData = "http://api.giphy.com/v1/gifs/search?q=" + animalGiphy + "&api_key=dc6zaTOxFJmzC";
            $.ajax(urlData).then(function (response) {
                var random = randomNumber();
                var displayGif = response.data[random].images.fixed_width.url;

                $('.pictures').append('<img class="gif' + i + '" src="' + displayGif + '" style="height:90px;"  data-gifID="' + i + '"/>');
                $('.pictures').children().hide();
                $('.pictures').children().first().show();
                $('.pictures').children().first().addClass('shown');
            });
        }
    },1500)
};

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
    $('.shown').fadeOut().removeClass('shown').next().fadeIn(500).addClass('shown');
    $('.images').find("img:last").after($('.images').find("img:first"));


    index++;
    looper();
    resetTimer();
}

//function for what happens when you click "previous"
function clickPrevious(){
    $('#container').find("div:first").before($('#container').find("div:last"));
    $('.visible').fadeOut().removeClass('visible').prev().fadeIn().addClass('visible');
    $('.highlighted').removeClass('highlighted').prev().addClass('highlighted');
    $('.shown').fadeOut().removeClass('shown').prev().fadeIn().addClass('shown');

    index--;
    looper();
    resetTimer();
}

//Function to allow dot buttons to jump to the person with specified index #
function jumpTo() {
    var dotNum = $(this).attr("id");
    $('.visible').fadeOut().removeClass('visible').parent().find('[data-id="' + dotNum + '"]').delay(400).fadeIn().addClass('visible');
    $('.highlighted').removeClass('highlighted').parent().find('[data-dotID="' + dotNum + '"]').addClass('highlighted');
    $('.shown').fadeOut().removeClass('shown').parent().find('[data-gifID="' + dotNum + '"]').fadeIn().addClass('shown');

    index = dotNum;
    resetTimer();
}

//function to loop through in a continuous cycle
function looper(){
    if(index > maxID){
        $('.highlighted').removeClass('highlighted');
        $('#0').addClass('highlighted');
        $('.shown').fadeOut().removeClass('shown');
        $('.gif0').fadeIn().addClass('highlighted');
        index = 0;
    }else if(index < 0){
        $('.highlighted').removeClass('highlighted');
        $('.dots-holder').children().last().addClass('highlighted');
        $('.shown').fadeOut().removeClass('shown');
        $('.pictures').children().last().fadeIn().addClass('shown');
        index = 20;
    }
}

//function to reset the timers on clicking a button that calls it
function resetTimer(){
    clearInterval(interval);
    intervalTimer();
}