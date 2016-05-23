
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
    
    // Toggle switch.
	// Not anymore (Kashi 3:14pm, 31/05/12) -- // $(".toggle").bind(bindClickEvent, function(clickEvent) { $(this).toggleClass("active"); });
	
	
	// Radio buttons
	
	$('.radio').bind(bindClickEvent, function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});
	
	
	$('.tabs li').bind(bindClickEvent, function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tabsContent li').hide().eq($(this).index()).show();
	});
	
	$('.info').bind(bindClickEvent, function(){
		$('.infoBubble').toggle();
	});
	
	$('.referenceIcon').bind(bindClickEvent, function(){
		$('div', this).fadeToggle(400);
	});
	
	//button to show MOA video in full
	$('#showVideo').bind(bindClickEvent, function(){
		
		var vidURL = 'video/faslodex.mp4';
		
		$('#theVideo').stop(true,true).fadeToggle(400).toggleClass('topZ');
		
		$('#theVideo video').attr('src', vidURL);
		$('#theVideo video')[0].load();
		$('#theVideo video').get(0).pause();
		$('#theVideo video').get(0).play();		

		if($(this).hasClass('active')) {
			$(this).text('View Video').removeClass('active');
		} else {
			$(this).text('Close').addClass('active');
		};
	});
	
	

	// button to show MOA video from 30secs
	$('#moabutton3').bind(bindClickEvent, function(){
		
		$(this).toggleClass(".stop");
		
		var vidURL = 'video/faslodex_30cut.mp4';
		
		$('#theVideo').stop(true,true).fadeToggle(400).toggleClass('topZ');
		
		$('#theVideo video').attr('src', vidURL);
		$('#theVideo video')[0].load();
		$('#theVideo video').get(0).pause();
		$('#theVideo video').get(0).play();
		
		if($('#showVideo').hasClass('active')) {
			$('#showVideo').text('View Video').removeClass('active');
		} else {
			$('#showVideo').text('Close').addClass('active');
		};			
	});


	
	$('#showLegend').bind(bindClickEvent, function(){
		$('#legend').stop(true,true).fadeToggle(400);
	});
	
	//show MOA popup 1
	$('#moabutton1').bind(bindClickEvent, function(){
		$('img#moaPopup1').stop(true,true).fadeToggle(400);
	});
	
	// show MOA popup 2
	$('#moabutton2').bind(bindClickEvent, function(){
		$('img#moaPopup2').stop(true,true).fadeToggle(400);
	});
	
	
	$('ol.accordianList li.question').bind(bindClickEvent, function(){
		$('.theAnswer', this).stop(true,true).slideToggle(400);
		$('h5', this).toggleClass('active');
	});
	
	$('.theAnswer').bind(bindClickEvent, function(){
		return false;
	});
});