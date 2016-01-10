var config = {
	"location": "Hamburg",
	"woeid": 2345484,
	"timeFormat": 24, // 12 or 24 hour time
	"greeting": "Hello"
};
// Docs at http://simpleweatherjs.com

function loadWeather(location, woeid) {
	var day = '';

	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather) {
			html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
			html += '<ul class="forecast-today">';
			html += '<li>'+weather.city+'</li>';
			html += '<li>'+weather.currently+'</li>';
			html += '<li>'+weather.alt.temp+'&deg;F</li>';
			html += '</ul>';

			for(var i=1;i<weather.forecast.length;i++) {
				if(i===1) {
					day = "Tomorrow";
				} else {
					day = weather.forecast[i].day;
				}

				html += '<ul class="small forecast-week">';
				html += '<li>'+day+': '+weather.forecast[i].high+'&deg;'+weather.units.temp+'</li>';
				html += '</ul>';
			}

			$("#weather").html(html);
		},
		error: function(error) {
			$("#weather").html('<p class="error">'+error+'</p>');
		}
	});
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
	loadWeather(config.location, config.woeid); // (location, woeid)

	datetime(); // load time and date using MomentJS
	setInterval(datetime, 1000); // update time and date each second
});
