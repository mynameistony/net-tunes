
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
	try{
		var player = document.getElementById("player");

		if(player.canplay){
			//alert("can play");
		}else{
			//alert("nope");
		}

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
	catch(err){}
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
	try{
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
	catch(err){
		return;
	}	
}

function saveNextSong(){
	try{
		nextSong = document.getElementById("nextSong").innerHTML;
		prevSong = document.getElementById("prevSong").innerHTML;
	}
	catch(err){}
}

function bookmarkSong(){
	var thisid = document.getElementById("thisid").innerHTML;
	var count = getCookie("count");
	for(var i = 1; i <= count; i++){
		checkId = getCookie("id" + i);

		if(checkId == thisid){
			alert("You have already bookmarked this song");
			var foundTitle = getCookie("track" + i);
			var foundArtist = getCookie("artist" + i);

			if(foundArtist == ""){
				alert("It is called \'" + foundTitle + "\' :)");
			}
			else{
				alert("It is called \'" + foundTitle + " by " + foundArtist + "\' :)");
			}
			return;
		}

	}

	var thisLink = "/?trackid=" + thisid; 
	
	count++;
	var thisTrack = document.getElementById("thisTrack").innerHTML;
	var thisArtist = document.getElementById("thisArtist").innerHTML;
	var thisIdCookie = "id" + count;
	var thisTrackCookie = "track" + count;
	var thisArtistCookie = "artist" + count;
	var thisLinkCookie = "link" + count;

	var bookmarkTitle = prompt("Enter bookmark title",thisTrack + " by " + thisArtist);

	if(bookmarkTitle != null){
		setCookie(thisTrackCookie,bookmarkTitle);
		setCookie(thisArtistCookie,"");

	}
	else{
		bookmarkTitle = thisTrack + " by " + thisArtist;
		setCookie(thisTrackCookie,thisTrack);
		setCookie(thisArtistCookie,thisArtist);

	}
	setCookie(thisIdCookie,thisid);
	setCookie(thisLinkCookie,thisLink);
	setCookie("count",count);

	//alert("Setting bookmark #" + count + ":" + thisid + ":" + thisArtist + ":" + thisTrack);
	//location.reload();
}

function clearBookmarks(){
	setCookie("count", "0");
	location.reload();
}

function setBookmarks(){
	var count = getCookie("count");
	if(count == ""){
		setCookie("count","0");
		setBookmarks();
	}

	if(count > 0){
		var bookmarkNode =document.getElementById("bookmarks")
		while (bookmarkNode.hasChildNodes()) {
    		bookmarkNode.removeChild(bookmarkNode.lastChild);
		}


		for (var i = 1; i <= count; i++) {

			var thisIdCookie = "id" + i;
			var thisArtistCookie = "artist" + i;
			var thisTrackCookie = "track" + i;
			var thisLinkCookie = "track" + i;

			var thisId = getCookie(thisIdCookie);
			var thisArtist = getCookie(thisArtistCookie);
			var thisTrack = getCookie(thisTrackCookie);
			var thisLink = getCookie(thisLinkCookie);

			var songButton = document.createElement("button");
			songButton.id = i;
			songButton.className = "button";

			songButton.onclick = function(){
				gotoBookmark(this.id);
			};

			if(thisArtist != ""){
				songButton.innerHTML = thisTrack + " by " + thisArtist + "<br>";
			}
			else{
				songButton.innerHTML = thisTrack;
			}
			bookmarkNode.appendChild(songButton);

			//alert("Loading bookmark #" + i + "/" + count+ ": " + thisId + ":" + thisArtist + ":" + thisTrack);

		}

	}

}
function gotoBookmark(bookmarkId){

	var linkCookie = "link" + bookmarkId;
	var link = getCookie(linkCookie);

	window.location = link;
}

function appendBookmarkCount(){
		var count = getCookie("count");

		document.getElementById("showBookmarks").innerHTML = "Show Bookmarks (" + count + ")";
}

function renameSong(){
	var id = document.getElementById("thisid").innerHTML;
	var track = document.getElementById("thisTrack").innerHTML;
	var artist = document.getElementById("thisArtist").innerHTML;


	var newTitle = prompt("Enter New Title", track);

	if(newTitle != null){
		if(newTitle != ""){
			var newArtist = prompt("Enter New Artist", artist);

			if(newArtist != null){
				if(newArtist != ""){
					track = newTitle.replace(" ", "%20");
					artist = newArtist.replace(" ", "%20");
					window.location = "/rename.php?id=" + id + "&new-title=" + track + "&new-artist=" + artist;
				}
				else{
					alert("You can't enter an empty artist!");
				}
			}
			else{
				//alert("Cancelling");
			}
		}
		else{
			alert("You can't enter an empty title!");
		}
	}
	else{
		//alert("Cancelling");
	}
	

}

function searchLyrics(){
	var title = document.getElementById("thisTrack").innerHTML;
	var artist = document.getElementById("thisArtist").innerHTML;

	if(title == "Unknown Track"){
		alert("How do you expect to find lyrics for this?");
		return;
	}
	window.location = "http://search.azlyrics.com/search.php?q=" + title.replace(" ","+") + "+" + artist.replace(" ", "+");
}