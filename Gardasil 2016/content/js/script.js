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

  var filename = window.location.pathname;
  filename = filename.substring(filename.lastIndexOf('/')+1)

   /* NAVIGATE TO SLIDES WITHIN SECTION */
   $('.footer-nav > li:not(:nth-child(2)) > i').on('tap', function(){
        var n = $(this).html().toLowerCase();
        n = n.replace(/\s/g, "-");
        window.location = n + '.html';
    })

   /* NAVIGATE TO HOME FROM SECTIONS */
   $('.common > ul > li:last-child, .back').on('tap', function(){
   		filename == 'index.html' ? null : window.location= '../index.html'
   })

   /* NAVIGATE TO PI SLIDE FROM SECTIONS */
   $('.common > ul > li:nth-child(2)').on('tap', function(){
   		filename != 'index.html' ? window.location = '../6_Other/pi.html' : window.location = '6_Other/pi.html'
   })

   /* NAVIGATE TO SUMMARY FROM SECTIONS */
   $('.footer-nav > li:nth-child(2) > i').on('tap', function(){
      filename != ('summary.html' || 'index.html') ? window.location='../6_Other/summary.html' : null;
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