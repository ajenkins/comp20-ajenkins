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
    myLat = 0;
    myLng = 0;
    me = new google.maps.LatLng(myLat, myLng);
    myOptions = {
                zoom: 13, // The larger the zoom number, the bigger the zoom
                center: me,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    console.log("Did I get here?");

}

function run() {
    var schedule = fetch("http://mbtamap-cedar.herokuapp.com/mapper/redline.json");
    var locations = fetch("http://messagehub.herokuapp.com/a3.json");
    createMap();
    
}
