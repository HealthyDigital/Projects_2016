function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var bindMoveEvent = ("ontouchmove" in document.documentElement)? "touchmove" : "mousemove",
        bindClickEvent = ("ontouchend" in document.documentElement)? "touchend" : "mouseup";
$('.referenceIcon').bind(bindClickEvent, function(){
	
	$('div', this).first().fadeToggle(400);
});
