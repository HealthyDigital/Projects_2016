// JavaScript Document
$( function(){
	//prevent iPad rubber bank effect
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
	hideShowElements($('.btn-reference'), $('.reference'));
	
	//go to slide navigation
	function slideNavigation(btn, url, key){
		$('.'+btn).on('tap', function(){
			if(key === 'ref'){
				document.location = 'veeva:gotoSlide('+url+', DCREF)';
			}else{
				document.location = 'veeva:gotoSlide('+url+')';
			}
		});
	}
	
	slideNavigation('btn-mpi', 'CrohnsDisease000.zip');
	
	slideNavigation('crohn', 'CrohnsDisease100.zip');
	slideNavigation('fistulising', 'CrohnsDisease200.zip');
	slideNavigation('paediatric', 'CrohnsDisease300.zip');
	slideNavigation('safety', 'CrohnsDisease400.zip');
	slideNavigation('adherence', 'CrohnsDisease500.zip');
	slideNavigation('preference', 'CrohnsDisease510.zip');
	
	//references
	slideNavigation('ref1', 'Danese2011.zip', 'ref');
	slideNavigation('ref2', 'Hoentjen2011.zip', 'ref');
	slideNavigation('ref3', 'Lichtenstein2012.zip', 'ref');
	slideNavigation('ref4', 'RemicadeData.zip', 'ref');
	
});
