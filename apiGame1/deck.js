function Deck()
{
    var deckID;
    var $deck;

    this.id = function(){
      return deckID;
    };

    this.new = function()
    {
      $("#errorMessage").html("");
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        $("#errorMessage").html("Error: " + (c ? c : "An unknown error has occurred"));
      });
    };

    this.draw = function($hand)
    {
      $("#errorMessage").html("");
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID + "/draw",
        dataType: "json"
      })
      .done(function(data) {
        if(data.success)
        {
          $hand.add(data);
        }
        else {
          $("#errorMessage").html("Error: " + (data.error ? data.error : "An unknown error has occurred"));
        }
        updateDeck();
      })
      .fail(function(a, b, c) {
        $("#errorMessage").html("Error: " + (c ? c : "An unknown error has occurred"));
      });
    };

    this.shuffle = function()
    {
      $("#errorMessage").html("");
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        $("#errorMessage").html("Error: " + (c ? c : "An unknown error has occurred"));
      });
    }

    function updateDeck()
    {
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID,
        dataType: "json"
      })
      .done(function(data) {
        $deck = data;
        updateCount();
      })
      .fail(function(a, b, c) {
        $("#errorMessage").html("Error: " + (c ? c : "An unknown error has occurred"));
      });
    }

    function updateCount()
    {
      $("#deckCount").text($deck.remaining);
    }
}
