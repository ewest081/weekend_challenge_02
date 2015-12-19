//global variables: data array of thetas?



$(document).ready(function(){
    getData();

    var t = setInterval(function(){
        $(".person").animate({marginLeft:-480},1000,function(){
            $(this).find("li:last").after($(this).find("li:first"));
            $(this).css({marginLeft:0});
        })
    },5000);

});



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


function logData(data){
    for(i=0; i<data.people.length; i++) {

        $('#container').append('<div class="person"><p class="person-name">Name: ' + data.people[i].name + '</p><p class="person-location">City: ' + data.people[i].location + '</p><p class="person-animal">Spirit Animal: ' + data.people[i].animal + '</p></div>');

    }
}



////div creator to create a div for each theta
//function thetaDIV(data){
//    //do I need to have passed in data? Probably.
//    //for loop to cycle through data
//    //call the new divs .person
//    for(i=0; i<data.people.length; i++) {
//        $('.people-container').append('<div class ="person"></div>');
//        //$('.person').append('<p class="person-name">' + data.people[i].name + '</p>');
//        //$('.person').append('<p class="person-location">' + data.people[i].location + '</p>');
//        //$('.person').append('<p class="person-animal">' + data.people[i].animal + '</p>');
//
//    }
//
//}


//perhaps I dont need the below function...
//appendDom to add thetas to their cohort
    //data.people to access the array and each piece of object data:
    //.name .location .animal
//function appendDOM(){
//    //yet another for loop
//}

//I think the carousel creator will need to be it's own function... to be researched later
//
//$(document).ready(function(){
    //// Set the interval to be 5 seconds
    //var t = setInterval(function(){
    //    $(".person").animate({marginLeft:-480},1000,function(){
    //        $(this).find("li:last").after($(this).find("li:first"));
    //        $(this).css({marginLeft:0});
    //    })
    //},5000);
                //look into getting rid of the timer to add buttons
//});