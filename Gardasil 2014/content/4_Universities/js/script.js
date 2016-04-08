$(function() {
	initTab();
	//hideGraphs();
});

var isFirstTab = false;
var isSecondTab = false;
var isGraphOn = false;

initTab = function (){
	$('ul.tabs').tabs('div.panes > div');
}

// hideGraphs = function (){
// 	$('.overlay .graphitem').css('top',413);
// 	//$('.zoom').hide();
// 	$('.pvalue').hide();
// 	isGraphOn = false;
// }

// hideGraphsAnimate = function(){
// 	//$('.zoom').hide();
// 	$('.pvalue').hide();
// 	$('.graphitem').stop().animate({top:413},400);
// 	isGraphOn = false;
// }

// showGraphs = function (graph){
// 	graph.css('top',0);
// 	isGraphOn = true;
// }

$('ul.tabs li:first-child a').click(function(){
	//hideGraphsAnimate();
	isFirstTab = true;
	isSecondTab = false;
});

$('ul.tabs li:last-child a').click(function(){
	//hideGraphsAnimate();
	isFirstTab = false;
	isSecondTab = true;
});

// $('.overlay .activator .menveo').click(function(){
// 	hideGraphsAnimate();
// 	$('.overlay .grid-A .graphitem.graphitem01').stop().animate({top:0},400);
// 	$('.overlay .grid-C .graphitem.graphitem01').stop().animate({top:0},600);
// 	$('.overlay .grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
// 	$('.overlay .grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);

// 	$('.grid-A .graphitem.graphitem01').stop().animate({top:0},400);
// 	$('.grid-C .graphitem.graphitem01').stop().animate({top:0},600);
// 	$('.grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
// 	$('.grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);
// });

// $('.overlay .activator .mpsv4').click(function(){
// 	hideGraphsAnimate();
// 	$('.overlay .grid-A .graphitem.graphitem02').stop().animate({top:0},400);
// 	$('.overlay .grid-C .graphitem.graphitem02').stop().animate({top:0},600);
// 	$('.overlay .grid-W135 .graphitem.graphitem02').stop().animate({top:0},800);
// 	$('.overlay .grid-Y .graphitem.graphitem02').stop().animate({top:0},1000);
// });

// $('.overlay .activator .all').click(function(){
// 	hideGraphsAnimate();
// 	$('.overlay .grid-A .graphitem').stop().animate({top:0},400);
// 	$('.overlay .grid-C .graphitem').stop().animate({top:0},600);
// 	$('.overlay .grid-W135 .graphitem').stop().animate({top:0},800);
// 	$('.overlay .grid-Y .graphitem').stop().animate({top:0},1000);
// 	//$('.zoom').show();
// 	$('.pvalue').show();
// });

$('.content.first .zoom').click(function(){
	$('.zoomed').show().removeClass('second').addClass('first');
});

$('.content.second .zoom').click(function(){
	$('.zoomed').show().removeClass('first').addClass('second');
});

$('.zoomed .close').click(function(){
	$('.zoomed').hide();
});

$('ul.tabs li:first-child').click(function(){
	$('.container').removeClass('two').addClass('one');
})

$('ul.tabs li:last-child').click(function(){
	$('.container').removeClass('one').addClass('two');
})