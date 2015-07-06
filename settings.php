<!DOCTYPE html>
<script src="/scripts.js"></script>
<link rel="stylesheet" href="/style.css">
<body id="body">
<title id="title">My Personal Pandora</title>
<center>

<?php
		echo shell_exec("cat ./lastscan.log");
		echo shell_exec("cat ./unknown-count.log");
?>
</center>