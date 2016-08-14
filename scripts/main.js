$(document).ready(function () {
  var lat, lon, apiURLGeoloc, zip, apiURLZip;

  if ("geolocation" in navigator) {
    $('#geoTemp').click(function () {
       navigator.geolocation.getCurrentPosition(gotLocation);

      function gotLocation(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        apiURLGeoloc = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                  lat + '&lon=' +
                  lon + '&units=imperial&appid=7e3f1ebcbe9e9d741b6a90449b677910';

        $.ajax({
          url : apiURLGeoloc,
          method : 'GET',
          success : function (data) {
            /* openweather API responds with a "cod" parameter.
            If its NOT 200, either the query is invalid or API key is invalid!
            Lazy error handling */
            var good = data.cod;
            if (good != 200) alert("API failed! API key invalid?");

            var tempr = data.main.temp;
            $('#result').text(tempr + '°F');
          }
        });
     }
    });
  } else {
    alert('Your browser doesnt support geolocation.');
  }

  $('#zipTemp').click(function() {
    zip = $("#zip").val();
    apiURLZip = 'http://api.openweathermap.org/data/2.5/weather?zip=' +
              zip + '&units=imperial&appid=7e3f1ebcbe9e9d741b6a90449b677910';

      $.ajax({
        url : apiURLZip,
        method : 'GET',
        success : function (data) {
          /* openweather API responds with a "cod" parameter.
          If its NOT 200, either the query is invalid or API key is invalid!
          Lazy error handling */
          var good = data.cod;
          if (good != 200) alert("API failed! Invalid zip?");

          var tempr = data.main.temp;
          $('#result').text(tempr + '°F');
        }
      });
  });
});
