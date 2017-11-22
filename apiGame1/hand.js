function Hand(name)
{
  var $hand;
  var deckID;

  this.name = name;

  this.add = function(draw)
  {
    var cardID = draw.cards[0].code;
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/" + deckID
         + "/pile/" + name + "/add/?cards=" + cardID,
      dataType: "json"
    })
    .done(function(data) {
      updateHand();
    })
    .fail(function(a, b, c) {
      console.log("Error: " + c);
    });
  };

  this.clear = function()
  {
    var cardList = $hand.piles[name].cards;
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/" + deckID
         + "/pile/" + name + "/draw/?count=" + cardList.length,
      dataType: "json"
    })
    .done(function(data) {
      updateHand();
    })
    .fail(function(a, b, c) {
      console.log("Error: " + c);
    });
  }

  this.new = function($deck)
  {
    deckID = $deck.id();
    clearDisplay();
  };

  this.setDeck = function($deck)
  {
    deckID = $deck.id();
  };

  function clearDisplay()
  {
    $("#hand").html("");
  }

  function updateHand()
  {
    $.ajax({
      url: "https://deckofcardsapi.com/api/deck/" + deckID
         + "/pile/" + name + "/list",
      dataType: "json"
    })
    .done(function(data) {
      $hand = data;
      updateHandDisplay();
    })
    .fail(function(a, b, c) {
      console.log("Error: " + c);
    });
  }

  function updateHandDisplay()
  {
    if($hand.success)
    {
      clearDisplay();
      var cardList = $hand.piles[name].cards;
      $("#hand").html("");

      cardList.forEach(function(card)
      {
        $("#hand").append("<img src='"+ card.image
                        + "' alt='" + card.value + " of " + card.suit + "'/>");
      });
    }
    else {
      console.log("Error: " + $hand.error);
    }
  }
}
