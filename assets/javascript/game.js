//get Giphy API and make a variable
// make variable with array of cartoon characters
//make that array into buttons and append to the dom
//get user input and add it to the array
//make the user input into a button
//make buttons generate giph upon click
//make the giphs static and make them move upon click


//array of cartoon characters that will load onto page by default
var cartoons = ["Dory", "Johnny Bravo", " Bugs Bunny", "Spongebob","Patrick", "Mr. Crabs", "Arthur"];

//function to turn the array into buttons
function renderButtons () {
    $("#button-area").empty();

    for (var i = 0; i < cartoons.length; i++) {
        var button = $("<button>");
        button.addClass("cartoon");
        button.attr("data-name", cartoons[i]);
        button.text(cartoons[i]);

        $("#button-area").append(button);
    }
}
//function to grab the user's input and add it to the array in order to render the button
$("#add-cartoon").click(function (e) {
    e.preventDefault();
       
        var cartoon = $("#user-input").val();
        cartoons.push(cartoon);
        renderButtons();
        $("#user-input").val("");
      });
renderButtons();


//generating gifs using the giphy API
$(document).on("click", ".cartoon", function(){
    $("#gif-area").empty();
var cartoons = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoons + "&api_key=dB2lTkQQFEY1LLZGQ8jFYebwsPJXenXz&limit=10";

$.ajax ({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    var results = response.data;
    console.log(results);

    for(var i = 0; i < results.length; i++) {
        var gifDiv = $("<div id='gif'>");

        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var cartoonGif = $("<img>");
        cartoonGif.attr("src", results[i].images.fixed_height_still.url);
        cartoonGif.attr("data-still", results[i].images.fixed_height_still.url);     
        cartoonGif.attr("data-animate", results[i].images.fixed_height.url);
        cartoonGif.attr("data-state", "still");
        
        gifDiv.prepend(cartoonGif);
        gifDiv.prepend(p);

        $("#gif-area").prepend(gifDiv);
    }
});
});
//changing the src of the gif to either a static or animated gif upon user's click
$(document).on("click", "img", function(){
    var state = $(this).attr("data-state");
        console.log("hi");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else { 
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
});


