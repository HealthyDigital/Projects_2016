// use this prefix for all localStorage interactions to seperate your data from other localStorage values in the ayeDetail app
// global variables
var storagePre = 'lesmills-';
// the asset position of the index screen used in the splash and on every logo click
var cEmail ='',
	_username ='', 
	_currUser ='',
	_companyName ='', 
	regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i, 
	currency = '£',
	indexScreen = '0.0.0.0-main-menu';
// the asset position of the calculator screen
//var calculatorScreen = 'name/0.1.8.0-calculator';

//log
/**/$('<span />', { id:'log'}).prependTo($('.log'));
var lg = $('#log'); 

// handle the logo click on all screens where the logo is visible and jump to the index screen
$('.logo, .go-to-home').on('tap', function() {
	window.location.href = 'asset://name/'+indexScreen;
	/*if (navigator.platform == 'iPad') {
		
	} else {
		console.log('logo click jumps to asset://'+indexScreen);
	};*/
});
//Go to slide
function goToSlide(e, url){
	$('#'+e).on('tap', function(){
		if(e === 'item'){
			localStorage.removeItem(storagePre+'userDetailsData'); 
		}
		storeUserData(' ')
		window.location.href = 'asset://name/'+url;
	});
}
//Read pdf doc
function goToPDF(e, url){
	$('#'+e).on('tap', function(){
		window.location.href = 'modalView://name/'+url;
	});
}
//logout btn 
if($('.btn-log').length === 0){
	$('<span />',{ id: 'logout', class:'btn-log', text: 'Logout'}).appendTo("header");
}

//get user info for salution
var btnLog = $('.btn-log'), 
	userInfo = $.parseJSON(localStorage.getItem(storagePre+'userDetailsData')),
	_prevUserData = $.parseJSON(localStorage.getItem(storagePre+'combinedUserData')),
	nameElem = $('.salutation');
if(!$.isEmptyObject(userInfo)){
		cEmail = userInfo[0].email;
	for(d in userInfo){
		if(userInfo[d].email === cEmail){
			nameElem.show();
			_companyName = userInfo[d].companyname;
			_currUser = userInfo[d].username;
			_username = userInfo[d].fullname;
			nameElem.text("Hello "+_username+',');
			btnLog.attr('id','logout').text('Logout');
			//$('#logout').show();
		}
	}
}else{
	nameElem.text("Anonymous:  data won't save!");
	btnLog.attr('id','login').text('Login');
	//nameElem.hide();
}
$('.slide-footer .data').hide();
//validate email
function validateEmail(e){
	return regex.test(e.val());
}
//currency format with pound sign
function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
} 
//currency format
function prefixPoundSignFormat(num) {
    return currency+num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
} 
//remove num formatting
function removeFormat(num){
	return num.replace(/£|,/g,'');
}
function removePercent(num){
	return num.replace(/%/g,'');
}

//format percentage numbers
function percentageSuffix(num){
	return $.isNumeric(num) ? num+'%' : '0%';
}
//
setTimeout( function(){
	$(".num").each(function() {
		//find('input')
		var $this = $(this), 
			input = $this.find("input:not('[readonly]')"), 
			currentVal = input.val();
			
			input.on('change', function(){
				 currentVal = input.val();
			}).trigger('change');
			
			input.on('focusin', function(){
				currentVal = input.val();
				input.val('');
			})
			input.on('focusout', function(){
				//console.log(currentVal)
				if(input.parent().hasClass('percent')){
					input.val(percentageSuffix(removePercent(currentVal)));
				}else{
					input.val($.isNumeric(currentVal) ? currentVal : 0);
				}
				
			}).trigger('focusout');
	});
}, 100);

