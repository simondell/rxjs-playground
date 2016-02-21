# An RXJS playground

A handful of files to help me get into using Rx.js and some other tech as whimsy takes over.




## Dev log

1. It starts out as an HTML file with embedded JS that logs filtered array elements out to markup.
2. I decide it would be fun to wrap an Rx.Observable around data from a socket.io connection. However, I don't remember much about doing this, so I ran through [a tutorial](http://socket.io/get-started/chat/), tweaking it a little as I went.
3. On reaching the point in the tutorial where a simple HTML page is served, requesting socket.io from Express, I'm invited to open multiple tabs and see socket.io respond to connections. This works, but I notice in the logs that `res.sendfile()` is to be deprecated in favour of `res.sendFile()`. I expected it would be a straight swap but I was mistaken. In fact I need to set up an <var>options</var> hash with a <var>root</var> property set to the absolute filesystem path to my project root. I got nasty errors without this. I can see the flexibility here, but it feels weird not having a "sensible" default root path. A quick scan of the Express v4 announcement page showed that the team had gone to quite significant lengths to streamline their tool, cutting out a load of default middleware in favour of separate modules. I guess this push for abstraction has gone pretty far!
4.  Next, the tutorial had me `emit()`ing messages from the client to the server, over the socket.io connection. Because I'm difficult, I chose not to include JQuery in the HTML as the tutorial directed. This meant I had to find other ways to get to the form and elements. I'm out of practice with native DOM manipulation (and I've never written an ajax request with a XMLHttpRequest!), so I had to remind myself how to get the value out of an input element. Luckily it's pretty easy: `document.querySelector( 'input' ).value`.
5. I'm taking every opportunity to tinker with unfamiliar or old-fashioned HTML and JS patterns now. My HTML avoids classnames, my CSS hooks into elements via document structure and ARIA roles, my JS includes odd things like event handlers bound to the element most useful to the handler (such as the input element in the form submission handler). I have reasons for these quirks, but I'll detail them elsewhere.