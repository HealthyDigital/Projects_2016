$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var wrapper = $('.content-wrapper'),
		menu = $('.main-menu'),
		ref = $('.ref'),
		study = $('.study-design'),
		footerMenu = $('.footer-menu > li');
		
	//show/hide refs & study
	$(".popup-menu > li:not(':first-child, .disabled, .btn-mpi')").on('tap', function(){
		var $this = $(this);
		if($this.hasClass('btn-ref')){
			study.hide();
			ref.fadeIn();
		}else{
			ref.hide();
			study.fadeIn();
		}
    });
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
	//footer menu
	footerMenu.each(function() {
        var $this = $(this), 
			span = $this.find('span');
		span.on('tap', function(){
			footerMenu.find('ul').hide();
			span.prev().fadeIn();
		});
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
	btn.not('.disabled').on('tap', function(){
		var ele = e;
		$('.reference:visible, .study-design:visible').hide();
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
		document.location = 'veeva:gotoSlide('+url+'.zip'+ id +')';
	});
}