//format number
function formatCurrencyOnFocusOut(el){
	el.find("input:not('input.bypass')").each(function() {
		var currentVal, $this = $(this);
		$this.on('change', function(){
			 currentVal = $this.val();
		}).trigger('change');
		
		$this.on('focusin', function(){
			$this.val(currentVal);
		})
		$this.on('focusout', function(){
			$this.val(prefixPoundSignFormat(removeFormat(currentVal)));
		}).trigger('focusout');
	});
}
//slides with accordion nav
if($('.accordion').length > 0){
	var ul = $('#accord');
	ul.find('h4').each(function() {
		var $this = $(this);
			$this.on('tap', function(){
				//console.log($this)
				//ul.find('video').fadeOut(500);
				ul.find('article > div').fadeOut(300);
				ul.find('li').removeClass('active');
				
				$this.parent().addClass('active');
				//$this.parent().find('video').fadeIn(800);
				$this.next().find('div').fadeIn();
			})
    });
}
function readonlyAutocomplete(){
	$(".search-field > [autocomplete = off]").each(function() {
		$(this).prop('readonly', true);
	});
}

function storeUserData(e){
	var combinedUserData = {}, 
		resultData = {},
		result = {},
		items = {}, 
		prevUserData, 
		itms = {}, 
		newUsr = [], 
		cDate = (new Date()).toString(),
		usr = $.parseJSON(localStorage.getItem(storagePre+'userDetailsData'));
		if(e === 'prop' || e === 'agg'){
			
			if(e === 'prop'){
				for(u in usr[0]){
					itms[u] = usr[0][u];
					if(u == 'sentProps'){
						itms[u] = 'YES, on '+cDate;
					}
				}
			}
			if(e === 'agg'){
				for(u in usr[0]){
					itms[u] = usr[0][u];
					if(u == 'sentAgree'){
						itms[u] = 'YES, on '+cDate;
					}
				}
			}
			newUsr.push(itms);
			localStorage.setItem(storagePre+'userDetailsData', JSON.stringify(newUsr));
			usr = $.parseJSON(localStorage.getItem(storagePre+'userDetailsData'));
		}
		
	if(!$.isEmptyObject(usr)){
		var _currUser = usr[0].username; 
			combinedUserData[_currUser] = [];
		
		items['findingOutAboutYourBiz_1'] = $.parseJSON(localStorage.getItem(storagePre+'findingOutAboutYourBiz_1'));
		items['findingOutAboutYourBiz_2'] = $.parseJSON(localStorage.getItem(storagePre+'findingOutAboutYourBiz_2'));
		items['genreMix'] = $.parseJSON(localStorage.getItem(storagePre+'genreMix'));
		items['smallTeamTraining'] = $.parseJSON(localStorage.getItem(storagePre+'smallTeamTraining'));
		items['partnershipValue'] = $.parseJSON(localStorage.getItem(storagePre+'partnershipValue'));
		items['studioData'] = $.parseJSON(localStorage.getItem(storagePre+'studioData'));
		items['marketingData'] = $.parseJSON(localStorage.getItem(storagePre+'marketingData'));
		items['toDoBundledData'] = $.parseJSON(localStorage.getItem(storagePre+'toDoBundledData'));
		items['yourStrategicPlan'] = $.parseJSON(localStorage.getItem(storagePre+'yourStrategicPlan'));
		items['programmesAndFees'] = $.parseJSON(localStorage.getItem(storagePre+'programmesAndFees'));
		items['trainingCalcultor'] = $.parseJSON(localStorage.getItem(storagePre+'trainingCalcultor'));
		items['virtualCalculator'] = $.parseJSON(localStorage.getItem(storagePre+'virtualCalculator'));
		items['emailProposalData'] = $.parseJSON(localStorage.getItem(storagePre+'emailProposalData'));
		items['propositionData'] = $.parseJSON(localStorage.getItem(storagePre+'propositionData'));
		
		items['resultMembershipPerformance'] = localStorage.getItem(storagePre+'resultMembershipPerformance');
		items['resultAssistedExerciseTakeUp'] = localStorage.getItem(storagePre+'resultAssistedExerciseTakeUp');
		items['resultgenreMix'] = localStorage.getItem(storagePre+'resultgenreMix');
		items['resultPartnershipValue'] = localStorage.getItem(storagePre+'resultPartnershipValue');
		items['resultProposition'] = localStorage.getItem(storagePre+'resultProposition');
		items['resultVirtualCalculator'] = localStorage.getItem(storagePre+'resultVirtualCalculator');
		
		
		items['details'] = usr;
		
		prevUserData = $.parseJSON(localStorage.getItem(storagePre+'combinedUserData'));
		if(!$.isEmptyObject(prevUserData)){
			for(d in prevUserData){
				combinedUserData[d] = [];
				if(d !== _currUser){
					combinedUserData[d].push(prevUserData[d][0]);
				}
			}
		}
		///Combine all result images
		
		combinedUserData[_currUser].push(items);
		///console.log(items)
		
		 localStorage.setItem(storagePre+'combinedUserData', JSON.stringify(combinedUserData));
		return _prevUserData = $.parseJSON(localStorage.getItem(storagePre+'combinedUserData'));
	}
	//lg.text('<p>SAVED!!!!</p>'+lg.text());
	//pass new values
	
}

