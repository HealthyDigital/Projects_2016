var baseurl ='https://trackinglivingbeyond.co.nz/nitracking';
//var baseurl ='http://192.168.6.113:8080/nitracking';

var expiring = true;
//time out 10 minutes
var timeout = 600000;
//3sek for testing the expiry popup
//timeout = 3000;

var eventTypes = {
		"modStart":"MODULE_START",
		"jumpToStart":"JUMP_TO_START",
		"next":"PAGE_NEXT",
		"back":"PAGE_BACK",
		"replay":"PAGE_REPLAY",
		"pause":"PAGE_PAUSE",
		"resume":"PAGE_RESUME",
		"modClose":"CLOSE",
		"videoEnd":"VIDEO_ENDED",
		"videoPlay":"VIDEO_PLAY",
		"sessionExpired":"SESSION_EXPIRED",
		"requestEmail":"REQUEST_EMAIL",
		"ratePage":"PAGE_RATE",
		"vofinished":"VO_ENDED"
}

function TrackingEvent (pageIdx, pageId, pageVersion, eventType, addInfo) {
	this.id = null;
	this.clientId = null;
	this.pageIndex = pageIdx, 
	this.pageIdentifier = pageId;
	this.pageVersion = pageVersion;
	this.time = new Date();
	this.eventType = eventType;
	this.addInfo = addInfo;
}

function Session(moduleId, moduleVersion) {
	this.id = null;
	this.clientId = UUID.generate();
	this.moduleId = moduleId;
	this.moduleVersion = moduleVersion;
	this.sessionStart = new Date();
	this.trackingEvents = [];
}

function MailVo(email, modid) {
	this.to = email;
	this.modId = modid;
	this.status = null;
}

var UUID = (function() {
	var self = {};
	var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
	self.generate = function() {
		var d0 = Math.random()*0xffffffff|0;
		var d1 = Math.random()*0xffffffff|0;
		var d2 = Math.random()*0xffffffff|0;
		var d3 = Math.random()*0xffffffff|0;
		return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
		lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
		lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
		lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
	}
	return self;
})();

