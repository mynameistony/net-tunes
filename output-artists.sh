#!/bin/bash

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

if [ $# -eq 0 ]
	then
	echo "<form action=/ method=post>"
	for artist in $(ls data/artists)
	do
		echo "<input class=third-button type=submit name=artist value='$artist'>"

		#echo "<button onclick=$temp>$artist</button>"
	done
	echo "</form>"
else
	artist=$(echo $@ | sed s/" "/"\ "/g)
	echo "<p>Artist: <b>$artist</b></p>"
	echo "<form action=/ method=get>"
	echo "<p>"
	for title in $(ls "data/artists/$artist")
	do
		id=$(cat data/artists/$artist/$title | grep "@@[0-9]*@@" -o | sed s/"@"/""/g)
		link=$(cat data/artists/$artist/$title | grep "@@[0-9]*@@" -v)

		echo "<button class=third-button id=title onclick=setTrackId($id)>$title</button>"
	done
	echo "</p>"
	echo "<input name=trackid id=trackid style='visibility: hidden'>"
	echo "</form>"
	echo "<script>setTitle('Songs by $artist')</script>"
fi
IFS=SAVEIFS