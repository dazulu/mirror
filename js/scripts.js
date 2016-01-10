var config = {
	"showWeather": true,
	"showAltTemp": true,
	"showForecast": true,
	"showTimeDate": true,
	"location": "Hamburg",
	"woeid": 2345484,
	"tempUnit": "c", // c or f
	"timeFormat": 24, // 12 or 24
};

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

// Docs at http://momentjs.com/docs/

function datetime() {
	var now = moment();
	var target = document.getElementById("datetime");
	var html = '';

	html += '<p class="time">' + now.format(getTimeFormat()) + '</p>';
	html += '<p class="date">' + now.format('dddd, MMMM Do YYYY') + '</p>'; 

	target.innerHTML = html;
}

function getTimeFormat() {
	if(config.timeFormat == 24) {
		return "HH:mm";
	} else {
		return "h:mma";
	}
}

$(document).ready(function() {
	if(config.showWeather) {
		loadWeather(); // (location, woeid)
	}

	if(config.showTimeDate) {
		datetime(); // load time and date using MomentJS
		setInterval(datetime, 1000); // update time and date each second
	}
});
