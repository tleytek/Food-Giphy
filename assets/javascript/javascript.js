$(document).ready(function() {
  console.log("ready!");

  var topics = ["Hamburger", "Pizza", "Soda", "Ice - Cream"];
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
  populate(topics);

  $(".food").on("click", function() {
    var food = $(this).attr("data-food");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      food +
      "&api_key=x9sVAM4jum2qxvuJZC9Ho7iHNNYteQn9&limit=10";

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
        $("#submit-food").on("click", function() {
          var inputFood = $("#food-input")
            .val()
            .trim();
          topics.push(inputFood);
          populate(topics);
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
