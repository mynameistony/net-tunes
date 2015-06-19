#!/bin/bash
link=$(cat data/id/$1)
echo "<audio autoplay class=player id=player>"
echo "<source src=$link type=audio/mpeg>"
echo "</audio>"

file=$(echo $link | sed -e s/"%20"/"\ "/g)
title=$(id3v2 -R ".$file" | grep "TIT" -m 1 | sed s/"TIT[0-9]: "//g)
artist=$(id3v2 -R ".$file" | grep "TPE" -m 1 | sed s/"TPE[0-9]: "//g)
songcount=$(ls data/id/ | wc -l)
if [ "$artist" == "" ]
	then
	artist="Unknown Aritst"
fi
if [ "$title" == "" ]
	then
	title="Unknown Track"
fi

echo "<p>Artist: <b>$artist</b>"
echo "<p>Track: <b>$title</b>"
echo "<p>ID: <b id=thisid>$1/<b id=songcount>$songcount</b></b>"
lastsongid=$(( $1 - 1 ))
nextsongid=$(( $1 + 1 ))

nextsong=$(cat data/id/$nextsongid | sed s/"%20"/"\ "/g)
nextTrack=$(id3v2 -R ".$nextsong" | grep "TIT" -m 1 | sed s/"TIT[0-9]: "//g)
nextArtist=$(id3v2 -R ".$nextsong" | grep "TPE" -m 1 | sed s/"TPE[0-9]: "//g)

if [ "$nextArtist" == "" ]
	then
	nextArtist="Unknown Aritst"
fi
if [ "$nextTrack" == "" ]
	then
	nextTrack="Unknown Track"
fi

prevsong=$(cat data/id/$lastsongid | sed s/"%20"/"\ "/g)
prevTrack=$(id3v2 -R ".$prevsong" | grep "TIT" -m 1 | sed s/"TIT[0-9]: "//g)
prevArtist=$(id3v2 -R ".$prevsong" | grep "TPE" -m 1 | sed s/"TPE[0-9]: "//g)

if [ "$prevArtist" == "" ]
	then
	prevArtist="Unknown Aritst"
fi
if [ "$prevTrack" == "" ]
	then
	prevTrack="Unknown Track"
fi
echo "<p id=prevSong>Previous Song: <b>$prevTrack</b> by <b>$prevArtist</b></p>"
echo "<p id=nextSong>Next Song: <b>$nextTrack</b> by <b>$nextArtist</b></p>"

echo "<p>"
echo "<p><button class=button onclick=toggleShuffle() id=shuffleButton>Toggle Shuffle</button><p>"
echo "<button class=button onclick=play() id=playButton>Pause</button><p>"
echo "<button class=half-button onclick=setSong($lastsongid) id=prevButton>Previous<br></button>"
echo "<button class=half-button onclick=setSong($nextsongid) id=nextButton>Next</button>"
echo "</p>"
echo "<p><button class=button onclick=gotoPage('$link')>Download</button>"
echo "<script>setTitle('$title by $artist')</script>"

