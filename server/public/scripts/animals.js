//Function to append dom with divs containing the theta info from data.people.
function logData(data){
    for(i=0; i<data.people.length; i++) {
        $('#container').append('<div class="person ' + i + '" data-id="' + i + '">');

        var animalGif;
        var $el = $('#container').children().last();

//all sorts of fun things to attempt to append gifs from Giphy API
        var animalSearch = data.people.animalSearch;
        $.ajax("http://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&limit=1&api_key=dc6zaTOxFJmzC")
            .then(function (response) {
                var animalResults = response;

                animalGif =  animalResults.data.embed_url;
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