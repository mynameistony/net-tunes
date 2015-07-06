<!--
##TODO##

-Delete Individual bookmarks


-->
<!DOCTYPE html>
<script src="/scripts.js"></script>
<link rel="stylesheet" href="/style.css">
<body id="body">
<title id="title">My Personal Pandora</title>
<center>
 <?php
	if(isset($_POST["artist"])){
		$artist = $_POST["artist"];
		echo shell_exec("./output-artists.sh $artist");
	}
?>
<?php
	if(isset($_GET["trackid"])){
		$id = $_GET["trackid"];
		echo shell_exec("./output-track.sh $id");
	}
?>

<p>Bookmarks</p>
<button id="showBookmarks" class="half-button" onclick="setBookmarks()">Show Bookmarks</button>
<button class="half-button" onclick="clearBookmarks()">Clear Bookmarks</button>
<p id="bookmarks"></p>

<?php
	echo shell_exec("./output-random-track-button.sh");
?>
<button class=button onclick="showArtists()">View Artists</button>
<p><a href="/about.html">About This Site (READ ME!)</a></p>
<p style="font-size: 30px;">Created by <a href="http://mynameistony.github.io">Tony Rogers</a> 2015</p>
<p><a href="/settings.php">Settings</a></p>
<?php
		#echo shell_exec("cat ./lastscan.log");
	#if(isset($_GET["view"])){
		echo shell_exec("./output-artists.sh");
	#}
	#else{
		#echo "<p><form action=\"/\">";
		#echo "<input name=view class=button type=submit value=\"View Artists\">";
		#echo "</form></p>";
		
	#}

?>
</center>
<script>setInterval("checkEnded()",1000)</script>
<script>saveNextSong()</script>
<script>setShuffleButton()</script>
<script>appendBookmarkCount()</script>
<!--<script>setBookmarks()</script>-->
</body>
