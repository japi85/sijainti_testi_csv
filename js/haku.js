    //haku funktio
      function initAutocomplete() {
        var kartta = new google.maps.Map(document.getElementById('kartta'), {
          center: {lat:61.687399, lng:27.271272 },  //kartan keskitys koordinaatteihin
          disableDefaultUI: true, //käyttöliittymä napit pois
          zoom: 14, //zoomitaso
          mapTypeId:google.maps.MapTypeId.ROADMAP //karttatyyppi
        });

        // hakupalkki
        var input = document.getElementById('haku');
        var hakukentta = new google.maps.places.SearchBox(input);
        kartta.controls[google.maps.ControlPosition.TOP_RIGHT].push(input); //hakupalkin sijainti oikealla ylhäällä

        //rajaus
        kartta.addListener('bounds_changed', function() {
          hakukentta.setBounds(kartta.getBounds());
        });

        var markers = [];
        
        //hakukentän kuuntelija
        hakukentta.addListener('places_changed', function() {
          var places = hakukentta.getPlaces();

          if (places.length == 0) {
            return;
          }

          
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            
            markers.push(new google.maps.Marker({
              map: kartta,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          kartta.fitBounds(bounds);
        });
      }


