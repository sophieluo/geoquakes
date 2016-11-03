// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

  $.ajax({
      method: "GET",
      url: weekly_quakes_endpoint,
      dataType: 'json',
      success: onSuccess,
      error: onError
  });

function onSuccess(json) {
     console.log(json);
  //   for (var i=0;i<json.features.length;i++) {
  //      var quakeTitle = json.features[i].properties.title;
  //      $("#info").append("<p>"+quakeTitle+"</p");
  //  }
   var source= $('#earthquake-li-template').html();
   var template = Handlebars.compile(source);
   var quakeHtml = template({ earthquakes:json.features });
  //  console.log(quakeHtml)
    $("#earthquakes-list").append(quakeHtml);

    var map;
    function initMap() {
    //
      map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44},
      zoom: 3
        });
      for (var i=0;i<json.features.length;i++) {
        var latitude=json.features[i].geometry.coordinates[0]
        var longitude=json.features[i].geometry.coordinates[1]
        var marker = new google.maps.Marker({
           position: { lat: latitude, lng: longitude},
           map: map
         });
        }
       marker.setMap(map);
      }
    initMap();
  }

  function onError(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
  }




});
