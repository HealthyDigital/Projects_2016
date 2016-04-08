$(function() {
	initTab();
	hideGraphs();
});

var isOneMonth = false;
var isTwelveMonth = false;
var isGraphOn = false;

initTab = function (){
	$('ul.tabs').tabs('div.panes > div');
}

hideGraphs = function (){
	$('.overlay .graphitem').css('top',413);
	//$('.zoom').hide();
	$('.pvalue').hide();
	isGraphOn = false;
}

hideGraphsAnimate = function(){
	//$('.zoom').hide();
	$('.pvalue').hide();
	$('.overlay .graphitem').stop().animate({top:413},400);
	isGraphOn = false;
}

showGraphs = function (graph){
	graph.css('top',0);
	isGraphOn = true;
}

$('ul.tabs li:first-child a').click(function(){
	//hideGraphsAnimate();
	isOneMonth = true;
	isTwelveMonth = false;
});

$('ul.tabs li:last-child a').click(function(){
	//hideGraphsAnimate();
	isOneMonth = false;
	isTwelveMonth = true;
});

$('.overlay .activator .menveo').click(function(){

	hideGraphsAnimate();
	$('.overlay .graphitem').addClass('red');
	$('.overlay .grid-A .graphitem.graphitem01').stop().animate({top:0},400);
	$('.overlay .grid-C .graphitem.graphitem01').stop().animate({top:0},600);
	$('.overlay .grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
	$('.overlay .grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);

	$('.grid-A .graphitem.graphitem01').stop().animate({top:0},400);
	$('.grid-C .graphitem.graphitem01').stop().animate({top:0},600);
	$('.grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
	$('.grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);
});

$('.overlay .activator .mpsv4').click(function(){
	hideGraphsAnimate();
	$('.overlay .graphitem').removeClass('red');
	$('.overlay .grid-A .graphitem.graphitem02').stop().animate({top:0},400);
	$('.overlay .grid-C .graphitem.graphitem02').stop().animate({top:0},600);
	$('.overlay .grid-W135 .graphitem.graphitem02').stop().animate({top:0},800);
	$('.overlay .grid-Y .graphitem.graphitem02').stop().animate({top:0},1000);
});

$('.overlay .activator .all').click(function(){
	hideGraphsAnimate();
	$('.overlay .graphitem').removeClass('red');
	$('.overlay .grid-A .graphitem').stop().animate({top:0},400);
	$('.overlay .grid-C .graphitem').stop().animate({top:0},600);
	$('.overlay .grid-W135 .graphitem').stop().animate({top:0},800);
	$('.overlay .grid-Y .graphitem').stop().animate({top:0},1000);
	//$('.zoom').show();
	$('.pvalue').show();
});

$('.content.first .zoom').click(function(){
	//hideGraphs();
	$('.zoomed').show().removeClass('second').addClass('first');
});

$('.content.second .zoom').click(function(){
	//hideGraphs();
	$('.zoomed').show().removeClass('first').addClass('second');
});

$('.zoomed .close').click(function(){
	$('.overlay .graphitem').removeClass('red');
	$('.zoomed').hide();
	hideGraphs();

});

$('ul.tabs li:first-child').click(function(){
	$('.container').removeClass('two');
})

$('ul.tabs li:last-child').click(function(){
	$('.container').addClass('two');
})