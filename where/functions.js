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

function redLineKeys() {
    var stations = new Object();
    stations["RALEN"] = "alewife";
    stations["RDAVN"] = "davis";
    stations["RDAVS"] = "davis";
    stations["RPORN"] = "porter";
    stations["RPORS"] = "porter";
    stations["RHARN"] = "harvard";
    stations["RHARS"] = "harvard";
    stations["RCENN"] = "central";
    stations["RCENS"] = "central";
    stations["RKENN"] = "kendall";
    stations["RKENS"] = "kendall";
    stations["RMGHN"] = "charles";
    stations["RMGHS"] = "charles";
    stations["RPRKN"] = "park";
    stations["RPRKS"] = "park";
    stations["RDTCN"] = "downtown";
    stations["RDTCS"] = "downtown";
    stations["RSOUN"] = "south";
    stations["RSOUS"] = "south";
    stations["RBRON"] = "broadway";
    stations["RBROS"] = "broadway";
    stations["RANDN"] = "andrew";
    stations["RANDS"] = "andrew";
    stations["RJFKN"] = "jfk";
    stations["RJFKS"] = "jfk";
    stations["RSAVN"] = "savin";
    stations["RSAVS"] = "savin";
    stations["RFIEN"] = "fields";
    stations["RFIES"] = "fields";
    stations["RSHAN"] = "shawmut";
    stations["RSHAS"] = "shawmut";
    stations["RASHS"] = "ashmont";
    stations["RNQUN"] = "nquincy";
    stations["RNQUS"] = "nquincy";
    stations["RWOLN"] = "wollaston";
    stations["RWOLS"] = "wollaston";
    stations["RQUCN"] = "quincyc";
    stations["RQUCS"] = "quincyc";
    stations["RQUAN"] = "quincya";
    stations["RQUAS"] = "quincya";
    stations["RBRAS"] = "braintree";
    return stations;
}

function redLineCodes() {
    var stations = new Object();
    stations.alewife = ["RALEN"];
    stations.davis = ["RDAVN", "RDAVS"];
    stations.porter = ["RPORN", "RPORS"];
    stations.harvard = ["RHARN", "RHARS"];
    stations.central = ["RCENN", "RCENS"];
    stations.kendall = ["RKENN", "RKENS"];
    stations.charles = ["RMGHN", "RMGHS"];
    stations.park = ["RPRKN", "RPRKS"];
    stations.downtown = ["RDTCN", "RDTCS"];
    stations.south = ["RSOUN", "RSOUS"];
    stations.broadway = ["RBRON", "RBROS"];
    stations.andrew = ["RANDN", "RANDS"];
    stations.jfk = ["RJFKN", "RJFKS"];
    stations.savin = ["RSAVN", "RSAVS"];
    stations.fields = ["RFIEN", "RFIES"];
    stations.shawmut = ["RSHAN", "RSHAS"];
    stations.ashmont = ["RASHS"];
    stations.nquincy = ["RNQUN", "RNQUS"];
    stations.wollaston = ["RWOLN", "RWOLS"];
    stations.quincyc = ["RQUCN", "RQUCS"];
    stations.quincya = ["RQUAN", "RQUAS"];
    stations.braintree = ["RBRAS"];
    return stations;
}

// Returns the messages for every station
function buildSchedules() {
    var stations = new Object();
    
    for (var i = 0; i < schedule.length; i++) {
        var code = schedule[i].PlatformKey;
        var key = station_keys[code];
        var direction = code.substring(4,5);
        var message = direction + ": Arriving in " + schedule[i].TimeRemaining + " minutes";
        stations[key] += "<p>" + message + "</p>";
    }
    for (var key in stations) {
        stations[key] = stations[key].substring(9);
    }
    return stations;
}

function renderElements() {
    // Marker on me
    var marker_me = new google.maps.Marker({
                position: me,
                title: "Me",
            });
    marker_me.setMap(map);

    

    // Render red line T-stops marker and window
    station_obj = redLine();
    station_codes = redLineCodes();
    station_keys = redLineKeys();
    schedule_obj = buildSchedules();
    for (var key in station_obj) {
        var station = new google.maps.Marker({
            position: station_obj[key],
            map: map,
            title: key,
            icon: "t_icon.gif"
        });
        attachMessage(station, key + schedule_obj[key]);

    }

    // Render polyline connecting red line
    station_array = obj_to_array(station_obj);
    var rline = new google.maps.Polyline({
        path: station_array,
        map: map,
        strokeColor: 'red'
    });
    
    // InfoWindow for me
    var infowindow = new google.maps.InfoWindow();
    var myPosMessage = "You are at: " + myLat + "\u00B0 N, " + myLng + "\u00B0 E";
    var closestToMe = nearestStation(me);
    var closestName = closestToMe[0];
    var closestDistance = closestToMe[1] / 1609.34;
    var closestToMeMessage = "You are closest to " + closestName + ". It is " +
                                closestDistance + " miles away.";
    var myMessage = myPosMessage + " . " + closestToMeMessage;
    google.maps.event.addListener(marker_me, 'click', function() {
        infowindow.setContent(myMessage);
        infowindow.open(map, marker_me);
    });

}

function nearestStation(loc) {
    var shortestDistance = google.maps.geometry.spherical.computeDistanceBetween(loc,station_obj.alewife);
    var closestStation = 'alewife';
    for (var key in station_obj) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(loc,station_obj[key]);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestStation = key;
        }
    }
    return [closestStation, shortestDistance];
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
    schedule = fetch("http://mbtamap-cedar.herokuapp.com/mapper/redline.json");
    locations = fetch("http://messagehub.herokuapp.com/a3.json");
    createMap();
    getLocation();    
}
