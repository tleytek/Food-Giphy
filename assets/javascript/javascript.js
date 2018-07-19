$(document).ready(function() {
  console.log("ready!");

  $("button").on("click", function() {
    var food = $(this).attr("data-food");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      food +
      "&api_key=x9sVAM4jum2qxvuJZC9Ho7iHNNYteQn9&limit=10";

    //Ajax GET Request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var foodImage = $("<img>");

          //Found out how to add multiple attributes, but I couldn't have '-' in any of the attribute names.
          foodImage.attr({
            src: results[i].images.fixed_height_still.url,
            imgState: "still",
            class: "gif",
            imgStill: results[i].images.fixed_height_still.url,
            imgAnimate: results[i].images.fixed_height.url
          });

          gifDiv.append(p);
          gifDiv.append(foodImage);

          $("#gifs").prepend(gifDiv);
        }
      }
    });
  });

  $(".gif").on("click", function() {
    var state = $(this).attr;
  });
});
