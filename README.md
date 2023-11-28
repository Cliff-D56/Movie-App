# movies-application

# Summary
A movie application where you can keep track of your favorite movies and search up new ones and watch trailers for that movie and rate them based on personal perference. 

# How to use
To use this Application, simply click on the Add movie button and type in a movie on the search bar. Several movies will populate based off your input and upon finding your movie click on the 'Add Favorite' button and it will be saved to your page. 

While it is on that page, you will be able to EDIT the summary, rating, and even the year of when it was filmed. You will also have the option to DELETE the movie off your page. To access either of these features, click on the three dots next to the movies title.

Additionally, if you go to top left of the page and click on the links you'll be directed to Fandago.com where you'll be able to book tickets for movies. 

# Github help

When pulling or cloning from this repository, the application will not work. You must first follow these steps to run it.

1. You will need to download the dependencies from the package.json file
2. You will notice that there is a keys.js file missing from the js folder. You must make an account on https://developer.themoviedb.org/docs 
3. After doing so you will be issued an API key token, that will start with "BEARER" before a long string of characters, copy the entire string then paste it into the square brackets []: | const BEARER_TOKEN = "Bearer [LONG STRING GOES HERE]"
   export {BEARER_TOKEN} |
4. After doing so copy EVERYTHING from the beginning start point ( | ) to the end point ( | ) DO NOT include either point, just the inner content. 
5. Create a keys.js file inside the js folder and paste result from earlier
6. Finally, in the terminal type in "npm run db" which will start up the application services, then run the index.html file to view the movie application.  