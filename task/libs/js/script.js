$(document).ready(() => {
	// -------------------------------------- 1st API --------------------------------------
	$('#getTimezone').on('click', function (e) {
		e.preventDefault();
	
		const lat = $('#lat').val();
		const lng = $('#lng').val();
	
		if (!lat || !lng) {
		alert("Please enter both latitude and longitude.");
		return;
		}
	
		$.ajax({
		url: 'libs/php/getTimezone.php',
		method: 'GET',
		data: { lat: lat, lng: lng },
		dataType: 'json',
		success: function (data) {
			if (data.timezoneId) {
			$('#timezoneResult').html(`
				<strong>Country:</strong> ${data.countryName} (${data.countryCode})<br>
				<strong>Timezone:</strong> ${data.timezoneId}<br>
				<strong>Local Time:</strong> ${data.time}<br>
				<strong>Sunrise:</strong> ${data.sunrise}<br>
				<strong>Sunset:</strong> ${data.sunset}
			`);
			} else if (data.error) {
			$('#timezoneResult').html(`<p class="text-danger">${data.error}</p>`);
			} else {
			$('#timezoneResult').html('<p class="text-danger">No timezone data found.</p>');
			}
		},
		error: function (xhr, status, error) {
			console.error("AJAX Error:", status, error);
			console.error("Response:", xhr.responseText);
			$('#timezoneResult').html('<p class="text-danger">Failed to fetch timezone data.</p>');
		}
		});
	});
	   
	
	// -------------------------------------- 1st API --------------------------------------
	$('#getRegions').on('click', function (e) {
		e.preventDefault();
		const countries = {
			"GB": 2635167,
			"FR": 3017382,
			"DE": 2921044,
			"IT": 3175395
		}
	
		const country = $('#country').val();
		if (!country) {
		  alert("Please select a country.");
		  return;
		}
	
		$.ajax({
		  url: 'libs/php/getCountryRegions.php',
		  method: 'GET',
		  data: {
			geonameId: countries[country],
		  },
		  dataType: 'json',
		  success: function (data) {
			if (data && data.geonames && data.geonames.length > 0) {
			  let regionList = '<ul class="list-group">';
			  data.geonames.forEach(region => {
				regionList += `<li class="list-group-item">${region.name}</li>`;
			  });
			  regionList += '</ul>';
		  
			  $('#regionResult').html(regionList);
			} else {
			  $('#regionResult').html('<p class="text-danger">No region data found.</p>');
			}
		  },
		  error: function (e) {
			console.log(JSON.stringify(e));
			$('#regionResult').html('<p class="text-danger">Failed to fetch region data.</p>');
		  }
		});
	})
		
});