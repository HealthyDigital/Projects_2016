// JavaScript Document
$( function(){
	//prevent iPad rubber band effect and stop all elements from being scrollable
	$(document).on('touchmove', function(e){ 
		e.preventDefault(); 
	});
	
	//add class scrollable to the element to make it scrollable again
	$('.scrollable').on('touchmove', function (e) {
	     e.stopPropagation();
	});
	
	
	//navigation
	navToSlide('.zoladex .pi', 'Zoladex15PI', 'AZAUBREF');
	navToSlide('.faslodex .pi', 'Faslodex2016PI', 'AZAUBREF');
	navToSlide('.arimidex .pi', 'Arimidex13PI', 'AZAUBREF');
	navToSlide('.nolvadex .pi', 'Nolvadex16PI', 'AZAUBREF');

	//show/hide
	showHide('ref');
	showHide('vid');
	showHide('study');

	$('.container, .logo').on('doubleTap', function(){
			var c = $("body").attr('class');
			var href = '';
			if(c=='intro'){href = "AZ-00-Intro"}
			else if(c=='arimidex'){href="Arimidex-00-Timeline"}
			else if(c=='faslodex'){href = "Faslodex-00-Home"}
			else if(c=='zoladex'){href= "Zoladex-00-Home"}
			else if(c=='nolvadex'){href= "Nolvadex-00-Home"}
			document.location= "veeva:gotoSlide("+href+".zip)";
		})

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