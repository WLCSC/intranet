WLCSC/intranet
==============

History
-------

`intranet` was designed to improve the experience of the users of---and provide a hub for everything done internally on---the WLCSC network.

Dependencies
------------

Intranet requires the `sinatra` gem.
It is ideal to have `thin` installed, as it is a better server which produces less output on general request handling and has lower latency.
You also need to have `rubygems` available.

All of the CSV handling is done client-side, by a JavaScript file that is propagated and generated from the template `views/csv.js.erb`.
The main template for what becomes `index.html` is also generated from the template `views/index.erb`.
The server sends both of the files off along with any assets, and the JavaScript then populates all of the div's in the notes and references sections.

The way that this CSV parsing is done is rather simple; the JavaScript files download the CSV files from the server (they are stored in the `public/csv/` directory) and then change the contents of the divs in what becomes `index.html` to reflect the contents of the CSV files.

General usage
-------------

As-is, the CSV files can be edited through the web interface for GitHub or on the client side (and then pushed to the repository or whatnot).
If the content manager is content with the contents of the CSV files, they can simply start the server by running the command:

    ruby serve.rb

This command then creates a Sinatra server using whatever server gem it can find (Sinatra searches for `thin` first before defaulting to `WEBrick`, I believe), and starts a server.

If any edits are made to `serve.rb` itself, the command should be run again once the existing instance of the server gets shut down.
Any edits to the JavaScript or template should work automagically and only require a refresh---which any edits would need anyway---on the client side.
Any edits to the CSV files also should work automagically and only require a refresh to propagate.

Contributing
------------

You are certainly free to fork this repository and do work on your fork.
If you do fork it and have something that you want to share with us, as always, please, send us a pull request.
We'd be glad to look at your work and consider putting your changes into the project.

If you have any problems when deploying or using our software, we'll be checking the `Issues` section of this repository for any bug reports.

License
-------

Intranet, a generator and server for the WLCSC
Copyright (C) 2013 Kristofer Rye
    
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <[http://www.gnu.org/licenses/](http://www.gnu.org/licenses/)>.
