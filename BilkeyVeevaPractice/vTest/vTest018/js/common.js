var page = pages[idx];
var tl = new TimelineMax(),
pageState = 'init',
voElem = document.getElementById("vo"),
vote = false;

function start() {
	console.log("start on load - pageState = " + pageState);
	//touch last action time stamp
	SessionController.touchLastAction();
	voplay();
	
//	uncomment to turn off volume for VO	
//	voElem.volume = 0; 
	console.log("end on load - pageState = " + pageState);
}

//on page load trigger start function overwritten for the first page in page1.js
window.onload = function(e){
	start();
};


/* the content div represents the viewport of the device 
 * if the user taps on the menu button the mm_popup div comes
 * up as large as the device viewport as a background div to
 * the menu popup wich is the container div. Tapping on the 
 * popup background the menu is closed and to avoid the tap 
 * event bubbling up to the background even the user only taps
 * on the menu, the stopbubble variable avoids the container 
 * being closed.
 * 
 *  */
//+-- content -------------------------------+
//|+-- mm_popup ---|Menu|-------------------+|
//||				|Btn |-- container +     ||
//||               +----+             |     ||
//||               |                  |     ||
//||               |                  |     ||
//||               +------------------+     ||
//||                                        ||
//||                                        ||
//||                                        ||
//||                                        ||
//|+----------------------------------------+|
//+------------------------------------------+
var stopbubble = false;
$('.popup_container').on('tap', function (){
	stopbubble = true;
});

/************************************************************/
/***************     USER ACTION EVENTS     *****************/
/************************************************************/

/* brightness control functionality */
var lightsteps = $('.light').children('.step');
var lightmax = lightsteps.size();
lightsteps.slice( 0, lightmax ).addClass("black");


$('.light .minus').click(function (){
	SessionController.touchLastAction();
	$(this).siblings(".step.black:last").removeClass("black");
	var o = 0.5 - (0.5/lightmax * $(this).siblings(".step.black").size());
	$('.fadeMe').css({ opacity: o });
});

$('.light .plus').click(function (){
	SessionController.touchLastAction();
	$(this).siblings(".step:not(.black):first").addClass("black");
	var o = 0.5 - (0.5/lightmax * $(this).siblings(".step.black").size());
	$('.fadeMe').css({ opacity: o });
});


/*close main menu popup*/
$('.mm_close').on('tap', function (){
	$('.mm_popup').hide();
	SessionController.touchLastAction();
});

$('.mm_popup').on('tap', function (){
	if(stopbubble) {
		stopbubble = false;
	} else {
		$('.mm_popup').hide();
	}
	SessionController.touchLastAction();
});

/*open main menu popup*/
$('.home').on('tap', function (){
	$('.mm_popup').show();
	SessionController.touchLastAction();
});

/*open reference menu popup*/
$('.ref').on('tap', function (){
	SessionController.touchLastAction();
	if(pageState == 'playing') {
		vopause();
	}
	//if current page == index page we only have to go up 3 levels
	var ln = '../../../'+ links['ref'];
	if(window.location.pathname.indexOf("pages") > -1) {
		//otherwise 4
		ln = '../'+ln;
	}
	window.location.href = ln;
});


$('#control').on('tap', function (){
	if(pageState == 'playing') {
		pause();
	} else if(pageState == 'ended') {
		resetPage();
		SessionController.checkSessionTimeOut(replay);
	} else {
		SessionController.checkSessionTimeOut(resume);
	}
});

$('.skipBack15').on('tap', function (){
	if(pageState != "ended") {
		var skip = voElem.currentTime - 15;
		if(skip < 0) {
			skip = 0
		}
		voElem.currentTime = skip;
		voplay();
	}
	SessionController.touchLastAction();
});

function jumpToPage(btn, page){
	$(btn).on('tap', function(){
		 window.location.href = page;
	})
}
//play video
var playBtn = $('.cinema .movplay');
playBtn.on('tap', function(){
	var  t = $(this);
	t.parent().find('.p_popup').fadeOut();
	t.parent().find('video').get(0).play();
	t.removeClass('full');
	t.fadeOut();
	SessionController.touchLastAction();
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['videoPlay'], getVideoSource());
})

$('.back_to_mod_select').on('tap', function() {
	//it should always be possible to leave the module 
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['modClose'], '');
	window.location.href = 'ni-action:close';
});

$('.back_to_home').on('tap', function() {
	//check if session has expired and either go to home or show expired session popup
	SessionController.checkSessionTimeOut(home);
});

$('.for').on('tap', function() {
	//check if session has expired and either go to next slide or show expired session popup
	SessionController.checkSessionTimeOut(forward);
});

$('.back').on('tap', function() {
	//check if session has expired and either go to next slide or show expired session popup
	SessionController.checkSessionTimeOut(backward);
});

$('.privacy').on('tap', function () {
	if(pageState == 'playing') {
		vopause();
	}
	SessionController.touchLastAction();
	//window.location.href = "nextinteract://open?id=12330";
	var ln = '../../'+ links['privacy'];
	if(window.location.pathname.indexOf("pages") > -1) {
		//otherwise 4
		ln = '../'+ln;
	}
	window.location.href = ln;
});

