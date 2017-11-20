function WeatherWidget($widget)
{
  this.update = function()
  {
    $(".results", $widget).hide();
    $(".loading", $widget).show();
    getLocation();
    getCurrentWeather();
  };

  function getWeatherReport(lat, lon) {
    var coords = lat + "," + lon;
    $.ajax({
      url: "https://api.weather.gov/points/" + coords + "/forecast",
      dataType: "json"
    })
    .done(function(data) {
      populateWeather(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      showError(errorThrown);
    });
  }

  function populateWeather(data)
  {
    var observation = data.properties.periods[0];

    $(".results header img", $widget)
      .attr("src", observation.icon);
    $(".location>span", $widget)
      .text(observation.name);

    $(".conditions>span").each(function(i, e)
    {
      var $span = $(this);
      var field = $span.data("field");
      $(this).text(observation[field]);
    });

    $(".loading", $widget).fadeOut(function() {
      $(".results", $widget).fadeIn();
    });
  }

  function getLocation()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        function(position)
        {
          $("#latitude").val(position.coords.latitude);
          $("#longitude").val(position.coords.longitude);
        },
        function(error)
        {
          $("#controls .error")
            .text("ERROR: " + error.message)
            .slideDown();
        });
    }
  }

  function getCurrentWeather()
  {
    var lat = $("#latitude").val();
    var lon = $("#longitude").val();
    if(lat && lon)
    {
      $(".error", $widget).hide();
      getWeatherReport(lat, lon);
    }
    else {
      $(".loading", $widget).hide();
      $(".error", $widget).show();
      $(".error>span", $widget).text("Error getting location. Please make sure location in your browser is enabled and refresh.");
    }
  }
}
