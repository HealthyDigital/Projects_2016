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
	navToSlide('.zoladex .pi', 'Zoladex2015PI', 'AZANZBREF');
	navToSlide('.faslodex .pi', 'Faslodex2016PI', 'AZANZBREF');
	navToSlide('.arimidex .pi', 'Arimidex2013PI', 'AZANZBREF');
	navToSlide('.nolvadex .pi', 'Nolvadex2016PI', 'AZANZBREF');

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
	
	//global variables 
	var popup = $('.popup'),
		r = popup.find('.ref'),  
		s = popup.find('.info'),
		controls = $(".controls > span"),
		glasspane = $(".glasspane");
        
	
	//close popup
	glasspane.on('tap', function(){
		closepopup();
	});
		
	popup.on('tap', function(){
		closepopup();
	});
	

	function closepopup() {
		popup.animateOutCss('slideOutDown');
		$('.active').removeClass('active');
		glasspane.removeClass('show');
		$('.open').removeClass('open');
	}
	
	
	controls.not('.p, .open').on('tap', function(){
		var $this = $(this),
		content = $this.attr('class'),
		activeContent = $('.active');
		
		if($this.hasClass('open')) {
			closepopup();
			return;
		} else {
			$('.open').removeClass('open');
			$this.addClass('open')
		}
		
		if(!popup.hasClass("show") && !$this.hasClass("disabled")){
			r.hide();
			s.hide();
			//show popup
			glasspane.addClass('show');
			popup.animateInCss('slideInUp');
		} else if (popup.hasClass("show")) { 
			activeContent.hide();
			activeContent.removeClass('active');
		}
		//choose content
		if($this.hasClass('r')){
			r.show();
			r.addClass('active')
		} else if($this.hasClass('i')){
			s.show();
			s.addClass('active')
		} 
	 
	});

	$.fn.extend({
		animateInCss: function (animationName) {
			$(this).addClass('show');
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				
				$(this).removeClass('animated ' + animationName);
			});
		},
		animateOutCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
				$(this).removeClass('show');
			});
		}
	});