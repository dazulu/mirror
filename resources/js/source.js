@import '_config.js';
@import 'modules/_weather.js';
@import 'modules/_time.js';

$(document).ready(function() {
	if(config.showWeather) {
		loadWeather(); // (location, woeid)
	}

	if(config.showTimeDate) {
		datetime(); // load time and date using MomentJS
		setInterval(datetime, 1000); // update time and date each second
	}
});