var SessionController = SessionController || {};
SessionController = {
		continueCallback:null,
		goAhead: function () {
			SessionController.setLastAction(new Date());
			SessionController.continueCallback();	
		},
		addToPending: function(sessionobj) {
			var sessionjson = JSON.stringify(sessionobj);
			var pendingSessions = SessionController.readPendingSessions();
			if(!pendingSessions) {
				pendingSessions = {};
				pendingSessions[sessionobj.clientId] = sessionjson;
			} else {
				pendingSessions[sessionobj.clientId] = sessionjson;
			}
			SessionController.storePendingSession(pendingSessions);
		},
		createNewSession: function(moduleId, moduleVersion) {
			var currentSession = new Session(moduleId, moduleVersion);
			var oldSession =  this.readCurrentSession();
			if(oldSession) {
				SessionController.addToPending(oldSession);
//				if(oldSession.id != null) {
//					API.archiveSession(oldSession);
//				} else {
//					API.addSession(oldSession);
//				}
			} 
			this.storeCurrentSession(currentSession);
			API.addSession(currentSession);
			SessionController.setLastAction(new Date());
		},
		addTrackingEvent: function (pageIdx, pageId, pageVersion, eventType, addInfo) {
			try {
				if(eventType) {
					var currentSession = this.readCurrentSession();
					if(currentSession == null) {
						SessionController.createNewSession(links['modId'], links['modVersion'])
					}
					var trackevent = new TrackingEvent (pageIdx, pageId, pageVersion, eventType, addInfo);
					var idx = currentSession.trackingEvents.length;
					trackevent.clientId = idx;
					if(idx == 0) {
						currentSession.trackingEvents= [trackevent];
					} else {
						currentSession.trackingEvents[idx] = trackevent;
					}
					this.storeCurrentSession(currentSession);
				}
			} catch (ex) {
				console.log(ex)
			}
		}, 
		/* Page rating make sure that the page is only rated once per session */
		ratePageTrackingEvent: function (pageIdx, pageId, pageVersion, rate) {
			try {
				var currentSession = this.readCurrentSession();
				if(currentSession == null) {
					SessionController.createNewSession(links['modId'], links['modVersion'])
				}

				//check if currentSession contains already a page rating for this page
				var base = currentSession.trackingEvents;
				var evt = base.where("( el, i, res ) => el.pageIndex == " + pageIdx + " && el.eventType == 'PAGE_RATE'");

				var trackevent = new TrackingEvent (pageIdx, pageId, pageVersion, eventTypes['ratePage'], rate);
				var idx = currentSession.trackingEvents.length;
				
				//override existing rating
				if(evt.length == 1) {
					var oldRating = evt[0];
					idx = oldRating.clientId;
				}

				//if no tracking event exists (unlikely at this point but anyway) assign new tracking event array
				trackevent.clientId = idx;
				if(idx == 0) {
					currentSession.trackingEvents = [trackevent];
				} else {
					currentSession.trackingEvents[idx] = trackevent;
				}
				this.storeCurrentSession(currentSession);
			} catch (ex) {
				console.log(ex)
			}
		}, 
		readCurrentSession: function () {
			try {
				return JSON.parse(localStorage.getItem("currentSession"));
			} catch (ex) {
				return null;
			}

		},
		storeCurrentSession: function (session) {
			localStorage.setItem("currentSession", JSON.stringify(session));
		},
		readPendingSessions: function () {
			return JSON.parse(localStorage.getItem("pendingSessions"));
		},
		storePendingSession: function (pending) {
			localStorage.setItem("pendingSessions", JSON.stringify(pending));
		},
		readPendingMails: function () {
			return JSON.parse(localStorage.getItem("pendingMails"));
		},
		storePendingMails: function (pendingMails) {
			localStorage.setItem("pendingMails", JSON.stringify(pendingMails));
		},
		sendSummary: function (email, key) {
			var mvo = new MailVo(email, links[key]);
			API.sendSummaryMail(mvo);
		},
		removePendingMail: function (mvo) {
			console.log(mvo);
			var mvoobj = JSON.parse(mvo);
			var pendingMails = SessionController.readPendingMails();
			if(pendingMails) {
				delete pendingMails[mvoobj.to + '_' + mvoobj.modId];
			}
			SessionController.storePendingMails(pendingMails);
		},
		saveMailToPending: function (mvoobj) {
			var mvo = JSON.stringify(mvoobj);
			console.log(mvo);

			var pendingMails = SessionController.readPendingMails();
			if(!pendingMails) {
				pendingMails = {};
				pendingMails[mvoobj.to + '_' + mvoobj.modId] = mvo;
			} else {
				pendingMails[mvoobj.to + '_' + mvoobj.modId] = mvo;
			}
			SessionController.storePendingMails(pendingMails);
		},

		setServerIds: function (response) {
			var server_session = JSON.parse(response);
			var currentSession = SessionController.readCurrentSession();
			if(currentSession.id == null) {
				currentSession.id = server_session.id;
			}
			if(server_session.trackingEvents) {
				for (i = 0; i < server_session.trackingEvents.length; i++) { 
					var evt = server_session.trackingEvents[i];
					currentSession.trackingEvents[evt.clientId].id = evt.id;
				}
			}

			SessionController.storeCurrentSession(currentSession);
		},
		removePendingSession: function (session, idx) {
			var sessionobj = JSON.parse(session);
			var pendingSessions = SessionController.readPendingSessions();
			if(pendingSessions) {
				if(idx) {
					delete pendingSessions[idx];
				} else {
					delete pendingSessions[sessionobj.clientId];
				}
			}
			SessionController.storePendingSession(pendingSessions);
		},
		setLastAction: function (d) {
			localStorage.setItem("lastAction", d.getTime());
		},
		getLastAction: function () {
			var d = localStorage.getItem("lastAction");
			return d ? d : new Date().getTime();
		},
		touchLastAction: function () {
			if(expiring) { 
				var d = new Date();
				var la = SessionController.getLastAction();
				if(!la) {
					SessionController.setLastAction(d);
				} else{ 
					var idle = d.getTime() - la;
					console.log("idle " + idle);
					if(idle <= timeout) {
						//update last action only if session expiring is enabled and idle time < timeout time
						SessionController.setLastAction(d);
					}
				}
			}		
		},
		checkSessionTimeOut: function(callback) {
			var valid = true;
			if(expiring) {
				var d = new Date();
				var la = SessionController.getLastAction();
				//check if session expired but only if there's a last action date set
				if(la){ 
					var idle = d.getTime() - la;
					console.log("idle " + idle);
					if(idle > timeout) {
						console.log("time out!" + idle);
						$('.overlay.session').show();
						$('.exit').removeClass('click'); 
						$('.continue').removeClass('click');
		
						SessionController.continueCallback = callback;
						return false;
					}
				}
				
				SessionController.setLastAction(d);
			}
			//set callback method in case session expired
			//if the user wants to continue he call callback method
			if(callback) {
				callback();
			}
			return valid;
		}
}

