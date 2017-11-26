function Hand(name)
{
  var $hand;
  var deckID;

  this.name = name;

  this.add = function(draw)
  {
    clearError();
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
      showError(c);
    });
  };

  this.clear = function()
  {
    clearError();
    var cardList = $hand.piles[name].cards;
    if(cardList.length)
    {
      $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID
           + "/pile/" + name + "/draw/?count=" + cardList.length,
         dataType: "json"
      })
      .done(function(data) {
        updateHand();
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    }
  }

  this.new = function($deck)
  {
    deckID = $deck.id();
    this.clear();
    clearDisplay();
  };

  this.setDeck = function($deck)
  {
    deckID = $deck.id();
  };

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
      showError(c);
    });
  }

  function clearDisplay()
  {
    $("#hand").html("");
  }

  function updateHandDisplay()
  {
    if($hand.success)
    {
      clearDisplay();
      var cardList = $hand.piles[name].cards;

      cardList.forEach(function(card)
      {
        $("#hand").append("<img src='"+ card.image
                        + "' alt='" + card.value + " of " + card.suit + "'/>");
      });
    }
    else {
      showError($hand.error);
    }
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
