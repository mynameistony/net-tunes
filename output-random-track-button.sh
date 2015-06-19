#!/bin/bash

rand=$(($RANDOM % $(ls data/id/ | wc -l)))
echo "<p><button class=button onclick=setSong($rand)>Random Song</button><p>"