function vopause() {
	tl.pause();
	voElem.pause();
	pageState = "paused";
	$('#control').removeClass('pause');
	$('#control').removeClass('replay');
	$('#control').addClass('play');
}

function voplay() {
	voElem.play();
	tl.play(voElem.currentTime);
	pageState = "playing";
	$('#control').removeClass('play');
	$('#control').removeClass('replay');
	$('#control').addClass('pause');
	$('.arrow').removeClass('glow');
}


function pause() {
	SessionController.touchLastAction();
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['pause'], '');
	vopause();
}


//callback functions to check first if session expired and if not track events
function resume() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['resume'], '')
	voplay();
}

function replay() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['replay'], '')
	voplay();
}

function forward() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['next'], '');
	window.location.href = page.next;
}

function backward() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['back'], '');
	window.location.href = page.back;
}

function home() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['jumpToStart'], '');
	var ln = 'index.html'
		if(window.location.pathname.indexOf("pages") > -1) {
			ln = '../'+ln;
		}
	window.location = ln;
}

/************************************************************/
/****************  VO or MOVIE ended EVENTS  ****************/
/************************************************************/

/* when vo has finished button symbol should change to replay */
$('#vo').on('ended', function(e) {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['vofinished'], '');
	console.log("start on ended - pageState = " + pageState);
	pageState = "ended";
	$('#control').removeClass('play');
	$('#control').removeClass('pause');
	$('#control').addClass('replay');
	$('.arrow').addClass('glow');
	console.log("end on ended - pageState = " + pageState);
});

$('#movie').on('ended', function(){
	playBtn.fadeIn();
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['videoEnd'], getVideoSource());
})

function getVideoSource() {
	var src = '';
	try {
		src = $('#movie').children(0).attr('src');
		
	} catch(e) {
		console.log("exception getting the video source = " + e);
	} 
	return src;
}

/************************************************************/
/***************         TIMER EVENTS       *****************/
/************************************************************/

if(page && page.delay && page.delay > 0) {
	window.setTimeout(function() {
		$('.backCover').addClass('off');
	}, page.delay);
}


voElem.addEventListener('timeupdate', enableVote, false)

function enableVote() {
	if(!vote) {
		var timeRemaining = voElem.duration - voElem.currentTime;
		if (timeRemaining < 10) {
			vote = true;
			$(".item.disable").removeClass("disable");
			$(".item.dislike").on('tap', function() {
				$(".item").removeClass("voted");
				$(this).addClass("voted");
				SessionController.ratePageTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, 'dislike');
			});
			$(".item.like").on('tap', function() {
				$(".item").removeClass("voted");
				$(this).addClass("voted");
				SessionController.ratePageTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, 'like');
			});
		}
	}
}
/*called when tap on replay can be overwritten in page specific js*/
function resetPage() {
}


/************************************************************/
/***************  Email Summary functionality  **************/
/************************************************************/

var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
var matcher = new RegExp(re);
$('.sendSummary').on('tap', function(){
	SessionController.touchLastAction();
	$('.overlay.email').show();
	$('.cancel').removeClass('click'); 
    $('.send').removeClass('click');
    $('#email').val('');
    $('.email_error').text('');
});

$('.overlay').on('tap', function(){
	if ($(event.target).is('.overlay')){
		$('.overlay').hide();
    }
});

$('.cancel, .exit').on('touchstart mouseenter', function() {
	$('.cancel, .exit').addClass('click');

});
$('.cancel, .exit').on('touchend mouseleave', function() {
    $('.cancel, .exit').removeClass('click');

});
$('.send, .continue').on('touchstart, mouseenter', function() {
    $('.send, .continue').addClass('click');
   
});
$('.send, .continue').on('touchend mouseleave', function() {
    $('.send, .continue').removeClass('click');
});
$('.cancel').on('tap', function() {
    $('.overlay').hide();
});
$('.send').on('tap', function() {
	console.log(email);
    var email = $('#email').val();
    var key = ($(this).attr("key"))?($(this).attr("key")) : "modId";
    
    if (email == '' || !matcher.test(email)) {
       $('.email_error').text('Please enter a valid email address.');
    } else {
    	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['requestEmail'], '');
        SessionController.sendSummary(email, key);
        $('.overlay').hide();
    }
});
$('.textbox').on('input', function(){$('.email_error').text('');}); 


/************************************************************/
/***************     Session expired popup     **************/
/************************************************************/

$('.continue').on('tap', function() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['sessionExpired'], 'continued');
    $('.overlay').hide();
    SessionController.goAhead();
});
$('.exit').on('tap', function() {
	SessionController.addTrackingEvent(page.pageIdx, page.pageId, page.pageVersion, eventTypes['sessionExpired'], 'exit');
    $('.overlay').hide();
    $('.back_to_mod_select').trigger("tap");
});

