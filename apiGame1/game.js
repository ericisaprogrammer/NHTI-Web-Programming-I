function Game()
{
  var version = " v1.0";

  function setStatus(msg)
  {
    $("#app>footer").text(msg);
  }

  this.start = function()
  {
    var deck = new Deck();
    deck.new();

    $("#newDeck").click( function() {
      showCount(deck);
    });

    $("#dealCard").click( function() {
      deck.draw();
    });

    $("#clearHand").click( function() {
      alert("Clear Hand was pressed");
    });

    $("#shuffleDeck").click( function() {
      alert("Shuffle Deck was pressed");
    });

    $("#app>header").append(version);
    setStatus("Ready");
  };

  function showCount(deck)
  {
    $("#deckCount").text(deck.count);
  }
} //End of Game

  //Ready function for JQuery; starts app
$(function() {
  window.app = new Game();
  window.app.start();
});
