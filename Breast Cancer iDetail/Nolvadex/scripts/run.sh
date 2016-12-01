#!/bin/bash 
cd ..
for dir in *
do
   dir=${dir%*/}
   re="[0-9]+.*"
   if [[ $dir =~ $re ]]; 
   then 
   sed -i.tmp -e '/<!-- crumbs start -->/r ./common/js/crumbs.html' -e '/<!-- crumbs start -->/,/<!-- crumbs end -->/ d;' ${dir}/*.html
   	fi
done
