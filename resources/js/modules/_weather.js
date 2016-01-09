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
