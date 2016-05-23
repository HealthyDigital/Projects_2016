$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var container = $('#container'),
		overlay = $('.overlay'),
		ref = overlay.find('.ref'),
		info = overlay.find('.info'),
		nav = overlay.find('.nav'),
		currentSection = localStorage.getItem('currentSection');
	
	//close menu
	$('.close').on('tap', function(){
		var t = $(this).parent();
			t.addClass('bounceOutUp');
		//removeAnimation(t, true);
	});
	
	//go to slide 
	//goToSlide('btn-mpi', 'AP-IBD1618-PI');
	
	
	//remove animated
	/*function removeAnimation(e, f){
		//console.log(e);
		setTimeout( function(){
			wrapper.find('.animated').removeClass('bounceInDown bounceOutUp zoomInDown zoomIn');
			if(!$.isEmptyObject(e) && f){ e.hide(); }
		}, 800);
	}
	removeAnimation();*/
	
});

//go to slide
function goToSlide(btn, asset){
	"use strict";
	$('.'+btn).on('tap', function(){
		var $this = $(this),
			id = '',
			data = $this.attr('data-slide'); 
		
		//document.location = 'veeva:gotoSlide('+asset+'.zip'+ id +')';
	});
}
