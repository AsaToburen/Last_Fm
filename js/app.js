$(document).ready(function(){

	$('.container').hide();  ///set values in css to display hidden on default
	$('.lightbox').show();

$("form").submit(function(event){
	event.preventDefault();
	//gets value from form
	var userInput = document.getElementById('search_field').value;
	//call ajax function
	outToLastFM(userInput);
});

function outToLastFM(userEntry) {
	var params = {
		method: "artist.getsimilar",
		artist: userEntry,
		api_key: "c448100138ee7b3212c19d70c0a1830b",
		limit: 8,
		format: "json"
	};
	url = 'http://ws.audioscrobbler.com/2.0/';
	$.getJSON(url, params, function(data){
			$('.container').show();
			$('.lightbox').hide();
			var artistArray = data.similarartists.artist;
			var output = "";

		$.each(artistArray, function (key, value){
			 var imageObj = value.image[3];
			  imageUrl = imageObj['#text'];
			 var update = document.getElementsByTagName('section div')
			 console.log(imageUrl);
			
		});
		//output += '<img src="' + imageUrl + '">'
				var results = $('.newSong').html("<img src='" + imageUrl + "'>");
	});
	




};
});