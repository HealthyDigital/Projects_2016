#!/bin/bash 
cd ..

rm -rf ./zips;
rm -rf ./ctls;

mkdir zips;
mkdir ctls;

for dir in *
do
   dir=${dir%*/}
   re="[0-9]+.*"
   if [[ $dir =~ $re ]]; 
   then 
   		zip -r --exclude=*.tmp* --exclude=*shared* --exclude=*.DS_Store* ./zips/${dir} ${dir}; 
   		sed -e "s/ZIP/${dir}.zip/" -e "s/XY/${dir}/" ./scripts/sampleUploadTest.ctl > ./ctls/${dir}.ctl;
   	fi
done

#echo echo ${dir##*/};