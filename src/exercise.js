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
    return 'https://api.github.com/users?since=' + randomOffset;
  });

// listening to responses
var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

responseStream.subscribe( ( response ) => console.log( response ) );

// drawing responses
function pickRandomUser ( usersList ) {
	return usersList[Math.floor(Math.random()*usersList.length)];
}

const suggestion1Stream = responseStream.
	map( pickRandomUser ).
	subscribe( user => {
		const li = document.querySelectorAll( 'ul li' )[0];
		li.textContent = user.login;
	});

const suggestion2Stream = responseStream.
	map( pickRandomUser ).
	subscribe( user => {
		const li = document.querySelectorAll( 'ul li' )[1];
		li.textContent = user.login;
	});

const suggestion3Stream = responseStream.
	map( pickRandomUser ).
	subscribe( user => {
		const li = document.querySelectorAll( 'ul li' )[2];
		li.textContent = user.login;
	});




// class SuggestionElement {
// 	constructor ( elem ) {
// 		this.elem = elem;
// 	}

// 	render ( data ) {
// 		this.elem.textContent = data.login;
// 	}
// }

// var suggestionIndeces = [0, 1, 2];

// var suggestionViews = suggestionIndeces.map( index => {
// 	new SuggestionElement( document.querySelectorAll( 'ul li' )[ index ] );
// });

// var suggestionSubscriptions = suggestionIndeces.map( index => {
// 	responseStream.map(function(listUsers) {
// 		// get one random user from the list
// 		return listUsers[Math.floor(Math.random()*listUsers.length)];
// 	});
// });

// suggestionSubscriptions.forEach( ( suggestionSubscription, index ) => {
// console.log( index, suggestionSubscription );
// 	suggestionSubscription.subscribe( user => {
// 		suggestionViews[ index ].render( user );
// 	});
// });