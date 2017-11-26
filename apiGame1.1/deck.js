function Deck()
{
    var deckID;
    var $deck;

    this.id = function(){
      return deckID;
    };

    this.new = function()
    {
      clearError();
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    };

    this.draw = function($hand)
    {
      clearError();
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
          showError(data.error);
        }
        updateDeck();
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    };

    this.shuffle = function()
    {
      clearError();
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        showError(c);
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
        showError(c);
      });
    }

    function updateCount()
    {
      $("#deckCount").text($deck.remaining);
    }

    function clearError()
    {
      $("#errorMessage").html("");
    }

    function showError(error)
    {
      $("#errorMessage").html("Error: " + (error ? error : "An unknown error has occurred"));
    }
}
