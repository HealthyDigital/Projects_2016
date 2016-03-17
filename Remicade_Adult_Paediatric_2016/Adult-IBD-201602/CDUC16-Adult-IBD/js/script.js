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
		footerMenu = $('.footer-menu > li'),
		currentSection = localStorage.getItem('currentSection');
		
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
	//change to Paed menu
	
	if(!$.isEmptyObject(currentSection)){
		currentSection = currentSection.toLowerCase();
		wrapper.addClass(currentSection);
		if(currentSection === 'paediatric-ibd'){
			menu.find('.cd ul > li:last-child').html('Ulcerative<br />Colitis');
		}else{
			menu.find('.cd ul > li:last-child').html('Fistulising<br />Crohn’s disease');
		}
	}
	
	//go to slide 
	goToSlide('btn-mpi', 'AP-IBD1618-PI');
	goToSlide('main-menu [data-slide=cd]', 'CD1601-Disease-course');
	goToSlide('main-menu [data-slide=fist]', 'CD1614-Fistula-healing');
	goToSlide('main-menu [data-slide=ms], .main-menu [data-slide=uc]', 'UC1601-Goals-of-treatment');
	goToSlide('main-menu [data-slide=as]', 'UC1612-Three-dose-induction');
	goToSlide('main-menu [data-slide=st]', 'AP-IBD1601-Safety');
	goToSlide('main-menu [data-slide=do]', 'AP-IBD1609-Medsafe-approved');
	goToSlide('main-menu [data-slide=ad]', 'AP-IBD1611-Facts');
	goToSlide('main-menu [data-slide=pr]', 'AP-IBD1614-Patient-choice');
	goToSlide('main-menu [data-slide=home] > span', 'Remicade-for-IBD');
	
	
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

//go to slide
function goToSlide(btn, asset){
	"use strict";
	$('.'+btn).on('tap', function(){
		var $this = $(this),
			id = '',
			data = $this.attr('data-slide'); 
		if($this.parents('.ref').length > 0){
			id = ', AP_IBD_REFS';
		}else if ($('.paediatric-ibd').length && data === 'cd'){
			asset = 'P-IBD1601-Response-and-remission'; 
			id = ', P_IBD2016';
			
		}else if ($('.paediatric-ibd').length && data === 'fist'){
			asset = 'P-IBD1606-Clinical-remission'; 
			id = ', P_IBD2016';

		}else if($this.parent().attr('data-slide') === 'home'){
			id = $this.index();
			switch($this.index()){
				case 1:
					asset = 'CDUC16-Adult-IBD'; 
					id = ', A_IBD2016';
				break;
				case 2:
					asset = 'Paediatric-IBD'; 
					id = ', P_IBD2016';
				break;
				default:
					asset = 'Remicade-for-IBD'; 
					id = ', AP_IBD2016';
				break;
			}
			localStorage.setItem('currentSection', asset);
		}
		
		document.location = 'veeva:gotoSlide('+asset+'.zip'+ id +')';
	});
}
