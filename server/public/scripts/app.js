$(document).ready(function(){
    getData();

    //first sad attempt at a carousel effect... with interesting results.
    var t = setInterval(function(){
        $(".person").animate({marginLeft:-480},1000,function(){
            $(this).find("li:last").after($(this).find("li:first"));
            $(this).css({marginLeft:0});
        })
    },5000);

});


//get data function we were given.
function getData(){
    var data={};

    $.ajax({
        type: "GET",
        url:"/data",
        success: function(people){
            data = people;
            console.log(data.people.length);
            logData(data);
        }
    });
}

//next/prev button creator in the doc.ready?
//we'll see if this is necessary or if it's included in the carousel code below... somehow I doubt the latter.
function buttonMaker(){
    //$('.button-holder').append('<button class="previous">Previous</button>');

}



//Function to append dom with divs containing the theta info from data.people. Also the longest line of code i've ever writen.
function logData(data){
    for(i=0; i<data.people.length; i++) {

        $('#container').append('<div class="person"><ul><li class="person-name">Name: ' + data.people[i].name + '</li><li class="person-location">City: ' + data.people[i].location + '</li><li class="person-animal">Spirit Animal: ' + data.people[i].animal + '</li></ul></div>');

    }
}
