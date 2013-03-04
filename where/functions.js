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

function renderElements() {
    // Marker on me
    var marker_me = new google.maps.Marker({
                position: me,
                title: "Me"
            });
    marker_me.setMap(map);

    // InfoWindow for me
    var infowindow = new google.maps.InfoWindow();
    var myMessage = "You are at: " + myLat + ", " + myLng;
    console.log(myMessage);
    google.maps.event.addListener(marker_me, 'click', function() {
        infowindow.setContent(myMessage);
        infowindow.open(map, marker_me);
    });
}

function run() {
    var schedule = fetch("http://mbtamap-cedar.herokuapp.com/mapper/redline.json");
    var locations = fetch("http://messagehub.herokuapp.com/a3.json");
    createMap();
    getLocation();    
}
