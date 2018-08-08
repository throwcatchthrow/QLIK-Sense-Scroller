// Variable to determine if the scrolling is down 
// forward in sheet order or backwards
var direction_forward = true;

var refresh_rate;
var execute_scroll;

// Initializes refresh/scroll rates and defaults if no value is found
chrome.storage.sync.get(['qlik_scrolling'], function(data) {
	if (data.qlik_scrolling == null) {
		chrome.storage.sync.set({'qlik_scrolling':false}, function(){
			console.log('Default Scrolling to False');
			execute_scroll = false;
		});
	} else {
		console.log('Scrolling: ' + data.qlik_scrolling);
		execute_scroll = data.qlik_scrolling;
	}
	
});
chrome.storage.sync.get(['qlik_refresh_interval'], function(data) {
	if (data.qlik_refresh_interval == null) {
		chrome.storage.sync.set({'qlik_refresh_interval':60}, function(){
			console.log('Default Inverval to 60 Seconds');
			refresh_rate = 60*1000;
		});
	} else {
		refresh_rate = data.qlik_refresh_interval * 1000
		console.log('Refresh Setting: ' + refresh_rate)
	}
	
});

// Handles the Looping Interval

function periodicall(){

	// Creates variables for the previous and next buttons in QLIK Sense
	var nxt = document.querySelector("button[tid='btnQuickNavNext']");
	var prv = document.querySelector("button[tid='btnQuickNavPrevious']");
 	if ((nxt != null)||(prv != null)){

		// Handles the On/Off Parameter
		chrome.storage.sync.get(['qlik_scrolling'], function(data) {
			if (data.qlik_scrolling == null) {
				chrome.storage.sync.set({'qlik_scrolling':false}, function(){
					execute_scroll = false;
				});
			} else {
				execute_scroll = data.qlik_scrolling
			}
			
		});
		
		if((document.getElementById("show-service-popup-dialog")!=null)) {	
			location.reload();
		}
		// Checks if scroll should be currently executing
		else if (execute_scroll) {

			// Validates scrolling direction and when it should be reversed
			if ((direction_forward && nxt.disabled)||(!direction_forward && prv.disabled)) {
				direction_forward = !(direction_forward);
			}

			// Based on direction, pushes element forward or backward.
			if (direction_forward) {
				MouseEventSequence(nxt);
				console.log("Move Forward");
			} else {
				MouseEventSequence(prv);
				console.log("Move Backward");
			}
		} else{
			console.log("Scrolling Is Paused.")
		}
	}
	else {
		console.log("Next/Previous Button Could Not Be Found");
	}

	// Checks if Timeout timer has changed

	setTimeout(periodicall, refresh_rate);
	chrome.storage.sync.get(['qlik_refresh_interval'], function(data) {
		if (data.qlik_refresh_interval == null) {
			chrome.storage.sync.set({'qlik_refresh_interval':60}, function(){
				console.log('Default Inverval to 60 Seconds');
				refresh_rate = 60*1000;
			});
		} else {
			refresh_rate = data.qlik_refresh_interval * 1000
			console.log('Refresh Setting: ' + refresh_rate)
		}
	
	});
};

periodicall();




// Handles the Mouse Event Sequence
var MouseEventSequence = function(element) {
	dispatchMouseEvent(element, 'mouseover', true, true);
	dispatchMouseEvent(element, 'mousedown', true, true);
	dispatchMouseEvent(element, 'click', true, true);
	dispatchMouseEvent(element, 'mouseup', true, true);
}


// Handle the Mouse Event Creation and Dispatch
var dispatchMouseEvent = function(target, var_args) {
	var e = document.createEvent("MouseEvents");
	// If you need clientX, clientY, etc., you can call
	// initMouseEvent instead of initEvent
	e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	target.dispatchEvent(e);
};

