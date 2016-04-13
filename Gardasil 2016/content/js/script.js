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

   $('.footer-nav li i').on('tap', function(){
        var n = $(this).html().toLowerCase();
        n = n.replace(/\s/g, "-");
        window.location.href = n + '.html';
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