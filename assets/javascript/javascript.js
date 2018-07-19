$(document).ready(function() {
  console.log("ready!");

  var topics = ["Hamburger", "Pizza", "Soda", "Ice - Cream"];
  populate(topics);

  $("#submit-food").on("click", function(event) {
    event.preventDefault();
    var inputFood = $("#food-input")
      .val()
      .trim();
    topics.push(inputFood);
    console.log(topics);
    populate(topics);
  });

  function populate(topics) {
    //I had to cheat here.
    $("#topics").empty();
    for (i = 0; i < topics.length; i++) {
      $("#topics").append(
        "<button data-food='" +
          topics[i] +
          "' class='btn food'>" +
          topics[i] +
          "</button>"
      );
    }
  }
  //OMG!!!!! I don't know exactly why this has to be written like this:
  // $('#selector-to-thing-that-exists').on('click', '.thing-that-will-be-added-later', function() {
  // alert('Do stuff here!');
  // });
  // but I spent a good 2 hours trying to figure out why my images weren't showing up AFTER I added a new topic, I don't know why I didn't just google why after my first 10 minutes.
  //Now my code is a bit more messy thanks to all the moving around, deleting, and adding of lines.
  $("#topics").on("click", ".food", function() {
    var food = $(this).attr("data-food");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      food +
      "&api_key=x9sVAM4jum2qxvuJZC9Ho7iHNNYteQn9&limit=10";
    console.log(food);
    //Ajax GET Request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var foodImage = $("<img>");
            //Found out how to add multiple attributes, but I couldn't have '-' in any of the attribute names.
            foodImage.attr({
              src: results[i].images.fixed_height_still.url,
              imgState: "still",
              imgStill: results[i].images.fixed_height_still.url,
              imgAnimate: results[i].images.fixed_height.url,
              class: "gif"
            });
            gifDiv.append(p);
            gifDiv.append(foodImage);
            $("#gifs").prepend(gifDiv);
          }
        }
        // OK so I found out that if you have this outside of the ajax promise then it won't work? Why is that?
        $("img").on("click", function() {
          var state = $(this).attr("imgState");
          if (state === "still") {
            $(this).attr({
              src: $(this).attr("imgAnimate"),
              imgState: "animate"
            });
            console.log("I'm animating");
          } else {
            $(this).attr({
              src: $(this).attr("imgStill"),
              imgState: "still"
            });
            console.log("I'm frozen");
          }
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
