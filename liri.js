require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

function UserInputs(userOption, inputParameter) {
    switch (userOption) {
        case "concert-this":
            showConcertInfo(inputParameter);
            break;
        case "spotify-this-song":
            showSongInfo(inputParameter);
            break;
        case "movie-this":
            showMovieInfo(inputParameter);
            break;
        case "do-what-it-says":
            showInfo();
            break;
        default:
            console.log("Error.")
    }
}

var getArtistNames = function (artist) {
    return artist.name;
};

var getRottenTomatoesRatingValue = function (movie) {
    return movie.name;
}

function showConcertInfo(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("Concert Info");
                fs.appendFileSync("log.txt", "Concert Info\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
                console.log("Venue Location: " + concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
                console.log("Date of the Event: " + concerts[i].date);
                fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].date + "\n");
                console.log("-----------------------");
                fs.appendFileSync("log.txt", "-----------------" + "\n");
            }
        } else {
            console.log("error")
        }
    });
}


function showSongInfo(songName) {
    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            //console.log(songs);
            for (var i = 0; i < songs.length; i++) {
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
}


function showMovieInfo(inputParameter) {
    if (inputParameter === undefined) {
        findMovie = "Mr. Nobody";
        console.log("-------------------");
        fs.appendFileSync("log.txt", "-----------------\n");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=c2d7263e";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movies = JSON.parse(body);
            console.log("Movie");
            fs.appendFileSync("log.txt", "Movie\n");
            console.log("Title: " + movies.Title);
            fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
            console.log("Release Year: " + movies.Year);
            fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
            console.log("IMDB Rating: " + movies.imdbRating);
            fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
            console.log("Country of Production: " + movies.Country);
            fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
            console.log("Language: " + movies.Language);
            fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
            console.log("Plot: " + movies.Plot);
            fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
            console.log("Actors: " + movies.Actors);
            fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
            console.log("--------------------");
            fs.appendFileSync("log.txt", "---------------------\n");
        } else {
            console.log('Error occurred.');
        }
    });
}






