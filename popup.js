
// Handles Initial Data Gathering/Setting
window.onload= function (){

	// Pulls if the scrolling should be currently running or paused
	chrome.storage.sync.get(['qlik_scrolling'], function(data) {

		// If data is null, sets to paused.
		if (data.qlik_scrolling == null) {
			chrome.storage.sync.set({'qlik_scrolling':false}, function(){
				console.log('Default Scrolling to False');
				data.qlik_scrolling = false;
			});
		} 

		// Sets button text color based on paused/running
		if (data.qlik_scrolling){
			document.getElementById('toggle').innerText = 'Pause Scrolling';
			document.getElementById('toggle').style.background='#f44336';
		} else {
			document.getElementById('toggle').innerText = 'Start Scrolling';
			document.getElementById('toggle').style.background='#4CAF50';
		}
	});


	// Pulls current frequency of page change
	chrome.storage.sync.get(['qlik_refresh_interval'], function(data) {

		// If none is found, autoset to 60seconds
		if (data.qlik_refresh_interval == null) {
			chrome.storage.sync.set({'qlik_refresh_interval':60}, function(){
				document.getElementById('txtRefresh').value = 60;
				console.log('Default Refresh Rate to 60');
			});

		// Otherwise, set to 
		} else {
			document.getElementById('txtRefresh').value = data.qlik_refresh_interval;
		}
	});
}

// Add Click Button Listeners

// Button for Rate Update - sets storage value and displays in message panel
document.getElementById("btnRefresh").onclick = function (){
	var refresh_rate =  document.getElementById("txtRefresh").value;

	chrome.storage.sync.set({'qlik_refresh_interval':refresh_rate}, function(){
	document.getElementById('user_message').innerHTML="Sheet change frequency set to " + refresh_rate + " seconds.";
		console.log("Sheet change frequency set to " + refresh_rate);
	});

};

// Button for Toggle Running. Adjusts Visuals of button and then sets value. Also remoes any user message.
document.getElementById("toggle").onclick = function(){

	let now_running = (document.getElementById('toggle').innerText == "Start Scrolling");
	document.getElementById('user_message').innerHTML = now_running;


	chrome.storage.sync.set({'qlik_scrolling':now_running}, function(){
		document.getElementById('user_message').innerHTML = '';

		if (now_running){
			document.getElementById('toggle').innerText = 'Pause Scrolling';
			document.getElementById('toggle').style.background='#f44336';
		} else {
			document.getElementById('toggle').innerText = 'Start Scrolling';
			document.getElementById('toggle').style.background='#4CAF50';
		}
	});
};	