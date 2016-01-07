//Function to append dom with divs containing the theta info from data.people.
function logData(data){
    for(i=0; i<data.people.length; i++) {
        $('#container').append('<div class="person ' + i + '" data-id="' + i + '">');

        var $el = $('#container').children().last();

//all sorts of fun things to attempt to append gifs from Giphy API
        var animalSearch = data.people.animalSearch;
        $.ajax("http://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=dc6zaTOxFJmzC")
            .then(function (response) {
                var animalResults = response;
                console.log(animalResults);

                var animalGif =  animalResults.data.embed_url;
                console.log(animalGif);

            });

                $el.append('<p class="person-name">Name: ' + data.people[i].name + '</p>');
                $el.append('<p class="person-name">Location: ' + data.people[i].location + '</p>');
                $el.append('<p class="person-name">Spirit Animal: ' + data.people[i].animal + '</p></div>');
                $el.append('<img src="' + animalGif + '" style="height:90px;">');

                $el.hide();
            }

        $('#container').children().first().show();
        $('#container').children().first().addClass('visible');

        maxID = data.people.length - 1;
        index = 0;
}




function logData(data){
    for(i=0; i<data.people.length; i++) {
        $('#container').append('<div class="person ' + i + '" data-id="' + i + '">');

        var animalGif = data.people.animalSearch;
        var url = 'http://api.giphy.com/v1/gifs/search?q=' + animalGif + '&rating=r&api_key=dc6zaTOxFJmzC';

        var $el = $('#container').children().last();

        $el.append('<p class="person-name">Name: ' + data.people[i].name + '</p>');
        $el.append('<p class="person-name">Location: ' + data.people[i].location + '</p>');
        $el.append('<p class="person-name">Spirit Animal: ' + data.people[i].animal + '</p></div>');
        $el.append('<img class="gif" src="' + url + '" style="height:90px;" alt="' + data.people[i].animal + '">');

        $el.hide();
    }

    $('#container').children().first().show();
    $('#container').children().first().addClass('visible');

    maxID = data.people.length - 1;
    index = 0;
}



//start anthony's example
function createArray() {
    $('.submit').on('click', function(event) {
        event.preventDefault();
        clearDom();
        var value = document.getElementById('search').value;
        value = value.split(" ");
        console.log(value);
        createAppendTerms(value);
    })
}
​
function createAppendTerms(value) {
    for(var i = 0; i < value.length; i++) {
        var random = randomNumber(value);
        var word = value[i];
        var url = 'http://api.giphy.com/v1/gifs/search?q=' + word + '&rating=r&api_key=dc6zaTOxFJmzC';
        appendToDom(url, random, word);
    }
}
​
function appendToDom(url, random, word) {
    $.ajax(url).then(function(response) {
        var display = response.data[random].images.fixed_width.url;
        $('.display').append('<div class="item"></div>');
        var $el = $('.display').children().last();
        $el.append('<img class="gif" src=' + display + ' />');
        $el.append('<p>' + word + '</p>');
    })
}
//end anthony's example







//Here's the working one: don't lose it!
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