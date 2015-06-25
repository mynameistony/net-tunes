#!/bin/bash

rand=$(($RANDOM % $(ls data/id/ | wc -l)))
newPage="/?trackid=$rand"
echo "<p><button class=button onclick=gotoPage('$newPage')>Random Song</button><p>"
