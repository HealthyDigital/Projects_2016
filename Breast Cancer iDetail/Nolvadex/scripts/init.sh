#!/bin/bash

ln -s ../common/css ./css 
ln -s ../common/js ./js 
ln -s ../common/fonts ./fonts 

mkdir img
cd img
ln -s ../../common/img/* ./