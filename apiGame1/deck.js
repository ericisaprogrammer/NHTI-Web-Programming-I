function Deck()
{
    var deckID;
    var $deck;

    this.id = function(){
      return deckID;
    };

    this.new = function()
    {
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        console.log("Error: " + c);
      });
    };

    this.draw = function($hand)
    {
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
          alert(data.error);
        }
        updateDeck();
      })
      .fail(function(a, b, c) {
        console.log("Error: " + c);
      });
    };

    this.shuffle = function()
    {
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/",
        dataType: "json"
      })
      .done(function(data) {
        deckID = data.deck_id;
        updateDeck();
      })
      .fail(function(a, b, c) {
        console.log("Error: " + c);
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
        console.log("Error: " + c);
      });
    }

    function updateCount()
    {
      $("#deckCount").text($deck.remaining);
    }
}
