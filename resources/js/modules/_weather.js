// Docs at http://simpleweatherjs.com

function loadWeather(location, woeid) {
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather) {
			html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
			html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
			html += '<li class="currently">'+weather.currently+'</li>';
			html += '<li>'+weather.alt.temp+'&deg;F</li></ul>';

			$("#weather").html(html);
		},
		error: function(error) {
			$("#weather").html('<p class="error">'+error+'</p>');
		}
	});
}
