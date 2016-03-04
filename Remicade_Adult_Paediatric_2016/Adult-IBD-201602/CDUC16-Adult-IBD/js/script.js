$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var wrapper = $('.content-wrapper'),
		menu = $('.main-menu');
	//initialise ref buttons
	hideShowElements($('.btn-ref'), $('.ref'));
	
	//close menu
	$('.close').on('tap', function(){
		var t = $(this).parent();
			t.addClass('bounceOutUp');
		removeAnimation(t, true);
	});
	$('.btn-home').on('tap', function(){
		if(!menu.is(':visible')){
			menu.show().addClass('bounceInDown');
			removeAnimation(menu, false);
		}
	});
	//go to PI 
	goToSlide('btn-mpi', 'CrohnsDisease000.zip');
	
	//remove animated
	function removeAnimation(e, f){
		//console.log(e);
		setTimeout( function(){
			wrapper.find('.animated').removeClass('bounceInDown bounceOutUp zoomInDown zoomIn');
			if(!$.isEmptyObject(e) && f){ e.hide(); }
		}, 800);
	}
	removeAnimation();
	
});

//navigation
function hideShowElements(btn, e){
	"use strict";
	btn.on('tap', function(){
		var ele = e;
		if(ele.is(':hidden')){
			ele.fadeIn();
		}else{
			ele.fadeOut();
		}
	});
}
//go to slide
function goToSlide(btn, url){
	"use strict";
	$('.'+btn).on('tap', function(){
		var id = $(this).parents('.ref').length > 0 ? ', DCREF' : '';
		document.location = 'veeva:gotoSlide('+url+'.zip'+id+')';
	});
}
