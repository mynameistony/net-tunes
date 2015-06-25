<!DOCTYPE html>
<script src="/scripts.js"></script>
<link rel="stylesheet" href="/style.css">
<body id="body">

<?php
	if(isset($_GET["id"])){
		if(isset($_GET["new-title"])){
			if(isset($_GET["new-artist"])){
				$id = $_GET["id"];
				$title = $_GET["new-title"];
				$artist = $_GET["new-artist"];
				#$message = "Setting ID#" . $id . " to " . $title . " by " . $artist;
				echo shell_exec("./rename-track.sh $id:$artist:$title");
			}
			else{
				echo "No Artist Found";
			}
		}
		else{
			echo "No Title Found";
		}
	}
	else{
		echo "No ID Found";
	}
?>
</body>