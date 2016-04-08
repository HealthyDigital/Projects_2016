// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide'),
		overlay = $('.overlay');
	
		//window.location = "Dukoral-Epidemiology.html"
	
	//goToNextOrPrev('go-prev', 'go-next');
	
});

//Global navigation
function goToNextOrPrev(p, n){
	"use strict";
	var file = n;
	$('.slide').on('swipeleft swiperight', function(e){
		//console.log(e.type);
		e.type === "swipeleft" ? file = n : file = p;
		window.location = file;
	});
	
}
