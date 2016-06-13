$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var content = $('.content'),
		navTop = $('.nav-top'),
		overlay = $('.overlay'),
		video =overlay.find('.video'),
		items = $('.overlay > div'),
		btn = $(".content > .btn:not('.bypass'), .nav-top [data-href=menu]"),
		btnMenu = $('.nav-top [data-href=menu]'),
		info = overlay.find('.info'),
		btnClose = overlay.find('.arrow, .close'),
		ref = overlay.find('.ref'),
		btnNavRef = $('.nav li > span, .menu > li, sup'),
		backToPrevious = localStorage.getItem('backToPrevious');
		
		btn.on('tap', function(){
			var $this = $(this);
				applyShade(overlay);
				overlay.addClass('show');
				
				items.hide();
			if($this.hasClass('btn-info')){
				overlay.find(".info > *:not('.arrow')").hide();
				info.show().find('[data-info='+$this.parent().find('.swiper-slide-active[data-slide]').attr('data-slide')+']').show();
				//console.log($this.parent().find('.swiper-slide-active').attr('data-slide'));
			}else if($this.hasClass('btn-play')){
				video.show();
				overlay.find('video').get(0).play();
			}else {
				selectMenu();
				overlay.find('.nav').show();
				btnMenu.css('opacity', 0);
				
			}
		});
		//get config data
		$.getJSON('js/config.json', getData);
		
		//navigation
		function getData(data){
			var isMenu = false, 
				isRange = 0,
				rMin = 0, rMax = 0,
				key = 'LYN2016';
			//set references
			$.each(data.references, function(k, v){
				$('<li />', { class:"hide", html: "<i>"+[v][0].id+".</i>"+[v][0].title }).appendTo($('.overlay .ref ol, .biblio > ol'));
			});
			btnNavRef.on('tap', function(){
				var $this = $(this),
					id = $this.parent().attr('data-href');
				//items.hide();
				//determine item & swap 
				if($this.parents('.nav').length) {
					isMenu = true;
				}else if($this.parent('.menu').length){
					id = $this.attr('data-href');
					isMenu = true;
				}else{
					isMenu = false;
				}
				//console.log(id)
				if(isMenu){
					$.each(data.slides, function(k, v){
						if([v][0].id === parseInt(id.split('-')[0])){
							localStorage.setItem('activeSlide',	[v][0].key+'_'+id);
							goToSlide(key+[v][0].key);
						}
					});
					localStorage.setItem('slideID',	id);
					
				}else{
					//set ref id
					id = $this.attr('data-ref');
					//check if range & set min/max values
					isRange = id.indexOf('-') !== -1 ? true : false;
					id = id.split(new RegExp('[-|,]', 'g'));
					var a = parseInt(id[0]),
						b = $.isNumeric(id[1]) ? parseInt(id[1]) : 0;
					//reorder reverse input
					if(a > b){ rMin = b; rMax = a; }else{ rMin = a; rMax = b; }
					//hide all refs
					ref.find('ol > li').hide();
					applyShade(overlay);
					overlay.addClass('show').find('.ref').show();
					//console.log(rMin +' : '+rMax )
					if(isRange && rMax !== 0){
						for(var i=rMin; i<=rMax; i++){
							matchRefs(i);
							//console.log(i);
						}
					}else if(!isRange && rMax !== 0){
						for(var i=0; i < id.length; i++){
							matchRefs(id[i]);
							//console.log(id[i]);
						}
					}else{
						matchRefs(rMin);
					}
				}
				overlay.addClass('down');
			});
			//loop through ref list
			function matchRefs(n){
				ref.find('ol > li').each(function() {
					var $this = $(this);
						if(parseInt($this.find('i').text()) === parseInt(n)){
							$this.show();
						}
				});
				var h1 = ref.find('h1');
					ref.find('li:visible').length > 1 ? h1.text('References') : h1.text('Reference');
			}
			
			goToPrevious(data.slides);
			
		}
