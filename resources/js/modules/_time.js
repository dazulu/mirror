// Docs at http://momentjs.com/docs/

function datetime() {
	var target = document.getElementById("datetime");
	var now = moment(); // get MomentJS date-time info
	var html = '';

	html += '<p class="time">' + now.format('H:mm') + '</p>';
	html += '<p class="date">' + now.format('dddd, MMMM Do YYYY') + '</p>'; 

	target.innerHTML = html;
}
