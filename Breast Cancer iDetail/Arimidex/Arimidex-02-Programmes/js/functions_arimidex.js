
$(document).ready(function() {

	var bindMoveEvent = ("ontouchmove" in document.documentElement)? "touchmove" : "mousemove",
        bindClickEvent = ("ontouchend" in document.documentElement)? "touchend" : "mouseup";

    // Prevent the "look closer" icon from closing the pop-up on which it sits.
    $('a.button').bind(bindClickEvent, function(clickEvent) {
        // Returning false on an event handler triggers event.stopPropagation()
        // and event.preventDefault() [for w3c compliant browsers].
        // event.stopPropagation() stops the browser from alerting the target's
        // parent elements that the given event has occured (known as bubbling).
        // [http://www.quirksmode.org/js/events_order.html].
        return false;
    });
    
	
	$('.referenceIcon').bind(bindClickEvent, function(){
		$('div', this).fadeToggle(400);
	});

	
	$('.tabs li').bind(bindClickEvent, function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tabContent .content').fadeOut().eq($(this).index()).fadeIn();
	});
	
	$('.goPop').bind(bindClickEvent, function(){
		var popId = $(this).attr('href');
		var popwidth = $(popId).width();
		$('.shade').fadeIn('fast', function(){
			$(popId).animate({right: '-=' + popwidth}, 1500, 'easeOutQuint');
		});
	});
	
	$('.close').bind(bindClickEvent, function(){
		$('.shade').delay(400).fadeOut(400);
		var popwidth = $(this).parent().width();
		$(this).parent().animate({right: '+=' + popwidth}, 1500, 'easeOutQuint');
	});
	
	$('.btn_i').bind(bindClickEvent, function(){
		var bubble = $(this).next();
		var parentWidth = ($(this).parent().width()) - 60;
		if (!bubble.hasClass('open')) bubble.stop().addClass('open').fadeIn(400);
		else bubble.stop().removeClass('open').fadeOut(400);
	});
		

	
	$('.closeButton').bind(bindClickEvent, function(){
		$(this).parents('.popup').fadeOut();
		$('#video video').get(0).pause();
	});
	
	

});