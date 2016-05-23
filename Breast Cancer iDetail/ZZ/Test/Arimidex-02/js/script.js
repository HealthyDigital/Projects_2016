// JavaScript Document
$( function(){
	//prevent iPad rubber band effect
	$(document).on('touchmove', function(e){ e.preventDefault(); });
	
	//navigation
	navToSlide('.zoladex .pi', 'Zoladex15PI', 'AZAUBREF');
	navToSlide('.faslodex .pi', 'Faslodex2016PI', 'AZAUBREF');
	navToSlide('.arimidex .pi', 'Arimidex13PI', 'AZAUBREF');
	navToSlide('.nolvadex .pi', 'Nolvadex16PI', 'AZAUBREF');

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