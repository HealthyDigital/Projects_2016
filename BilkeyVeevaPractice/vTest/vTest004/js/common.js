
$(function(){	
	
	$(".boxInfo").hide();
	


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