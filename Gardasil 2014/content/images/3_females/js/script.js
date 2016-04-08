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
	$('.graphitem').css('top',330);
	$('.zoom').hide();
	isGraphOn = false;
}

hideGraphsAnimate = function(){
	$('.zoom').hide();
	$('.graphitem').stop().animate({top:330},400);
	isGraphOn = false;
}

showGraphs = function (graph){
	graph.css('top',0);
	isGraphOn = true;
}

$('ul.tabs li:first-child a').click(function(){
	hideGraphsAnimate();
	isOneMonth = true;
	isTwelveMonth = false;
});

$('ul.tabs li:last-child a').click(function(){
	hideGraphsAnimate();
	isOneMonth = false;
	isTwelveMonth = true;
});

$('.activator .menveo').click(function(){

	hideGraphsAnimate();
	$('.grid-A .graphitem.graphitem01').stop().animate({top:0},400);
	$('.grid-C .graphitem.graphitem01').stop().animate({top:0},600);
	$('.grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
	$('.grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);

	$('.grid-A .graphitem.graphitem01').stop().animate({top:0},400);
	$('.grid-C .graphitem.graphitem01').stop().animate({top:0},600);
	$('.grid-W135 .graphitem.graphitem01').stop().animate({top:0},800);
	$('.grid-Y .graphitem.graphitem01').stop().animate({top:0},1000);
});

$('.activator .mpsv4').click(function(){
	hideGraphsAnimate();
	$('.grid-A .graphitem.graphitem02').stop().animate({top:0},400);
	$('.grid-C .graphitem.graphitem02').stop().animate({top:0},600);
	$('.grid-W135 .graphitem.graphitem02').stop().animate({top:0},800);
	$('.grid-Y .graphitem.graphitem02').stop().animate({top:0},1000);
});

$('.activator .all').click(function(){
	hideGraphsAnimate();
	$('.grid-A .graphitem').stop().animate({top:0},400);
	$('.grid-C .graphitem').stop().animate({top:0},600);
	$('.grid-W135 .graphitem').stop().animate({top:0},800);
	$('.grid-Y .graphitem').stop().animate({top:0},1000);
	$('.zoom').show();
});

$('.content.first .zoom').click(function(){
	$('.zoomed.first').show();
});

$('.content.second .zoom').click(function(){
	$('.zoomed.second').show();
});

$('.zoomed').click(function(){
	$(this).hide();
});