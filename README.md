# An RXJS playground

A handful of files to help me get into using Rx.js and some other tech as whimsy takes over.

## The Staltz method

Running through the [Staltz tutorial](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).

I wanted to work in ES6, so most of the code is written like that. Some of the parts I copy'n'pasted from the tutorial so they might still be in ES5. There's a build pipeline: npm + browserify + babel.

1. get the code
2. `npm install`
3. `npm run build`
4. `npm run watch` (`watch` is blocking, so you'll need a new tab for `serve`)
5. `npm run serve`