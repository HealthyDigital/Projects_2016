// JavaScript Document
$( function(){
	//global variables 
	var slide = $('.slide'),
		overlay = $('.overlay');
	
		//window.location = "Dukoral-Epidemiology.html"
	
	//goToNextOrPrev('go-prev', 'go-next');

	/***************************************/

	/* Celine added */

	$('.tabs li').on('tap', function(){
            var i = $(this).index();
            var s = $('.contents > div').get(i);
            $('.contents > div').hide()
            $(s).fadeIn();

            $('.tabs li').removeClass('active');
            $(this).addClass('active');
       })

   /* NAVIGATE TO SLIDES WITHIN SECTION */
   $('.footer-nav li:not(:nth-child(2)) i').on('tap', function(){
        var n = $(this).html().toLowerCase();
        n = n.replace(/\s/g, "-");
        window.location.href = n + '.html';
    })

   /* NAVIGATE TO HOME FROM SECTIONS */
   $('.common li:last-child').on('tap', function(){
   		window.location.href = '../index.html';
   })

   /* NAVIGATE TO PI SLIDE FROM SECTIONS */
   $('.common li:nth-child(2)').on('tap', function(){
   		window.location.href = '../6_Other/pi.html';
   })

   /***************************************/
	
});

//Global navigation
function goToNextOrPrev(p, n){
	"use strict";
	var file = n;
	$('.slide').on('swipeleft swiperight', function(e){
		//console.log(e.type);
		e.type === "swipeleft" ? file = n : file = p;
		window.location = file;
	});
	
}