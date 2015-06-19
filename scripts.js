var	prevSong;
var	nextSong;

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
	var url = "/?trackid=";
	if(getCookie("shuffle") === "true"){
		var max = parseInt(document.getElementById("songcount").innerHTML);
		var newId = Math.floor((Math.random() * max)); 
		url += newId; 
	}else{
	 	url += songId;
	}

	window.location = url;

}

function checkEnded(){
	var player = document.getElementById("player");

	if (player.ended){
		
		var currId = document.getElementById("thisid").innerHTML;
		var newId;

		if(getCookie("shuffle") === "true"){
			var max = parseInt(document.getElementById("songcount").innerHTML);
			newId = Math.floor((Math.random() * max)); 
		}
		else{
			newId = parseInt(currId) + 1;
		}

		var link = "/?trackid=" + newId;
		window.location = link;
	}

}

function setTitle(newTitle){
	document.getElementById("title").innerHTML = newTitle;
}

function gotoPage(newPage){
	window.location = newPage;
}

function toggleShuffle(){
	if(getCookie("shuffle") === "true"){
		setCookie("shuffle","false");
		document.getElementById("nextSong").innerHTML = nextSong;
		document.getElementById("prevSong").innerHTML = prevSong;

	}else{
		setCookie("shuffle","true");

		document.getElementById("nextSong").innerHTML = "Next Song: <b>Random</b>";
		document.getElementById("prevSong").innerHTML = "Previous Song: <b>Random</b>";
		//var nextButton = document.getElementById("nextButton");
		//var max = parseInt(document.getElementById("songcount").innerHTML);
		//var newId = Math.floor((Math.random() * max)); 		
		//nextButton.onclick = "setSong()";
		// + newId + ")";
		//document.getElementById("nextSong").innerHTML = "Next Song: Random";
		

	}
	setShuffleButton();
}
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
} 
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 



function setShuffleButton(){
	var button = document.getElementById("shuffleButton");

	if(getCookie("shuffle") === "true"){
		button.innerHTML = "Shuffle is On";

		document.getElementById("nextSong").innerHTML = "Next Song: <b>Random</b>";
		document.getElementById("prevSong").innerHTML = "Previous Song: <b>Random</b>";		
	}
	else{
		button.innerHTML = "Shuffle is Off";
		document.getElementById("nextSong").innerHTML = nextSong;
		document.getElementById("prevSong").innerHTML = prevSong;		
	}
}

function saveNextSong(){
	nextSong = document.getElementById("nextSong").innerHTML;
	prevSong = document.getElementById("prevSong").innerHTML;

}