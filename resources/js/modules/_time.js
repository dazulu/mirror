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