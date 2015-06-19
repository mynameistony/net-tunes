function setTrackId(newId){
	document.getElementById("trackid").value = newId;
}

function play(){
	var player = document.getElementById("player");
	var button = document.getElementById("playButton");
	if(player.paused){
		player.play();
		button.innerHTML = "Pause";
	}
	else{
		player.pause();
		button.innerHTML = "Play";
	}

}

function setSong(songId){
	var url = "/?trackid=" + songId;

	window.location = url;

}

function checkEnded(){
	var player = document.getElementById("player");
	if (player.ended){
		link = "/?trackid=" + newId;
		var currId = document.getElementById("thisid").innerHTML;
		var newId = parseInt(currId) + 1;
		window.location = link;
	}

}

function setTitle(newTitle){
	document.getElementById("title").innerHTML = newTitle;
}