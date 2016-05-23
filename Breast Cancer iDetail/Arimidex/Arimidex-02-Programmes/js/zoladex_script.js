$(function(){
	var bindMoveEvent = ("ontouchmove" in document.documentElement)? "touchmove" : "mousemove",
        bindClickEvent = ("ontouchend" in document.documentElement)? "touchend" : "mouseup",
		hitEvent = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

	var itemOpen = false;
	var calloutOpen = false;

	//$("#container").append("<p style='left: 0; top: 0;'>LOCAL STORAGE: "+JSON.stringify(localStorage)+"</p>");
	//$("#container").append("<h2 style='position: absolute; left: 0; top: 50px; color: red; z-index: 9999'>SESSION STORAGE: "+JSON.stringify(sessionStorage)+"</p>");

	$("#buttons a").bind(hitEvent, function(e){
		if($(this).attr("href") == "#"){
			// it requires an overlay
			var parentId = $(this).parent().attr("id");
			var overlayTarget = $("#"+parentId+"-overlay");
			overlayTarget.fadeIn();
			e.preventDefault();
		}else{
			// do nothing - it's a normal link
		}
	});
	$(".ref-btn, .info-btn").bind(hitEvent, function(e){

		var type = $(this).attr("class");
		type = type.split("-");

		var className = "."+type[0]+"-content";
		if($(className).hasClass("visible")){
			$(className).fadeOut().removeClass("visible");
		}else{
			$(className).fadeIn().addClass("visible");
		}
		e.preventDefault();
	});
	$(".ref-content").bind(hitEvent, function(e){
		$(this).fadeOut().removeClass("visible");
		e.preventDefault();
	});
	$(".info-content").bind(hitEvent, function(e){
		$(this).fadeOut().removeClass("visible");
		e.preventDefault();
	});

	$("#slide-2 .circle-btn").bind(hitEvent, function(e){
		if(itemOpen){
			$(".panel-item").fadeOut();
		}
		itemOpen = true;
		var id = $(this).attr("id");
		var id = id.split("-");

		//var itemOpen = id[1];
		var newId = "#item-"+id[1];

		$(newId).fadeIn();
		e.preventDefault();
	});
	$(".graph").bind(hitEvent, function(e){
		var id = $(this).attr("id");
		var id = id.split("-");

		//var itemOpen = id[1];
		var newId = "#graph-content-"+id[1];

		$(newId).fadeIn();

		e.preventDefault();
	});

	$(".square-btn").bind(hitEvent, function(e){
		if($(this).hasClass("open")){
			el = $(this);
			$(".callout").fadeOut(function(){
				$(".square-btn").each(function(){
					$(this).removeClass("open");
				});
			});
		}else{
		$(this).addClass("open");
		var id = $(this).attr("id");
		var id = id.split("-");

		//var itemOpen = id[1];
		var newId = "#callout-"+id[1];
		$(".callout").fadeOut();
		$(newId).fadeIn();
		}

		e.preventDefault();
	});

	$(".btn").bind(hitEvent, function(e){

		var id = $(this).attr("id");
		var id = id.split("-");

		//var itemOpen = id[1];
		var newId = "#content-"+id[1];

		$(newId).fadeIn();

		e.preventDefault();
	});
	$(".video-btn").bind(hitEvent, function(e){
		$("#video-overlay").fadeIn();
		$('#vid').get(0).play();
		e.preventDefault();
	});

	$(".close-btn, .goback").bind(hitEvent, function(e){
		$(this).parent().fadeOut();
		if($("#vid").length > 0){
			$('#vid').get(0).pause();
		}
	});


});