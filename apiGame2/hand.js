function Hand(newName)
{
  var name = newName;
  var handValue = [];
  var handCode = "";
  //----------------------------------initialization
  displayHand();
  //----------------------------------End initialization

  this.name = function()      { return name;      };
  this.handCode = function()  { return handCode;  };
  this.handValue = function() { return handValue; };

  this.add = function(codeString) {
    handCode += codeString;
    handValue = calculateHand();
    displayHand();
  };

  this.new = function() {
    handCode = "";
    handValue = [];
    displayHand();
  };

  this.showTrue = function() {
    showTrue();
  };

  this.flip = function() {
    flip();
  };

  function showTrue() {
    var valueString = "";
    var back = false;
    var backAce = false;
    var source = $("#" + name + 1).attr("src");
    if(source == "images/back.png") {
      back = true;
      if(handCode.substring(3, 4) == "A") {
        backAce = true;
      }
    }

    if(backAce) {
      if(handCode.substring(0, 1) == "A")
        valueString = "11, 1, ";
      else {
        valueString = (handValue[0] - 11) + ", ";
      }
    }
    else if(back) {
      handValue.forEach(function(value) {
        if(value <= 21)
          valueString += (value - cardValue(handCode.substring(3, 4))) + ", ";
      });
    }
    else {
      handValue.forEach(function(value) {
        if(value <= 21)
          valueString += value + ", ";
      });
    }
    valueString = valueString.substring(0, valueString.length - 2);
    $("#" + name + "Shown").text(valueString);
  }

  /*
  var valueString = "";
  handValue.forEach(function(value) {
    if(value <= 21)
      valueString += value + ", ";
  });
  valueString = valueString.substring(0, valueString.length - 2);
  $("#" + name + "Value").text(valueString);
  */

  function calculateHand() {
    var aceCount = 0;
    var handTotal = 0;
    var handValues = [];
    for(var i = 0; i < handCode.length; i += 3) {
      var face = handCode.substring(i, i + 1);
      handTotal += cardValue(face);
      if(face === "A")
        aceCount++;
    }
    handValues.push(handTotal);
    for(var i = 0; i < aceCount; i++) {
      handTotal -= 10;
      handValues.push(handTotal);
    }
    return handValues;
  }

  function cardValue(face) {
    switch(face) {
      case "1": return 1;
      case "2": return 2;
      case "3": return 3;
      case "4": return 4;
      case "5": return 5;
      case "6": return 6;
      case "7": return 7;
      case "8": return 8;
      case "9": return 9;
      case "A": return 11;
      default: return 10;
    }
  }

  function flip() {
    for(var i = 0; i < handCode.length; i += 3) {
      var source = $("#" + name + (i / 3)).attr("src");
      if(source == "images/back.png") {
        $("#" + name + (i / 3)).attr("src", "https://deckofcardsapi.com/static/img/" + handCode.substring(i, i + 2) + ".png")
      }
    }
  }

  function displayHand()
  {
    var $display = $("#" + name);
    var htmlString = "";
    for(var i = 0; i < handCode.length; i += 3) {
      var cardCode = handCode.substring(i, i + 2);
      var imgURL = "https://deckofcardsapi.com/static/img/" + cardCode + ".png"

      htmlString += "<img id='"+ name + (i / 3) + "' class='cards' src='" + imgURL + "' alt='" + cardCode + "'/>";
    }
    showValues();
    $display.html(htmlString);
    showTrue();
  }

  function showValues() {
    var valueString = "";
    handValue.forEach(function(value) {
      if(value <= 21)
        valueString += value + ", ";
    });
    valueString = valueString.substring(0, valueString.length - 2);
    $("#" + name + "Value").text(valueString);
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