/*	if(!$.isEmptyObject(activeSlide)){
		content.addClass(activeSlide);
		//overlay.find(".nav li[data-href="+activeSlide.split('_')[1]+"]").last().addClass('active');
	}*/
	function selectMenu(){
		var nav = overlay.find(".nav"),
			i = content.find('.swiper-slide-active[data-slide]').attr("data-slide");
		//console.log(i);
		switch(i){
			case '3b':
				i = '3';
			break;
			case '10b':
			case '10c':
				i = '10';
			break;
			case '11b':
				i = '11';
			break;
			case '22b':
				i = '22';
			break;
		}
		nav.find('li').removeClass('active');
		overlay.find(".nav li[data-href="+i+"]").last().addClass('active');
		
	}
	selectMenu();	
		
	//close overlay
	btnClose.on('tap', function(){
		var $this = $(this),
			overlay = $this.parents('.overlay');
		if(video.length){ overlay.find('video').get(0).pause(); }
		btnMenu.css('opacity', 1);
		
		if(overlay.find('.info').is(':visible') && $this.parents('.ref').length){
			$this.parents('.ref').hide();
		}else{
			items.hide();
			overlay.removeClass('show down shade');
		}
		//
		//
		//applyShade(overlay);
		if(!$.isEmptyObject(backToResources) && backToResources === '1'){
			goToSlide('LYN201613-Resources');
			localStorage.setItem('backToResources', '');
		}
	});	
	//top menu go to slide >>
	$('.nav-top').on('tap', "li:not('[data-href=menu]')", function(){
		var $this = $(this),
			km = '', id = '';
			//console.log($this.attr('data-href'))
			switch($this.attr('data-href')){
				case "warning":
					km = 'LYN201612-Contraindications';
				break;
				case "pi":
					km = 'LYN2016-PI';
					id = 'LYNREF_2016';
					var sl = $('#container').attr('data-slide'),
						m = '';
					
					if(sl){
						switch(sl){
							case 'home':
								m = '-Test-or-Treat-me';
							break;
							case 'intro':
								m = '02-Introducing-Lynparza';
							break;
							case 'menu':
								m = '03-Main-menu';
							break; 
							case 'references':
								m = '11-References';
							break;
							case 'warning':
								m = '12-Contraindications';
							break;
							case 'summary':
								m = '10-Summary';
							break;
							case 'resources':
								m = '13-Resources';
							break;
							
						}
						//console.log('In!!');
					}else{
						m = content.find('.swiper-slide-active[data-slide]').attr("data-slide")+'_';
						
					}
					localStorage.setItem('backToPrevious', m);
				break;
				case "bibliography":
					km = 'LYN201611-References';
				break;
				case "resource":
					km = 'LYN201613-Resources';
				break;
				default:
					km = 'LYN2016-Test-or-Treat-me';
				break;
			}
		localStorage.setItem('activeSlide', '');
		//goToSlide(km, id);
	});
	function goToPrevious(d){
		var pre = 'LYN2016';
		if(!$.isEmptyObject(backToPrevious)){
			if(backToPrevious.indexOf('_') === -1){
				goToSlide(pre+backToPrevious);
				localStorage.setItem('backToPrevious', '');
			}else{
				$.each(d, function(k, v){
					console.log(v.key);
				})
				
			}
			
		}
	}
		
});

//go to slide
function goToSlide(km, id){
	"use strict";
	//$('.'+btn).on('tap', function(){});
	id = id ? ', '+id : '';
	document.location = 'veeva:gotoSlide('+km+'.zip'+id+')';
	
}
//global timeline
var tl = new TimelineLite(),
	slideID = localStorage.getItem('slideID'),
	activeSlide = localStorage.getItem('activeSlide'),
	backToResources = localStorage.getItem('backToResources');

///add shade class
function applyShade(e){
	setTimeout( function(){
		e.addClass('shade');
	}, 400);
}
