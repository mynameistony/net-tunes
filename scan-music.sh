#!/bin/bash

cd $HOME/pandora-ng

ln -s $1

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
id=0
for file in $(find $1 | grep "\.mp3$")
do
	title=$(id3v2 -R "$file" | grep "TIT" -m 1 | sed s/"TIT[0-9]: "//g)

	artist=$(id3v2 -R "$file" | grep "TPE" -m 1 | sed s/"TPE[0-9]: "//g)

	if [ "$title" == "" ]
		then
		title="Unknown Title"
	fi

	if [ "$artist" == "" ]
		then
		artist="Unknown Artist"
	fi
	link=$(echo $file | grep "/Music/.*$" -o | sed s/" "/%20/g)
	
	mkdir -p data/id
	touch data/id/$id

	echo "$link" > data/id/$id

	mkdir -p data/artists/$artist
	touch data/artists/$artist/$title
	echo "@@$id@@" > data/artists/$artist/$title
	#echo $link >> data/artists/$artist/$title 

	echo "Adding file: $file"
	echo "$id:$artist:$title:"

	id=$(($id + 1))

done

IFS=SAVEIFS