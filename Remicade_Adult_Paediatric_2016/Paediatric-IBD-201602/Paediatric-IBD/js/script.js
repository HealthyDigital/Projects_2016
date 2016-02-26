$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	
	//navigation
	function hideShowElements(btn, e){
		btn.on('tap', function(){
			var ele = e;
			if(ele.is(':hidden')){
				ele.fadeIn();
			}else{
				ele.fadeOut();
			}
		});
	}
	hideShowElements($('.btn-ref'), $('.ref'));
	
	
	
	goToSlide('btn-mpi', 'CrohnsDisease000.zip');
	
	goToSlide('crohn', 'CrohnsDisease100.zip');
	goToSlide('fistulising', 'CrohnsDisease200.zip');
	goToSlide('paediatric', 'CrohnsDisease300.zip');
	goToSlide('safety', 'CrohnsDisease400.zip');
	goToSlide('adherence', 'CrohnsDisease500.zip');
	goToSlide('preference', 'CrohnsDisease510.zip');
	
	
	
});
//go to slide
function goToSlide(btn, url){
	"use strict";
	$('.'+btn).on('tap', function(){
		var id = $(this).parents('.ref').length > 0 ? ', DCREF' : '';
		document.location = 'veeva:gotoSlide('+url+'.zip'+id+')';
	});
}
