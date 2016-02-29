"use strict";
// clicking
const refreshButton = document.querySelector('button');
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

const term_input = document.querySelector( '[name="term"]' );
const requestStream = Rx.Observable.fromEvent( term_input , 'keypress' )
	.debounce( 500 )
	.map( event => event.target.value )
	.filter( term => term.length > 3 )
	.map( term => `https://itunes.apple.com/search?term=${ term }` )
	.do( term => console.log( term ) );


// making requests
var responseStream = refreshClickStream
  .startWith('it does not matter what goes here')
  // .map( _ => 'https://itunes.apple.com/search?term=pink floyd' )
  .combineLatest( requestStream, ( _, requestUrl ) => requestUrl )
  .flatMap( requestUrl => {
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
