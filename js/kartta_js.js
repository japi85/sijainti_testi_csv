/////////////////////////////////////////////////////////////////
var alkulat = 61.687399;
var alkulng = 27.271272;

var lat = alkulat;
var lng = alkulng;

lat = lat.toFixed(6); //siistitään 6 desimaalia näkyviin
lng = lng.toFixed(6); //siistitään 6 desimaalia näkyviin

var kartta;
function initMap() {
  kartta = new google.maps.Map(document.getElementById('kartta'), {
    center: {lat:61.687399, lng:27.271272 },  //kartan keskitys koordinaatteihin
    disableDefaultUI: true, //käyttöliittymä napit pois
    zoom: 14, //zoomitaso
    mapTypeId:google.maps.MapTypeId.HYBRID //karttatyyppi
  });
//////////////////////////////////////////////////////////////////////////////
//csv osio
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "otto.csv",
        dataType: "text",
        success: function(data) {lueData(data);}
     });
});

function lueData(tekstit) {
    var kaikkirivit = tekstit.split(/\r\n|\n/);
    var otsikkorivi = kaikkirivit[0].split(';');
    var rivit = [];

    for (var i=1; i<kaikkirivit.length; i++) {
        var data = kaikkirivit[i].split(';');
        if (data.length == otsikkorivi.length) {

            var arr = [];
            for (var j=0; j<otsikkorivi.length; j++) {
                arr.push(data[j]);
            }
            rivit.push(arr);
        }
    }
                  
     for (i=0; i<rivit.length; i++) {
         
         var lat = []; 
         lat[i] = rivit[i][9];
         var lon = []; 
         lon[i] = rivit[i][10];
         
       
        var myLatlng = new google.maps.LatLng(lat[i],lon[i]); 
        var marker = new google.maps.Marker({
        position: myLatlng,
        map: kartta,
        draggable:false,
        title:rivit[i][6] 

        });


     }

     
}
/////////////////////////////////////////////////////////////////////////////
  var myLatlng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
	zoom: 14,
	center: myLatlng
};
var kartta = new google.maps.Map(document.getElementById("kartta"), mapOptions);

// Markkeri
var marker1 = new google.maps.Marker({
    position: myLatlng,
    map: kartta,
    draggable:true,
    title:"Drag me!"


});


  
//ensimmäinen sisältö info-ikkunaan
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<div id="bodyContent">'+ "Vedä/pudota nähdäksesi koordinaatit <br/>"+
	  "lat:"+  lat + " , " +"lon:" + +lng +
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
//päivitetään markkeri
google.maps.event.addListener(marker1, 'dragend', function (event) {
    lat = marker1.getPosition().lat();
    lng = marker1.getPosition().lng();
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<div id="bodyContent">'+ "Vedä/pudota nähdäksesi koordinaatit <br/>"+
        "lat:"+ lat.toFixed(6) + ', ' + "lon:" +
         lng.toFixed(6) +
        '</div>'+
        '</div>';
    infowindow.setContent(contentString); //uudet tiedot info-ikkunaan
  });
  
  google.maps.event.addListener(marker1, 'click', function (event) {
    lat = marker1.getPosition().lat();
    lng = marker1.getPosition().lng();
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<div id="bodyContent">'+ "Vedä/pudota nähdäksesi koordinaatit <br/>"+
        "lat:"+ lat.toFixed(6) + ', ' +"lon:" +
         lng.toFixed(6) +
        '</div>'+
        '</div>';
    infowindow.setContent(contentString); //uudet tiedot info-ikkunaan
    infowindow.open(kartta, marker1);
  });
  
infowindow.open(kartta, marker1);

$( "#nappipois" ).click(function() {
  

    marker1.setVisible(false); 
    infowindow.close(kartta, marker1);

         
  
});

$( "#nappinayta" ).click(function() {
  

    marker1.setVisible(true); 
    infowindow.open(kartta, marker1);

         
  
});
}




