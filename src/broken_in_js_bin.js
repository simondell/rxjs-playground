const suggestions_list = document.querySelector( 'ul' );

const refreshButton = document.querySelector('button');
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var requestStream = refreshClickStream
  // this `startWith()` would not work in typescript
  .startWith('it does not matter what goes here')
  .map(function( thing ) {
    console.log( thing );
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

responseStream.subscribe(function(response) {
  console.log( response.length );
/*
  const user_tmpl = document.querySelector('#user');

  user_tmpl.content.querySelector( 'li').textContent = response.length;

  const new_li = document.importNode( user_tmpl.content, true );
  suggestions_list.appendChild( new_li );
*/
});


