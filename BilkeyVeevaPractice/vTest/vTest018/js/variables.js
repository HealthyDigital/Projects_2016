/*  Some links within this module point to pdfs outside of the module where we need the next interact ID.
 *  Unfortunately the IDs are different depending on the sandbox they are uploaded to and to avoid the 
 *  need to change the IDs always before uploading the modules to the different sandboxes first step is  
 *  to determine the environment and set the links accordingly.  */
var live = { 
	"ref":"[10834]-remicade.pdf",
	"privacy":"12332/content/PrivacyPolicy.pdf",
	"modId":"exercise",
	"modVersion":"1.0"
}

var healthy = { 
	"ref":"[10826]-remicade.pdf",
	"privacy":"12330/content/PrivacyPolicy.pdf",
	"modId":"exercise",
	"modVersion":"1.0"
}

//about remicade live = 10627 | healthy = 10112 -> default is set to live!
var links = (window.location.pathname.indexOf("10112") > -1) ? healthy : live;
var links = live;

var pages = {
'01':{pageIdx:'1', pageId:'index', pageVersion:'1.0',next:'./pages/page2.html', back:'./index.html', delay:-1},
'02':{pageIdx:'2', pageId:'active', pageVersion:'1.0',next:'./page3.html', back:'../index.html', delay:5000},
'03':{pageIdx:'3', pageId:'activityIBD', pageVersion:'1.0', next:'./page4.html', back:'./page2.html', delay:5000},
'04':{pageIdx:'4', pageId:'weightBearing', pageVersion:'1.0', next:'./page5.html', back:'./page3.html', delay:5000},
'05':{pageIdx:'5', pageId:'exercisesDrag', pageVersion:'1.0', next:'./page6.html', back:'./page4.html', delay:5000},
'06':{pageIdx:'6', pageId:'smartGoals', pageVersion:'1.0', next:'./page7.html', back:'./page5.html', delay:5000},
'07':{pageIdx:'7', pageId:'dragAndDropSmart', pageVersion:'1.0', next:'./page8.html', back:'./page6.html', delay:5000},
'08':{pageIdx:'8', pageId:'summary', pageVersion:'1.0', next:'./page9.html', back:'./page7.html', delay:5000},
};
