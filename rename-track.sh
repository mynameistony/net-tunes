#!/bin/bash

#FIX REGEXES
id=$(echo $@ | grep "^[0-9]*:" -o | sed s/":"/""/g)
newArtist=$(echo $@ | grep ":[-_A-Za-z0-9 ]*:" -o |  sed -e s/"^:"/""/g -e s/":$"/""/g)
newTitle=$(echo $@ | grep ":[-_A-Za-z0-9 ]*$" -o |  sed -e s/"^:"/""/g)
file=$(cat data/id/$id | sed -e s/"^\/"/""/g -e s/"%20"/" "/g)

id3v2 -l "$file" >> /dev/null
id3v2 --song "$newTitle" "$file" >> /dev/null
id3v2 --artist "$newArtist" "$file" >> /dev/null

echo "<script>window.location = \"/?trackid=$id\";</script>"

#echo "Setting ID#$id<br>"
#echo "New title: $newTitle<br>"
#echo "New Artist: $newArtist<br>"