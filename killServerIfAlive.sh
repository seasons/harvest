#! /bin/bash

m=$(lsof -t -i:'8081')
if [ -z $m ]
then
    echo "No server running on 8081"
else
    kill $m
    echo "Killed processes on port 8081"
fi