//date & time fields
/*$('[type=date], [type=time]').on('focus', function(){
	var $this = $(this);
		$this.blur();
})*/

$('.close.s').on('click', function(e){
	e.stopPropagation();
	$(this).parent().removeClass('slideInDown')
		.addClass('slideOutUp').wait(1000).removeClass('show');
})

//spell check
$('textarea').each(function(index, element) {
    $(this).prop('spellcheck', true);
});
//reset user data
$('.reset-data, .btn-log').on('tap', function(){
	removeStorageItems();
})
/*$('.save-data').on('tap', function(){
	storeUserData('4');
	removeStorageItems();
});*/

function removeStorageItems(){
	//console.log('removed!')
	localStorage.removeItem(storagePre+'findingOutAboutYourBiz_1');
	localStorage.removeItem(storagePre+'findingOutAboutYourBiz_2');
	localStorage.removeItem(storagePre+'genreMix');
	localStorage.removeItem(storagePre+'smallTeamTraining');
	localStorage.removeItem(storagePre+'partnershipValue');
	localStorage.removeItem(storagePre+'studioData');
	localStorage.removeItem(storagePre+'marketingData');
	localStorage.removeItem(storagePre+'toDoBundledData');
	localStorage.removeItem(storagePre+'programmesAndFees');
	localStorage.removeItem(storagePre+'trainingCalcultor');
	localStorage.removeItem(storagePre+'emailProposalData');
	localStorage.removeItem(storagePre+'yourStrategicPlan');
	localStorage.removeItem(storagePre+'userDetailsData');
	localStorage.removeItem(storagePre+'propositionData');
	
	//unset go back btn 
	localStorage.removeItem(storagePre+'toGenreMix');
	localStorage.removeItem(storagePre+'toProgrammingSlide');
	localStorage.removeItem(storagePre+'toLMPartnership');
	localStorage.removeItem(storagePre+'toPartnershipValue');
	localStorage.removeItem(storagePre+'toSolutionSlide');
	localStorage.removeItem(storagePre+'toRoadMap');
	localStorage.removeItem(storagePre+'toMarketing');
	localStorage.removeItem(storagePre+'toSmartTech');
	localStorage.removeItem(storagePre+'toTrainingSystem');
	localStorage.removeItem(storagePre+'toVideoSlide');
	localStorage.removeItem(storagePre+'toStrategicPlan');
	localStorage.removeItem(storagePre+'toSolutionTables');
	localStorage.removeItem(storagePre+'toProposal');
	localStorage.removeItem(storagePre+'toStudio'); 
	
	
	localStorage.removeItem('dataEntry4');
	
	window.location.href = 'asset://name/0.1.1.0-finding-out-your-business';
	
}

//spinner
/*var spin = $('.spin'); 
if(spin.length > 0){
	spin.spinner({
		min:1,
		numberFormat: 'n',
		start: function( event, ui ) {
			//$(this).trigger('trigger')
		}
	});

$('.dec').spinner('option', 'step', '0.01');
}*/

