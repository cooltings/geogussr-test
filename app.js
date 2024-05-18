function getlocation() {
    const xmlreq = new XMLHttpRequest();
    xmlreq.open('GET', 'https://api.3geonames.org/?randomland=yes')
    xmlreq.onload = ()=> {
        consolexmlreq.responseXML
    }
}

let panorama;

function initialize() {
    

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("streetview"),
        {
            position: { lat: 42.345573, lng: -71.098326 },
            pov: {
                heading: 34,
                pitch: 10,
            },
        }
    );
}
getlocation()
window.initialize = initialize;