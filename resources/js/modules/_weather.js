// Docs at http://simpleweatherjs.com

function loadWeather() {
	$.simpleWeather({
		location: config.location,
		woeid: config.woeid,
		unit: config.tempUnit,
		success: function(weather) {
			if(config.tempUnit === "c") {
				weather.units.temp = "&deg;C";
				weather.units.altTemp = "&deg;F";
			} else {
				weather.units.temp = "&deg;F";
				weather.units.altTemp = "&deg;C";
			}

			renderWeather(weather);
		},
		error: function(error) {
			$("#weather").html('<p class="error">' + error + '</p>');
		}
	});
}

function renderWeather(weather) {
	html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + weather.units.temp + '</h2>';
	html += '<ul class="forecast-today">';
	html += '<li>' + weather.city + '</li>';
	html += '<li>' + weather.low + ' to ' + weather.high + weather.units.temp + '</li>';
	html += '<li>' + weather.currently + '</li>';

	if (config.showAltTemp) {
		html += '<li>' + weather.alt.temp + weather.units.altTemp + '</li>';
	}

	html += '</ul>';

	if(config.showForecast) {
		renderForecast(weather);
	}

	$("#weather").html(html);
}

function renderForecast(weather) {
	var day, temp;
	
	for(var i=1;i < weather.forecast.length;i++) {
		if(i===1) {
			day = "Tomorrow";
		} else {
			day = weather.forecast[i].day;
		}

		if(weather.forecast[i].low === weather.forecast[i].high) {
			temp = weather.forecast[i].low;
		} else {
			temp = weather.forecast[i].low + ' to ' + weather.forecast[i].high + weather.units.temp;
		}

		html += '<ul class="small forecast-week">';
		html += '<li>' + day + ': ' + temp + '</li>';
		html += '</ul>';
	}
}
