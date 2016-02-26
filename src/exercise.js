"use strict";
// clicking
const refreshButton = document.querySelector('button');
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// making requests
var responseStream = refreshClickStream
  // this `startWith()` would not work in typescript
  .startWith('it does not matter what goes here')
  .map( _ => 'https://itunes.apple.com/search?term=pink floyd' )
  .flatMap(function(requestUrl) {
    const the_promise_of_data = jQuery.ajax({
    	url: requestUrl,
    	jsonp: 'callback',
    	dataType: 'jsonp'
    });
    return Rx.Observable.fromPromise( the_promise_of_data );
  })
  .map( data => data.results )
  .do( _ => console.log( 'Executing response stream') )
  .share();


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
const elems = [].slice.call( document.querySelectorAll( 'ul li' ) );
const song_views = elems.map( ( elem, index ) => {
	const song_view_click_stream = Rx.Observable.fromEvent( elem, 'click' )
		.startWith( null );

	const song_stream = 	responseStream
		.combineLatest( song_view_click_stream, ( songs, _ ) => songs )
		.map( pickRandomSong );

	const data_stream = song_stream
		.merge( refreshClickStream.map( _ => null ) )
		.startWith( null );

	const render_sub = data_stream
		.subscribe( renderSong.bind( elem ) );
});
