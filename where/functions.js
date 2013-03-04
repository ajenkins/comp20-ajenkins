function fetch(url) {
    var request;
    try {
      request = new XMLHttpRequest();
    }
    catch (ms1) {
      try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (ms2) {
        try {
          request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (ex) {
          request = null;
        }
      }
    }
    if (request == null) {
      alert("Error creating request object --Ajax not supported?");
      return;
    }
    
    var str;
    try {
        request.onreadystatechange = function() {
            if ((request.readyState == 4) && (request.status == 200)) {
                str = request.responseText;
            }
        }
        request.open("GET",url,false);
        request.send();
    }
    catch (error) {
        console.log("Could not complete request");
    }
    try {
        return JSON.parse(str);
    }
    catch (error) {
        console.log("Could not parse string");
        return null;
    }
}

function createMap() {
    myLat = 42.358056;
    myLng = -71.063611;
    me = new google.maps.LatLng(myLat, myLng);
    myOptions = {
                zoom: 11,
                center: me,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function updateLocation() {
    me = new google.maps.LatLng(myLat,myLng);
    map.panTo(me);
    map.setZoom(13);
}

function getLocation() {
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            updateLocation();
            renderElements();
        });
    }
    else {
        alert("Geolocation is not supported by your web browser.");
    }
}

function redLine() {
    var stations = new Object();
    stations.alewife = new google.maps.LatLng(42.395428, -71.142483);
    stations.davis = new google.maps.LatLng(42.39674, -71.121815);
    stations.porter = new google.maps.LatLng(42.3884, -71.119149);
    stations.harvard = new google.maps.LatLng(42.373362, -71.118956);
    stations.central = new google.maps.LatLng(42.365486, -71.103802);
    stations.kendall = new google.maps.LatLng(42.36249079, -71.08617653);
    stations.charles = new google.maps.LatLng(42.361166, -71.070628);
    stations.park = new google.maps.LatLng(42.35639457, -71.0624242);
    stations.downtown = new google.maps.LatLng(42.355518, -71.060225);
    stations.south = new google.maps.LatLng(42.352271, -71.055242);
    stations.broadway = new google.maps.LatLng(42.342622, -71.056967);
    stations.andrew = new google.maps.LatLng(42.330154, -71.057655);
    stations.jfk = new google.maps.LatLng(42.320685, -71.052391);
    stations.savin = new google.maps.LatLng(42.31129, -71.053331);
    stations.fields = new google.maps.LatLng(42.300093, -71.061667);
    stations.shawmut = new google.maps.LatLng(42.29312583, -71.06573796);
    stations.ashmont = new google.maps.LatLng(42.284652, -71.064489);
    stations.nquincy = new google.maps.LatLng(42.275275, -71.029583);
    stations.wollaston = new google.maps.LatLng(42.2665139, -71.0203369);
    stations.quincyc = new google.maps.LatLng(42.251809, -71.005409);
    stations.quincya = new google.maps.LatLng(42.233391, -71.007153);
    stations.braintree = new google.maps.LatLng(42.2078543, -71.0011385);
    return stations;
}

function renderElements() {
    // Marker on me
    var marker_me = new google.maps.Marker({
                position: me,
                title: "Me",
            });
    marker_me.setMap(map);

    // InfoWindow for me
    var infowindow = new google.maps.InfoWindow();
    var myMessage = "You are at: " + myLat + ", " + myLng;
    google.maps.event.addListener(marker_me, 'click', function() {
        infowindow.setContent(myMessage);
        infowindow.open(map, marker_me);
    });

    // Render red line T-stops
    station_obj = redLine();
    for (var key in station_obj) {
        var station = new google.maps.Marker({
            position: station_obj[key],
            map: map,
            title: key,
            icon: "t_icon.gif"
        });
        attachMessage(station, key);
    }

    // Render polyline connecting red line
    station_array = obj_to_array(station_obj);
    var rline = new google.maps.Polyline({
        path: station_array,
        map: map,
        strokeColor: 'red'
    });
}

function obj_to_array (obj) {
    var arr = new Array();
    for (var key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

function attachMessage(marker, message) {
     var infowindow = new google.maps.InfoWindow({
         content: message
     });

     google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(marker.get('map'), marker);
     });
}

function run() {
    var schedule = fetch("http://mbtamap-cedar.herokuapp.com/mapper/redline.json");
    var locations = fetch("http://messagehub.herokuapp.com/a3.json");
    createMap();
    getLocation();    
}
