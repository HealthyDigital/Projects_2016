// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide'),
		footer = $('footer'),
		info = $('.nav [data-href=pi], .nav [data-href=ref]');
	
	$('.arrow').on('tap', function(){
		var t = $(this);
		info.removeClass('active');
		footer.removeClass('info').find('.item').hide();
		if(!t.hasClass('prev')){
			t.parent().toggleClass('up');
		}
	})
	
	$('.nav li').on('tap', function(){
		var $this = $(this), 
			file = $this.attr('data-href');
			
			if(file === 'pi' || file === 'ref'){
				info.removeClass('active');
				$this.addClass('active');
				footer.addClass('info').find('.item').hide();
				
				if(file === 'pi'){
					footer.find('.item.pi').slideDown();
					
				}else{
					footer.find('.item.refs').slideDown();
				}
			}else{
              
				file = !slide.hasClass('home') && file === 'index' ? '../'+file : 
                  !slide.hasClass('home') && file !== 'index' ? '../'+file+'/'+file : 
                   slide.hasClass('home') && file === 'index' ? file : file+'/'+file;
				goToSlide(file);
			}
		})
	$('.review > span').on('tap', function(){
		//console.log(slide.hasClass('home'))
		if(slide.hasClass('home')){
			openPDF('pdf/pi');
		} else{
			openPDF('../pdf/pi');
		}
	})
	
/*	$('span.pi_link').on('tap', function(){
		if(slide.hasClass('home')){
		//console.log(slide.hasClass('home'))
			openPDF('pdf/Dukoral_PI_AU2');
		} else {
			openPDF('../pdf/Dukoral_PI_AU2');
		}
	})*/
	
	/*$('.handbook').on('tap', function() {
		if(slide.hasClass('home')) {
			//console.log(slide.hasClass('home'))
			openPDF('pdf/2.CholeraImmunisation Handbook10thEdition');
		} else {
			openPDF('../pdf/2.CholeraImmunisation Handbook10thEdition');
		}
	})*/
	//navigate();
});

function goToSlide(url){
	window.location= url+'.html';
}
function openPDF(url){
	window.location= url+'.pdf';
}
function navigate(prev, next){
	var url = '';
	$('.slide').on('swipeleft swiperight', function(e){
		url = e.type === 'swipeleft' ? next : prev;
		//
		if(url){ goToSlide(url); }
		
	})
	
}