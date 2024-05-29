function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.round((Math.random() * (maxFloored - minCeiled) + minCeiled)*1000000)/1000000; // The maximum is exclusive and the minimum is inclusive
  }

function getlocation() {
    /*const xmlreq = new XMLHttpRequest();
    xmlreq.open('GET', 'https://api.3geonames.org/?randomland=yes')
    xmlreq.onload = ()=> {
        consolexmlreq.responseXML
    }*/
    var lat = getRandomInt(-180,180)
    var long = getRandomInt(-180,180)
    lat = 42.345573
    long = -71.098326
}
//Not my function - this is to calculate distance between 2 points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}
let panorama;
let guesslocation
async function startmap(answer, zoom, latLng) {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("guessMap"), {
      center: { lat: 0, lng: 0 },
      zoom: zoom,
      mapId: "4504f8b37365c3d0",
    });
    const pinBackground = new PinElement({
        background: "#00FF00",
        scale: 2
      });
    if (answer == false) {
        const draggableMarker = new AdvancedMarkerElement({
            map,
            position: { lat: 0, lng: 0 },
            gmpDraggable: true,
            title: "Guess wisely!",
            
          });
        draggableMarker.addListener("dragend", (event) => {
        guesslocation = draggableMarker.position;

        });
    }
    
    if (answer==true) {
        const answerMarker = new AdvancedMarkerElement({
            map,
            position: latLng,
            gmpDraggable: false,
            title: "Guess wisely!",
            content: pinBackground.element,
          });

        const guessMarker = new AdvancedMarkerElement({
            map,
            position: { lat: guesslocation.lat, lng: guesslocation.lng },
            gmpDraggable: false,
            title: "Guess wisely!",
          });
    }
    

    
    
  }

let selectedLocation;
function initialize() {
    startmap(false, 2.9)  
    let testlat
    let testlong
    function checklatlong () {
        var streetViewService = new google.maps.StreetViewService();
        testlat = getRandomInt(-90,90)
        testlong = getRandomInt(-180,180)
        var latlng = new google.maps.LatLng(testlat, testlong)
        streetViewService.getPanoramaByLocation( latlng, 50000, getresponse)
    }
    function getresponse (data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
            if (data.copyright.includes('Google')) {
                sendmap(data.location.latLng)
                selectedLocation = data.location.latLng
            } else {
                checklatlong()
            }
        } else {
            checklatlong()
        }
    
    }
    checklatlong()
    function sendmap(position) {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("streetview"),
            {
                position: position,
                pov: {
                    heading: 34,
                    pitch: 10,
                },
            }
        );
    }}

function submit() {
    startmap(true, 2,selectedLocation)
    var accuracy = getDistanceFromLatLonInKm(selectedLocation.lat(), selectedLocation.lng(), guesslocation.lat, guesslocation.lng)
    console.log(String(guesslocation))
    let displaytxt
    if (accuracy < 1) {
        displaytxt = String(Math.round(accuracy*1000)) + 'm'
    } else {
        displaytxt = String(Math.round(accuracy)) + 'km'
    }
    document.getElementById("nextround").style.visibility = 'visible'
    document.getElementById("submit").innerHTML = displaytxt
}
function nextround() {
    document.getElementById("nextround").style.visibility = 'hidden'
    document.getElementById("submit").innerHTML = 'Submit'
    initialize()
}
window.initialize = initialize;