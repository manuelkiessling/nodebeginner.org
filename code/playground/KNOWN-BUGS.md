# Known Bugs

## The server serves its own code

See http://localhost:8000/server.js when running the server


## Subsequent requests after changing the app JS still try to load old JS file

This seems to happen because sw-precache stores the fallback file which references the old JS file, and upon the 2nd
soft-reload while online, the fallback file is used instead of getting the document from the server, however, the
old referenced JS file is retrieved by the sw from the server, it is no longer available there, and thus invalid content
is delivered.
