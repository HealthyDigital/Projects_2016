$(function(){
	// $('body').css("display","none");
	// $('body').fadeIn(1000);
	initZoom();

});


initZoom = function() {

	$('.Dukoral-Epidemiology .zoom').click(function(){
		$('.zoomed').show();
	});
	
	$('.HBVax-Epidemiology .zoom').click(function(){
		$('.zoomed').show();
	});

	$('.Menveo-Epidemiology .zoom').click(function(){
		$('.zoomed').show();
	});

	$('.Jespect-Epidemiology .zoom').click(function(){
		$('.zoomed').show();
	});

	$('.Rabipur-Epidemiology .zoom').click(function(){
		$('.zoomed').show();
	});

	$('.Vivotif-Moa .zoom').click(function(){
		$('.zoomed').show();
	});
	
	$('.Dukoral-Administration .zoom').click(function(){
		$('.zoomed').show();
	});
	

	$('.zoomed').click(function(){
		$(this).hide();
	});
};