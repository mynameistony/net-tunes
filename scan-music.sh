#!/bin/bash

cd /home/tony/pandora-ng

ln -s $1

folder=$(echo "$1" | grep "/[-A-Za-z0-9_ ]*/$" -o)

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
id=0
for file in $(find $1 | grep "\.[m][4p][a3]$")
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
	link=$(echo $file | grep "$folder.*$" -o | sed s/" "/%20/g)
	
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