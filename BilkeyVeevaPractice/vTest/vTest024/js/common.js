
$(function(){	
	
	$(".boxInfo").hide();
	
	$(".tools > li").click(function()
	{
		document.getElementById("myNav").style.width = "1024px";
		document.getElementById("myNav").style.height = "768px";

		var item = $(this).data("id");
		$(".overlayImage").css("background-image","url('./images/i"+item+".png')");
	});

	$("#myNav > span:first-child").click(function()
	{
		closeNav();
	});

	$("footer > ul > li").click(function(){
		$(".boxInfo").toggle(1300);
	});
})
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}