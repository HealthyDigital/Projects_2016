// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide'),
		footer = $('footer'),
		arrow = footer.find('.arrow'),
		infoBtn = $('.nav-right span'),
		swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 30,
		});
	//console.log(swiper);
	arrow.on('tap', function(){
		var $this = $(this);
		infoBtn.removeClass('active');
		footer.removeClass('info').find('.item').hide();
		$this.parent().toggleClass('up');
	})
	
	$('.nav li, .nav-right span').on('tap', function(){
		var $this = $(this),
			file = $this.attr('data-href');
			
			if(file === 'pi' || file === 'refs' || file === 'resources' || file === 'faq'){
				var infoItem = footer.find('.'+file);
				if(!infoItem.is(':visible')){
					infoBtn.removeClass('active');
					$this.addClass('active');
					footer.addClass('info').find('.item').hide();
					infoItem.show();
					//console.log(file)
					file === 'faq' ? swiper.update() : '';
				}
			}else{
				file = !slide.hasClass('home') ? '../'+file : file;
				window.location= file+'.html';
				//console.log(file);
				//goToSlide(file);
			}
	})
	/*$('.review > span').on('tap', function(){
		//console.log(slide.hasClass('home'))
		if(slide.hasClass('home')){
			openPDF('pdf/Travel Vaccines Cholera Information Pads-FLYER_FA');
		} else{
			openPDF('../pdf/Travel Vaccines Cholera Information Pads-FLYER_FA');
		}
	})*/
	
	$('span.pi_link').on('tap', function(){
		if(slide.hasClass('home')){
		//console.log(slide.hasClass('home'))
			openPDF('pdf/Dukoral_PI_AU2');
		} else {
			openPDF('../pdf/Dukoral_PI_AU2');
		}
	})
	
	$('.resources li').on('tap', function() {
		var $this = $(this),
			href = $this.attr('data-href'),
			link = '';
		
		if($this.attr('data-href').indexOf('http') === -1){
			link = slide.hasClass('home') ? href : '../'+href;
			
			link.indexOf('pdf') !== -1 ? openPDF(link) : window.location= link+'.html';
			//console.log(link)
		}else{
			window.open(href, '_blank');
			//console.log(href)
		}
		
	})
	//navigate();
	$('.faq .answer').on('tap', function(e){
		var $this = $(this);
		//e.stopPropagation();
		
		$this.find('span').fadeIn()
			.parents('.swiper-slide').find('.img').fadeIn();
		//console.log()
	})
});

function goToSlide(url){
	///console.log($(this))
	if(!$('footer.info').length ){
		window.location= url+'.html';
	}
}
function openPDF(url){
	window.location= url+'.pdf';
}
function navigate(prev, next){
	var url = '';
	
	$('.slide').on('swipeleft swiperight', function(e){
		url = e.type === 'swipeleft' ? next : prev;
		
		if(url){ goToSlide(url); }
	})
}