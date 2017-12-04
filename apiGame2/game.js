function Game()
{
  var version = " v2.0";

  function setStatus(msg)
  {
    $("#app>footer").text(msg);
  }

  this.start = function()
  {
    var deck = new Deck(["player", "dealer"]);

    $("#newGame").click( function() {
      $("#result").html("");
      deck.newGame();
    });

    $("#hit").click( function() {
      deck.deal(1, "player");
      var handValues = deck.getHand("player").handValue();
      var bust = true;

      handValues.forEach(function(value) {
        if(value <= 21)
          bust = false;
      });

      if(bust) {
        $("#hit, #stay").attr("disabled", true);
        $("#playerShown").text("BUST!");
        deck.getHand("dealer").flip();
        result("Dealer wins");
      }
    });

    $("#stay").click( function() {
      deck.dealTo("dealer", 17);
      var handValues = deck.getHand("dealer").handValue();
      var bust = true;

      handValues.forEach(function(value) {
        if(value <= 21)
          bust = false;
      });
      $("#hit, #stay").attr("disabled", true);

      if(bust) {
        deck.getHand("dealer").flip();
        $("#dealerShown").text("BUST!");
        result("Player wins");
      }
      else {
        deck.getHand("dealer").flip();
        calculateWinner(deck.getHands());
      }
    });

    $("#app>header").append(version);
    setStatus("Ready");
  };
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
} //End of Game

  //Ready function for JQuery; starts app
$(function() {
  window.app = new Game();
  window.app.start();
});
