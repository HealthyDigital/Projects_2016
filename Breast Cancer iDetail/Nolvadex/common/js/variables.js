//adapt the module page navigation

var pages = {
		'F05':{pageId:'F05',asset:'Faslodex-05-FPAP', next:'N00'},
		'N00':{pageId:'N00',asset:'Nolvadex-00-Home', back:'F05', next:'N01'},
		'N01':{pageId:'N01',asset:'Nolvadex-01-Reduce-Risk', back:'N00', next:'N02'},
		'N02':{pageId:'N02',asset:'Nolvadex-02-Reduce-Risk', back:'N01', next:'N03'},
		'N03':{pageId:'N03',asset:'Nolvadex-03-Safety', back:'N02', next:'N04'},
		'N04':{pageId:'N04',asset:'Nolvadex-04-Safety', back:'N03', next:'N05'},
		'N05':{pageId:'N05',asset:'Nolvadex-05-Summary', back:'N04'}
};
if(idx) {
	var page = pages[idx];

//	left swipe go to next
	$('.container').on('swipeleft', function(e) {
		e.stopPropagation();
		if(page.next) {
			goToPage(page.next);
		}
	});
//	right swipe go back
	$('.container').on('swiperight', function(e) {
		e.stopPropagation();
		if(page.back) {
			goToPage(page.back);
		}
	});


	function goToPage(pageId){
		
		var lnkPage = pages[pageId];
		//check if the page is already shown
		if(lnkPage && page.pageId != lnkPage.pageId) {
			document.location = 'veeva:gotoSlide('+lnkPage.asset+'.zip)';
		}
	}

}