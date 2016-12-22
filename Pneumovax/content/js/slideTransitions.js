$(document).ready(function(){
	$("#pi_icon").click(function(){
		$("#slider").removeClass("closed");
		$("#slider").removeClass("half");
		$("#slider").removeClass("ref");
		$("#refBox").removeClass("orangeBack");
		$("#slider").addClass("full");
		$("#slider").addClass("pi");
		$("#piBox").addClass("orangeBack");});
	
	$("#ref_icon").click(function(){
		$("#slider").removeClass("closed");
		$("#slider").removeClass("half");
		$("#slider").removeClass("pi");
		$("#piBox").removeClass("orangeBack");
		$("#slider").addClass("full");
		$("#slider").addClass("ref");
		$("#refBox").addClass("orangeBack");});
	
	$("#down").click(function(){
		$("#slider").removeClass("full");
		$("#slider").removeClass("half");
		$("#slider").addClass("closed");
		$("#refBox").removeClass("orangeBack");
		$("#piBox").removeClass("orangeBack");});
	
	$("#up").click(function(){
		$("#slider").removeClass("closed");
		$("#slider").removeClass("half");
		$("#slider").addClass("half");});
	
	$(".comButton").click(function(){
		$("#comm").fadeIn(1000);});
	
	$("#closeCOMM").click(function(){
		$("#comm").fadeOut(1000);});
});