var API = API || {};
API = {
		addSession: function(session) {
			var json = JSON.stringify(session);
			console.log(json);
			API.xdr(baseurl+'/session', 'POST', json, SessionController.setServerIds, API.error );
		},
		updateCurrentSession: function(session) {
			var json = JSON.stringify(session);
			console.log(json);
			if(session.id == null) {
				//session has never been stored to server keep it locally
				API.xdr(baseurl+'/session', 'POST', json, SessionController.setServerIds, API.error);
			} else {
				//try to update the session and then delete it from iPad or keep in case of an failure
				API.xdr(baseurl+'/session/'+session.id, 'POST', json, API.complete, API.error);
			}
		},
		archiveSession: function (session) {
			var json = JSON.stringify(session);
			console.log(json);
			if(session.id == null) {
				//session has never been stored to server keep it locally
				API.xdr(baseurl+'/session', 'POST', json, SessionController.removePendingSession, API.error);
			} else {
				//try to update the session and then delete it from iPad or keep in case of an failure
				API.xdr(baseurl+'/session/'+session.id, 'POST', json, SessionController.removePendingSession, API.error);
			}
		}, 
		sendSummaryMail: function(mvo) {
			var json = JSON.stringify(mvo);
			console.log(json);
			if(mvo.to != null) {
				//session has never been stored to server keep it locally
				API.xdr(baseurl+'/mailSummary', 'POST', json, SessionController.removePendingMail, SessionController.saveMailToPending);
			} 
		},
		complete: function (returned_data) {
			console.log( returned_data );
		}, 
		error:function (data) {
			console.log("Update unsuccessful for data: ", data);
		}, 
		xdr: function(url, method, data, callback, errback, async) {
			var req;
			if(!async) {
				async = true;
			}
			if(XMLHttpRequest) {
				req = new XMLHttpRequest();
				if('withCredentials' in req) {
					req.open(method, url, async);
					req.setRequestHeader('Content-Type', 'application/json');
					req.onerror = API.error;
					req.onreadystatechange = function() {
						if (req.readyState === 4) {
							if (req.status >= 200 && req.status < 400) {
								console.log("call callback" + callback);
								callback(req.responseText);
							} else {
								errback(JSON.parse(data));
							}
						}
					};

					req.send(data);
				}
			} else if(XDomainRequest) {
				req = new XDomainRequest();
				req.open(method, url);
				req.setRequestHeader('Content-Type', 'application/json');
				req.onerror = errback;
				req.onload = function() {
					callback(req.responseText);
				};
				req.send(data);
			} else {
				errback(new Error('CORS not supported'));
			}
		},
		workerxdr: function(url, method, data, callback, errback, objtype) {
			var req;
			if(XMLHttpRequest) {
				req = new XMLHttpRequest();
				if('withCredentials' in req) {
					req.open(method, url, true);
					req.setRequestHeader('Content-Type', 'application/json');
					req.onerror = API.error;
					req.onreadystatechange = function() {
						if (req.readyState === 4) {
							if (req.status >= 200 && req.status < 400) {
								console.log("call callback" + callback);
								callback([req.responseText, objtype]);
							} else {
								errback(JSON.parse(data));
							}
						}
					};

					req.send(data);
				}
			} else if(XDomainRequest) {
				req = new XDomainRequest();
				req.open(method, url);
				req.setRequestHeader('Content-Type', 'application/json');
				req.onerror = errback;
				req.onload = function() {
					callback(req.responseText);
				};
				req.send(data);
			} else {
				errback(new Error('CORS not supported'));
			}
		}
}

//Code from paul's programming perls
//http://www.paulfree.com/28/javascript-array-filtering/
//http://www.paulfree.com/11/javascript-lambda-expressions/ 
Array.prototype.where =
	function(f)
	{
	var fn = f ;
	// if type of parameter is string         
	if ( typeof f == "string" )
		// try to make it into a function
		if ( ( fn = lambda( fn ) ) == null )
			// if fail, throw exception
			throw "Syntax error in lambda string: " + f ;
	// initialize result array
	var res = [] ;
	var l = this.length;
	// set up parameters for filter function call
	var p = [ 0, 0, res ] ;
	// append any pass-through parameters to parameter array               
	for (var i = 1; i < arguments.length; i++) p.push( arguments[i] );
	// for each array element, pass to filter function
	for (var i = 0; i < l ; i++)
	{
		// skip missing elements
		if ( typeof this[ i ] == "undefined" ) continue ;
		// param1 = array element             
		p[ 0 ] = this[ i ] ;
		// param2 = current indeex
		p[ 1 ] = i ;
		// call filter function. if return true, copy element to results            
		if ( !! fn.apply(this, p)  ) res.push(this[i]);
	}
	// return filtered result
	return res ;
	}

function lambda( l )
{
   var fn = l.match(/\((.*)\)\s*=>\s*(.*)/) ;
   var p = [] ;
   var b = "" ;
 
   if ( fn.length > 0 ) fn.shift() ;
   if ( fn.length > 0 ) b = fn.pop() ;
   if ( fn.length > 0 ) p = fn.pop()
    .replace(/^\s*|\s(?=\s)|\s*$|,/g, '').split(' ') ;
 
   // prepend a return if not already there.
   fn = ( ( ! /\s*return\s+/.test( b ) ) ? "return " : "" ) + b ;   
 
   p.push( fn ) ;
 
   try
   {
      return Function.apply( {}, p ) ;
   }
   catch(e)
   {
        return null ;
   }
}
