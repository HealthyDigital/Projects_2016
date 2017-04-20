// JavaScript Document
$( function(){
	//prevent iPad rubber band effect
	$(document).on('touchmove', function(e){ e.preventDefault(); });
	
	//navigation
	navToSlide('.zoladex .pi', 'Zoladex2015PI', 'AZANZBREF');
	navToSlide('.faslodex .pi', 'Faslodex2016PI', 'AZANZBREF');
	navToSlide('.arimidex .pi', 'Arimidex2013PI', 'AZANZBREF');
	navToSlide('.nolvadex .pi', 'Nolvadex2016PI', 'AZANZBREF');

	//show/hide
	showHide('ref');
	showHide('vid');
	showHide('study');

});

//go to slide
function navToSlide(btn, asset, id){
	"use strict";
	$(btn).on('tap', function(){
		id = id ? ', '+id+'' : '';
		document.location = 'veeva:gotoSlide('+asset+'.zip'+id+')';
	});
}

function showHide(btn){
	$('span.'+btn).on('tap', function(){
		var disp = $('div.'+btn);
		$(disp).is(':visible') ? $(disp).fadeOut() : $(disp).fadeIn();
	})
}