function Deck(hands)
{
    //-----------------------------------Initialization
    var deckID;
    var $hands = [];
    var cards = "";

    $.when(newDeck())
    .then(function() {
      drawCards(52);
    });
    //-----------------------------------End initialization
    this.hands = function()   { return $hands;   };
    this.id = function()      { return deckID;   };
    this.getDraw = function() { return cards; };
    this.setDraw = function(newCards) {
      cards = newCards;
    };
    this.getHand = function(hand) {
      return $hands[hand];
    };
    this.getHands = function() {
      return $hands;
    };

    this.deal = function (numCards, hand) {
      deal(numCards, hand);
    };

    this.dealTo = function (hand, min) {
      while(true) {
        var values = $hands[hand].handValue();
        for(var i = 1; i <= values.length; i++) {
          if((values[i - 1] >= min && i == values.length) || (values[0] >= min && values[0] <=21))
            return;
          else if(values[i - 1] < min) {
            deal(1, hand);
            break;
          }
        }
      }
    };

    this.new = function(){
      shuffle();
    };

    this.newGame = function() {
      var blackjack = false;
      disableButton($("button"));
      $.when(shuffle())
      .then(function() {
        $.when(drawCards(52))
        .then(function (){
          enableButton($("button"));
          deal(1, "dealer");
          deal(1, "player");
          deal(1, "dealer");
          deal(1, "player");

          $("#dealer1").attr("src", "images/back.png");
          hands.forEach(function(hand) {
            $hands[hand].showTrue();
            if($hands[hand].handValue()[0] === 21) {
              blackjack = true;
              $("#" + hand + "Shown").html("BLACKJACK!")
            }
          });
          if(blackjack) {
            $("#hit, #stay").attr("disabled", true);
            $hands["dealer"].flip();
            calculateWinner();
          }
        });
      });
    };

    function shuffle() {
      clearError();
      return $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID
           + "/shuffle",
        dataType: "json"
      })
      .done(function(data) {
        hands.forEach(function(hand) {
          $hands[hand].new();
        });
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    }

    function deal(numCards, hand) {
      if(numCards * 3 > cards.length){
        var cardsReady = cards.length / 3;
        showError("Not enough cards for full deal. Dealing " + cardsReady
                + " cards instead of requested " + numCards);
        numCards = cardsReady;
      }

      var code = cards.substring(0, numCards * 3);
      cards = cards.substring(numCards * 3);
      $hands[hand].add(code);
    }

    function newDeck() {
      hands.forEach(function(hand) {
        $hands[hand] = new Hand(hand);
      });
      return $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        dataType: "json",
      })
      .done(function(data) {
        deckID = data.deck_id;
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    }

    function drawCards(numCards) {
      clearError();
      return $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + deckID
           + "/draw/?count=" + numCards,
        dataType: "json"
      })
      .done(function(data) {
        draw = data.cards;
        if(data.success) {
          draw.forEach(function(card) {
            cards += card.code + ",";
          });
        }
        else {
          showError(data.error);
        }
      })
      .fail(function(a, b, c) {
        showError(c);
      });
    };

    function toggleButton($button) {
      if($button.attr("disabled") === "disabled")
        $button.attr("disabled", false);
      else
        $button.attr("disabled", true);
    }


    function enableButton($button) {
      $button.attr("disabled", false);
    }

    function disableButton($button) {
      $button.attr("disabled", true);
    }

    function result(res) {
      $("#result").append(res);
    }

    function calculateWinner($hands) {
      var dealerValue = Number($("#dealerValue").text().substring(0, 2));
      var playerValue = Number($("#playerValue").text().substring(0, 2));

      if(dealerValue > playerValue)
        result("Dealer wins");
      else if(playerValue > dealerValue)
        result("Player wins")
      else
        result("Tied game");
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
