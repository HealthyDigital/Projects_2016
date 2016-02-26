$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var wrapper = $('.content-wrapper');
	
	hideShowElements($('.btn-ref'), $('.ref'));
	
	
	
	goToSlide('btn-mpi', 'CrohnsDisease000.zip');
	
	goToSlide('crohn', 'CrohnsDisease100.zip');
	goToSlide('fistulising', 'CrohnsDisease200.zip');
	goToSlide('paediatric', 'CrohnsDisease300.zip');
	goToSlide('safety', 'CrohnsDisease400.zip');
	goToSlide('adherence', 'CrohnsDisease500.zip');
	goToSlide('preference', 'CrohnsDisease510.zip');
	
//remove animated
	setTimeout( function(){
		wrapper.find('.animated').removeClass('bounceInDown zoomInDown zoomIn');
	}, 1000);	
	
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
