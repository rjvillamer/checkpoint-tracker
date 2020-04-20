 var map;
      var markers = [];
      var infoWindow;
      var locationSelect;
	  
        function initMap() {
			
			var styledMapType = new google.maps.StyledMapType([
				  {
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#ebe3cd"
					  }
					]
				  },
				  {
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#523735"
					  }
					]
				  },
				  {
					"elementType": "labels.text.stroke",
					"stylers": [
					  {
						"color": "#f5f1e6"
					  }
					]
				  },
				  {
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
					  {
						"color": "#c9b2a6"
					  }
					]
				  },
				  {
					"featureType": "administrative.land_parcel",
					"elementType": "geometry.stroke",
					"stylers": [
					  {
						"color": "#dcd2be"
					  }
					]
				  },
				  {
					"featureType": "administrative.land_parcel",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#ae9e90"
					  }
					]
				  },
				  {
					"featureType": "landscape.natural",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#dfd2ae"
					  }
					]
				  },
				  {
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#dfd2ae"
					  }
					]
				  },
				  {
					"featureType": "poi",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#93817c"
					  }
					]
				  },
				  {
					"featureType": "poi.park",
					"elementType": "geometry.fill",
					"stylers": [
					  {
						"color": "#a5b076"
					  }
					]
				  },
				  {
					"featureType": "poi.park",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#447530"
					  }
					]
				  },
				  {
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#f5f1e6"
					  }
					]
				  },
				  {
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#fdfcf8"
					  }
					]
				  },
				  {
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#f8c967"
					  }
					]
				  },
				  {
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
					  {
						"color": "#e9bc62"
					  }
					]
				  },
				  {
					"featureType": "road.highway.controlled_access",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#e98d58"
					  }
					]
				  },
				  {
					"featureType": "road.highway.controlled_access",
					"elementType": "geometry.stroke",
					"stylers": [
					  {
						"color": "#db8555"
					  }
					]
				  },
				  {
					"featureType": "road.local",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#806b63"
					  }
					]
				  },
				  {
					"featureType": "transit.line",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#dfd2ae"
					  }
					]
				  },
				  {
					"featureType": "transit.line",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#8f7d77"
					  }
					]
				  },
				  {
					"featureType": "transit.line",
					"elementType": "labels.text.stroke",
					"stylers": [
					  {
						"color": "#ebe3cd"
					  }
					]
				  },
				  {
					"featureType": "transit.station",
					"elementType": "geometry",
					"stylers": [
					  {
						"color": "#dfd2ae"
					  }
					]
				  },
				  {
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
					  {
						"color": "#b9d3c2"
					  }
					]
				  },
				  {
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [
					  {
						"color": "#92998d"
					  }
					]
				  }
				],
				{name: 'Styled Map'})
			
          var ncr = {
			  lat: 14.408133, 
			  lng: 121.041466
			  };
          map = new google.maps.Map(document.getElementById('map'), {
            center: ncr,
            zoom: 6,
            //mapTypeId: 'roadmap',
			mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
          });
		  infoWindow = new google.maps.InfoWindow();
		  searchStores();
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        }
		
		
		
		function showStoreMarkers(checkpoints){
			var bounds = new google.maps.LatLngBounds();
			checkpoints.forEach(function(checkpoint, index){
				var latlng = new google.maps.LatLng(
                  checkpoint.lat,
                  checkpoint.lng);
				  
				  var district = checkpoint.district;
				  var locationchk = checkpoint.location;
				  var city = checkpoint.city
				  createMarker(latlng, district, locationchk, index, city)
				  bounds.extend(latlng);
			})
			map.fitBounds(bounds)
		}
		
		function createMarker(latlng, district, locationchk, index, city){
		var html = "<b>" + district + "</b> <br/>" + locationchk + "<br/>" + "<a href='https://maps.google.com/?q=" + latlng + "' target=_blank>" + "View on Google Maps" + "</a>";
		
/* 		var html = `
		<div class="shadow">
		  <div class="container">
		  <b>${district}</b><br/>
		  ${locationchk}<br/>
		  <a href='https://maps.google.com/?q='${latlng}' target=_blank>View on Google Maps</a>
		  
		  </div>
		</div>
		
		` */

		var marker = new google.maps.Marker({
            map: map,
            position: latlng,
			//label: `${index+1}`,
			title: city,
			icon: "\coronavirus.png",
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          });
          markers.push(marker);
		}
		
		function displayStores(checkpoints){
			var checkpointsHTML = '';
			
			checkpoints.forEach(function(checkpoint, index){
				var city = checkpoint.city;
				var locationchk = checkpoint.location;
				checkpointsHTML +=`
			<div class="store-container">
				<div class="store-container-background">
						<div class="store-info-container">
							<div class="store-address">
								<span>${city}</span>
							</div>
							<div class="store-phone-number">
							${locationchk}
							</div>
						</div>
					<div class="store-number-container">
						<div class="store-number">
						${index+1}
						</div>
					</div>
				</div>
			</div>				
				
				`
			});
			
			document.querySelector('.stores-list').innerHTML = checkpointsHTML;
			
			
		}
		
		
		function setOnClickListener(){
			var storeElements = document.querySelectorAll('.store-container');
			storeElements.forEach(function(elem, index){
				elem.addEventListener('click', function(){
					
					new google.maps.event.trigger(markers[index], 'click')
				})
			})
		}
		
		
		function searchStores(){
			var foundStores = [];
			var city = document.getElementById("zip-code-input").value
			
			if(city){
				checkpoints.forEach(function(checkpoint, index){
					
					var syudad = checkpoint.city;
					var cityulit = syudad.replace(' CITY','');//.substring(0, -4);
					
					console.log(cityulit)
					
					if(cityulit == city){
						foundStores.push(checkpoint);
					}
					
				})
				
			}
			
			else{
				
				foundStores = checkpoints;
			}
			clearLocations();
			displayStores(foundStores);
			showStoreMarkers(foundStores);
			setOnClickListener();
			
		}
		
		 function clearLocations() {
         infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;
       }