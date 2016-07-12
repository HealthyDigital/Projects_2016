// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide');
	
	
	
});

//Global navigation
function jumpToSlide(btn, s){
	"use strict";
	$('.'+btn).on('tap', function(){
		window.location = s+'.html';
	});
}
function goToNextOrPrev(p, n){
	"use strict";
	var file = n;
	$('.slide').on('swipeleft swiperight', function(e){
		//console.log(e.type);
		e.type === "swipeleft" ? file = n : file = p;
		window.location = file;
	});
	
}