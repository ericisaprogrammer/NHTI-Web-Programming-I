function Game()
{
  var version = " v1.1";

  function setStatus(msg)
  {
    $("#app>footer").text(msg);
  }

  this.start = function()
  {
    var deck = new Deck();
    var hand = new Hand("hand");
    deck.new();

    $("#newDeck").click( function() {
      deck.new();
      hand.new(deck);
    });

    $("#dealCard").click( function() {
      hand.setDeck(deck);
      deck.draw(hand);
    });

    $("#clearHand").click( function() {
      hand.clear();
    });

    $("#shuffleDeck").click( function() {
      deck.shuffle();
      hand.new(deck);
    });

    $("#app>header").append(version);
    setStatus("Ready");
  };
} //End of Game

  //Ready function for JQuery; starts app
$(function() {
  window.app = new Game();
  window.app.start();
});
