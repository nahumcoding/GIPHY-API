/*====================VARIABLES================*/

var queryURL = 'https://api.giphy.com/v1/gifs/search?q='
var APIKey = '&api_key=YpG9yDfvoVHxEwTG3qwBCk2GQGXggCjd'
var bandList = ['lil wayne', 'j cole', '8 mile', '2pac', 'gucci man']


/*====================FUNCTIONS================*/



function renderButtons() {
	$("#buttons-view").empty();

    for (var i = 0; i < bandList.length; i++) {

    	var button = $("<button>");
    	button.addClass("band-name");
    	button.attr("data-name", bandList[i]);
    	button.text(bandList[i]);
    	$("#buttons-view").append(button);
    }
}


function displayBandInfo() {

	    var band = $(this).attr("data-name");
	    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + band + APIKey

	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).then(function(response) {

	    	console.log(response)

	      $("#gif-viewer").empty();

	      var results = response.data;

          for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='item'>");

            var bandGif = $("<img>");

            bandGif.attr( { src: results[i].images.fixed_height_still.url, 'data-still': results[i].images.fixed_height_still.url, 
            'data-animate': results[i].images.fixed_height.url, 'data-state': 'still', class: 'gif'});

            gifDiv.prepend(bandGif);

            $("#gif-viewer").append(gifDiv);
          }

	    });

	  }

  renderButtons()



/*====================CLICK EVENTS================*/

$("#addBand").on("click", function(event) {
        
    event.preventDefault();
    var band = $("#band-input").val();

    if ((bandList.indexOf(band) === -1) && (band !== '')) {

    	bandList.push(band);
		renderButtons();
		$('#band-input').val('');
	}
	else {
		$('#band-input').val('');
	}

});

/*$('.gif').on('click', function () {
	event.preventDefault();
	state = $(this).attr('data-state')
    console.log(state)
    if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } 
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});*/

$(document).on("click", ".band-name", displayBandInfo);

$(document).on("click", ".gif", function () {

	var state = $(this).attr('data-state')
    console.log(state)

    if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } 

    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
