function Deck()
{
    //Initialization of the deck
  var $deck;
  this.new = function newDeck()
  {
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/new",
      dataType: "json",
    })
    .done( function(data) {
      setDeck(data);
      this.count = $deck.remaining;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      showError(errorThrown)
    });
  };

  this.draw = function drawCard()
  {
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/" + $deck.deck_id + "/draw/?count=1",
      dataType: "json"
    })
    .done( function(data) {
      setDeck(data);
      //return $deck.cards;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      showError(errorThrown)
    });
  };

  this.shuffle = function shuffleDeck()
  {
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/" + $deck.deck_id + "/shuffle/",
      dataType: "json"
    })
    .done( function(data) {
      setDeck(data);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      showError(errorThrown)
    });
  };

  function showError(error)
  {
    $("#app>footer").text("Error: " + error);
  }

  function setDeck(data)
  {
    $deck = data;
  }

  this.test = function()
  {
    alert($deck.remaining);
  }
}
