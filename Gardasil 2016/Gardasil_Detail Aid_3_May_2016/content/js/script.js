// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide'),
		overlay = $('.overlay'),
		filename = window.location.pathname;
  		filename = filename.substring(filename.lastIndexOf('/')+1);
		//overlay
		$(".common li:first-child:not('.disabled')").on('tap', function(){
			overlay.addClass('show')
			.find('.close').on('tap', function(){
				overlay.removeClass('show');
			});
		});
	
	
	$('.tabs li').on('tap', function(){
            var i = $(this).index();
            var s = $('.contents > div').get(i);
            $('.contents > div').hide()
            $(s).fadeIn();

            $('.tabs li').removeClass('active');
            $(this).addClass('active');
       })

   /* NAVIGATE TO HOME FROM SECTIONS */
   $('.common ul > li:nth-child(n+3), .back').on('tap', function(){
	   //console.log($(this).index())
	   var b = '../index.html';
	   if($(this).index() === 2){
		 	b = 'Gardasil_Toolbox/Gardasil_Toolbox';
		}else{
			b = '../index';
		}
		window.location= b+'.html';
   });

   /* NAVIGATE TO PI SLIDE FROM SECTIONS */
   $('.common li:nth-child(2)').on('tap', function(){
   		filename !=='index.html' ? window.location = '../Gardasil_PI_and_Summary/Gardasil_PI.html' : window.location = 'Gardasil_PI_and_Summary/Gardasil_PI.html'
   })

   /* NAVIGATE TO SUMMARY FROM SECTIONS */
   $(".footer-nav > li:nth-child(2):not('.common')").on('tap', function(){
     	window.location='../Gardasil_PI_and_Summary/Gardasil_Summary.html';
    })
   /***************************************/
	
});

//Global navigation
function jumpToSlide(btn, s){
	"use strict";
	$('.'+btn).on('tap', function(){
		window.location = s+'.html';
	});
}
function goToNextOrPrev(p, n){
	"use strict";
	var file = n;
	$('.slide').on('swipeleft swiperight', function(e){
		//console.log(e.type);
		e.type === "swipeleft" ? file = n : file = p;
		window.location = file;
	});
	
}