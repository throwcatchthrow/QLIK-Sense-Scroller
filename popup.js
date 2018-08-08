function initialize(){

	chrome.storage.sync.get(['qlik_scrolling'], function(data) {
	if (data.qlik_scrolling == null) {
		chrome.storage.sync.set({'qlik_scrolling':false}, function(){
			console.log('Default Scrolling to False')
		});
	} else {
		if (data.qlik_scrolling){
			document.getElementById('toggle').innerText = 'Pause Scrolling';
			document.getElementById('toggle').style.background='#4CAF50';
		} else {
			document.getElementById('toggle').innerText = 'Start Scrolling';
			document.getElementById('toggle').style.background='#f44336';
		}
		
	}

}



function SetRefresh_Click(){
  
}

function Toggle_Click(){

}