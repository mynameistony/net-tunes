 <!DOCTYPE html>
 <script src="/scripts.js"></script>
 <link rel="stylesheet" href="/style.css">
<body id="body">
<title id="title">My Personal Pandora</title>
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

<?php
	echo shell_exec("./output-random-track-button.sh");
	echo shell_exec("./output-artists.sh");

?>
<script>setInterval("checkEnded()",1000)</script>
<script>saveNextSong()</script>
<script>setShuffleButton()</script>
</body>
