"use strict";
// clicking
const refreshButton = document.querySelector('button');
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// making requests
var requestStream = refreshClickStream
  // this `startWith()` would not work in typescript
  .startWith('it does not matter what goes here')
  .map(function( thing ) {
console.log( thing );
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://itunes.apple.com/search?term=pink floyd';
  });

// listening to responses
var responseStream = requestStream
  .flatMap(function(requestUrl) {
    const the_promise_of_data = jQuery.ajax({
    	url: requestUrl,
    	jsonp: 'callback',
    	dataType: 'jsonp'
    });
    return Rx.Observable.fromPromise( the_promise_of_data );
  });

//log
responseStream.subscribe( ( response ) => console.log( response ) );

// drawing responses
function pickRandomSong ( songsList ) {
	return songsList[Math.floor(Math.random()*songsList.length)];
}

function renderSong ( song ) {
	this.textContent = song
		? `"${ song.trackName }" by ${ song.artistName }`
		: '-';
}

// views
const elem = document.querySelectorAll( 'ul li' );
const song_views = [0,1,2].map( index => {
	responseStream.
		map( data => data.results ).
		map( pickRandomSong ).
		merge( refreshClickStream.map(function(){ return null; }) ).
		startWith( null ).
		subscribe( renderSong.bind( elem[ index ] ) );
});