//Error check
var err, checkForError = function(e){
	e.hasClass('spin') ? err = e.parents('.textfield').find('.error') : err = e.next();

	if(e.val() === '' && e.hasClass('required')){
		//e.addClass('req');
		err.show();
		if(e.parents('#user')){
			e.parents('#user').find('#submit').addClass('animated shake');
		}
	}else{
		//e.removeClass('req');
		err.hide();
		//validate email
		if(e.hasClass('email')){
			if(!validateEmail(e)){
				//e.addClass('req');
				err.show();
			}
		}
		//numeric fields
		if(e.hasClass('spin') || e.hasClass('num')){
			if(!$.isNumeric(e.val()) /*|| !parseFloat(e.val(), 10) > 0*/){
				//e.addClass('req');
				err.show();
			}
		}
		//remove special characters from name
		if(e.attr('id') === 'fullname'){
			var val = (e.val()).replace(/[^\w\s]/g,'');
				e.val(val);
		}
	}
}

//canvas to hold image
var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');
//convert img to dataURL
function getDataUrl(url, callback){
	var	img = new Image();
		img.src = url;
		
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img,  0, 0);
			
			callback(canvas.toDataURL('image/png'));
		}
}

function snapToCanvas(e, h, n, callback){
	var e = $('.'+e),
		prevHeight = e.height(),
		title = $('.results h4');
		e = e.css('height', h);
		n = $('.'+n);
		n.hide();
	if(title.length > 0){
		title.css('margin-top', '20px');
	}
	html2canvas(e).then(function(canvas) {
		callback(canvas.toDataURL('image/png'));
	});
	e.css('height', prevHeight);
	title.css('margin-top', '45px');
	n.show();
}

///bootstrap-select
//$('<span />', { class:'count'}).('.bootstrap-select > button')

/*
var checkForError = function(e){
	$('#'+e+' .required').each(function() {
		var $this = $(this), 
			err = $('.error');
		function checker(){
			if($this.val() === ''){
				$this.addClass('req')
				.parent('div').find(err).fadeIn();
			}else{
				$this.removeClass('req')
				.next(err).hide();
				//validate email
				if($this.hasClass('email')){
					if(!validateEmail($this)){
						$this.addClass('req')
						.parent('div').find(err).fadeIn();
					}
				}
				//numeric fields
				if($this.hasClass('num')){
					if(!$.isNumeric($this.val()) || !parseFloat($this.val()) > 0){
						$this.addClass('req')
						.parent('div').find(err).fadeIn();
					}
				}
				//remove special characters from name
				if($this.attr('id') === 'fullname'){
					var val = ($this.val()).replace(/[^\w\s]/g,'');
						$this.val(val);
				}
			}
		}
		$this.on('blur', function(){
			checker()
		})
		checker();
	})
}
*/


// global log function (can be included in all html files / have a look at the 0-splash inde.html for a small explanation of the function)
/*function log(value,debug) {
	if (debug === false) {
		return false;
	};
	if (navigator.platform == 'iPad') {
		var logStack = $.parseJSON(localStorage.getItem(storagePre+'logStack') || '[]');
		logStack.push(value);
		localStorage.setItem(storagePre+'logStack', JSON.stringify(logStack));
	} else {
		console.log (value);
	};
	return true;
};*/

// some number changes for formating the calculator values
/*Number.decPoint = '.';
Number.thousand_sep = ',';

Number.prototype.format = function(k, fixLength) {
	if (!k) k = 0;
	var neu = '';
	var sign = this < 0 ? '-' : '';

	// Runden
	var f = Math.pow(10, k);
	var zahl = Math.abs(this);
	zahl = '' + parseInt(zahl * f + .5) / f;

	// Komma ermittlen
	var idx = zahl.indexOf('.');
	// fehlende Nullen einfügen
	if (fixLength && k) {
		zahl += (idx == -1 ? '.' : '') + f.toString().substring(1);
	}

	// Nachkommastellen ermittlen
	idx = zahl.indexOf('.');
	if (idx == -1) idx = zahl.length;
	else neu = Number.decPoint + zahl.substr(idx + 1, k);

	// Tausendertrennzeichen
	while (idx > 0) {
		if (idx - 3 > 0) neu = Number.thousand_sep + zahl.substring(idx - 3, idx) + neu;
		else neu = zahl.substring(0, idx) + neu;
		idx -= 3;
	}
	return sign + neu;
};
*/
