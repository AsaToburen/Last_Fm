$(document).ready(function() {
    var audioObject = null;

    $('#userMusic').submit(function(e) {
        e.preventDefault();
        //gets value from form
        var userInput = document.getElementById('search_field').value;
        //call getJSON function
        getArtistInfo(userInput);
    });

    $('#searchNew').submit(function(e) {
        e.preventDefault();
        var userInput = document.getElementById('new').value;
        audioObject.pause();
        getArtistInfo(userInput);
    });


    function getArtistInfo(artistName) {
        var params = {
            method: "artist.getInfo",
            artist: artistName,
            autocorrect: 1,
            api_key: "c448100138ee7b3212c19d70c0a1830b",
            format: "json"
        };

        url = 'http://ws.audioscrobbler.com/2.0/';
        $.getJSON(url, params, function(data) {
            var storeImageData = "";
            var artistArray = data.artist.similar.artist;
            var mainArtistName = data.artist.name;
            var artistBio = data.artist.bio.summary;
            var mainArtistImage = data.artist.image[4]['#text'];
            $('#container').show();
            $('.lightbox').fadeOut('slow');

            $.each(artistArray, function(key, value) {
                var imageObj = value.image[2];
                var artistName = value.name;
                var imageUrl = imageObj['#text'];
                storeImageData = storeImageData + '<div class="newSong"><p class="nextArtistName">' + artistName + '</p><img alt="' + artistName + '"src="' + imageUrl + '"></div>';
            });
            $('#artImage').html('<img max-width="450px" max-height="450px" src="' + mainArtistImage + '">');
            $('#songs').html(storeImageData);
            $('#artistDiv').html('<h2 class="artName">' + mainArtistName + '</h2><span id="pause" class="mega-octicon octicon-playback-pause"></span><span id="play" class="mega-octicon octicon-playback-play"></span><div>' + artistBio + '</div>');
            $('#art-name').html(mainArtistName);
            searchAlbums(artistName);
        });
    };

    var getTracks = function(albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function(response) {
                callback(response);
            }
        });
    };


    function searchAlbums(userEntry) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: 'artist:' + userEntry,
                type: 'album',
                market: "US"
            },
            success: function(response) {
                var albumId = response.albums.items[0].id;

                getTracks(albumId, function(data) {
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.pause();
                    audioObject.addEventListener('ended', function() {
                        console.log('ended');
                    });
                    audioObject.addEventListener('pause', function() {
                        console.log('paused');
                    });
                });
            }
        });

        $('#play').click(function() {
            audioObject.play();
            $('#play').hide();
            $('#pause').show();
        });

        $('#pause').click(function() {
            audioObject.pause();
            $('#play').show();
            $('#pause').hide();
        });

        document.getElementById('songs').addEventListener('click', function(e) {
            audioObject.pause();
            var nextArtistName = e.target.parentNode.childNodes[0].innerHTML;
            var userInput = nextArtistName;
            getArtistInfo(nextArtistName);
        }, false);
    };
});
