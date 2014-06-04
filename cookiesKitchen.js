/*
  * Cookies Kitchen
  * https://github.com/gobalo/Cookies-Kitchen
  *
  * Copyright 2014 Góbalo
  * Released under the MIT license
*/
var cookiesKitchen;

window.console = window.console!==null ? window.console : { log: function() {}, info: function() {} };

(function($){

var $div,
	$bg,
	$close;

cookiesKitchen = {
	//Kitchen stuff
	settings	: {
		apiUrl : 'http://gobalo.es/kwsn/api/cookiesKitchen',
		cookieName : 'eatMe',
		cookieVal  : 'soGood',
		cookieTime : 100
	},
	tryCount	: 3,
	cookie		: document.cookie,
	
	//Available styles (bg is not an option)
	styles : {
		//Block background
		"bg": "#cookies-alert-bg{top:0;left:0;background:black;opacity:0.7;z-index:999;position:fixed;width:100%;height:100%}",
		//Selectable styles
		"1"	: "#cookies-alert{top:0;left:0;position:fixed;z-index:999999;padding: 10px 0px;width: 100%;background-color:#CA303C;border-bottom:solid 1px #a72731;box-shadow: 0px 0px 2px #a72731;}#cookies-alert p{width: 100%;text-align: center;font-family:'Open Sans',sans-serif,Arial;font-size:14px;margin: 0;color: #fff;}#cookies-alert p a{color:#fff}#cookies-alert #close{font-weight:900;text-shadow: 1px 1px 2px #bbb;cursor:pointer;position:fixed;right: 20px;}",
		"2"	: "#cookies-alert{bottom:10px;right:20px;position:fixed;z-index:999999;padding:8px 0px;width:400px;background-color:#CA303C;border-radius:4px;}#cookies-alert p{font-family:'Open Sans',sans-serif,Arial;font-size:13px;margin: 0px 20px 0 20px;text-align:justify;color:#fff;}#cookies-alert p a{color:#fff}#cookies-alert #close{cursor:pointer;float:right;text-decoration:underline}"
	},
	
	/*
	 * Initialize script
	 */
	init : function(){
		console.log("Cookies-Kitchen: https://github.com/gobalo/Cookies-Kitchen");
		console.log("Calentando el horno...");
		
		var self = this,
			scripts	= document.getElementsByTagName('script'),
			thisTag	= scripts[scripts.length-1],
			$thisTag = $(thisTag);
		
		//Set current cookie
		this.cookie = document.cookie;
		
		//Get this script html tag
		$(scripts).each(function(){
			if( $(this).attr("data-domain") ){
				thisTag = this;
				$thisTag = $(this);
			}
		});
		
		//Set settings
		this.settings.ext		= $thisTag.attr('data-extension') || '';
		this.settings.domain	= document.domain.replace(/^(w{3}\.)*([a-zA-Z]+)\.*.*/, '$2') + '_' + this.settings.ext;
		this.settings.name		= $thisTag.attr('data-name') || this.settings.domain;
		this.settings.url		= $thisTag.attr('data-url');
		this.settings.animation	= $thisTag.attr('data-animation');
		this.settings.block		= $thisTag.attr('data-block')==='true' ? true : false;
		this.settings.style		= $thisTag.attr('data-style') || 1;
		
		if( !this.getCookie(this.settings.cookieName) ){
			
			this.showAlert();
			
			$.ajax({
				url			: self.settings.apiUrl,
				dataType	: "jsonp",
				data 		: {
					cFn		: "cookiesKitchen.cookMe",
					domain	: self.settings.domain
				},
				timeout : 3000,
				error : function(jqXHR, error){
					if( error==="timeout" ){
						self.cookMe();
					}
				}
			});
		}
	},
	
	/**
	  * @param string name - Cookie name
	  * @param string val - Cookie value
	  * @param int time - Cookie expire time
	*/
	setCookie : function(name, val, time){
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + time);
		value = escape(val) + ( (time==null) ? '' : '; expires=' + exdate.toUTCString() );
		document.cookie = name + '=' + val;
		this.cookie = document.cookie;
	},
	
	/**
	  * @param string name - Cookie name
	  * @return string - Returns the value of the requested cookie, null if not found
	*/
	getCookie : function(name){
		var cookieValue	= this.cookie,
			init = cookieValue.indexOf(' ' + name + '=');	
				
		if( init===-1 ){
			init = cookieValue.indexOf(name + '=');
		}
		if( init===-1 ){
			cookieValue = null;
		}else{
			init = cookieValue.indexOf('=', init) + 1;
			var end = cookieValue.indexOf(';', init);
			
			if( end===-1 ){
				end = cookieValue.length;
			}
			cookieValue = unescape(cookieValue.substring(init, end));
		}
		return cookieValue;
	},
	
	/**
	  * @param string name - Cookie name
	  * @param string val - Cookie value
	  * @return boolean - Returns if a cookie exist with requested name and value
	*/
	checkCookie : function(name, val){
		var re = new RegExp(name + '=' + val + '(;*)', 'g');
		return this.cookie.match(re);
	},
	
	/*
	 * Shows cookies advice
	 */
	showAlert : function(){
		
		if(!$div && !$bg){
			
			$bg	= $('<div id="cookies-alert-bg"></div>').hide();
			$div = $('<div id="cookies-alert"></div>').hide();
			
			switch(this.settings.style){
				case "1":
					$close = $('<span id="close" style="top:10px">X</span>');
					break;
				case '2':
					$close = $('<span id="close">Cerrar</span>');
					break;
				default:
					$close = $('<span id="close" style="top:10px">X</span>');
			}
			
			$close.hide();
			
			//Construct html advice
			var privacy	= this.settings.url!=='' ? '<a href="' + this.settings.url + '" target="_blank">Política de Cookies</a>' : 'Política de Cookies',
				$content= $('<p>' +
								'<strong>' + this.settings.name + '</strong> utiliza cookies propias y de terceros para mejorar ' +
								'tu experiencia de navegación y realizar tareas de análisis. Si continúas navegando consideramos ' +
								'que aceptas el uso de cookies.<br/>Por favor, revisa nuestra ' + privacy + '.' +
							'</p>'),
				$close	= $close.click(this.hideAlert);
			
			//Append htm advice
			$div.append('<style>' + this.styles["bg"] + this.styles[this.settings.style] + '</style>').append( $content.append( $close ) );
			
			$("body").prepend($div).prepend($bg);
			
			$(document).trigger("cooking-cookie");
		}
		
		if(this.settings.block){
			$bg.fadeIn();
		}
		
		switch(this.settings.animation){
			case 'slide':
				$div.slideDown();
				break;
			case 'fade':
				$div.fadeIn();
				break;
			default:	
				$div.fadeIn();
		}
		
		$close.fadeIn();
	},
	
	/*
	 * Hides cookies advice
	 */
	hideAlert : function(){
		$(document).trigger("burning-cookie");
		
		$("#cookies-alert p span#close").fadeOut();

		switch(cookiesKitchen.settings.outAnim){
			case 'slide':
				$div.slideUp();
				break;
			case 'fade':
				$div.fadeOut();
				break;
			default:
				$div.fadeOut();
		}
		
		if( cookiesKitchen.settings.block ){
			$bg.fadeOut();
		}
			
		cookiesKitchen.makeMeBurn();
	},
	
	/**
	  * @desc PUBLIC - Checks if the advice have been closed before by the user (stored in session),
	  * 	if true hides alert and set the cookie on the browser
	  * 		0 => User never have closed the advice (cookie) 
	  * 		1 => User have closed the advice (cokkie)
	  * @param object payload - CookiesKitchen API returned object
	*/
	cookMe : function(payload){
		
		if( payload===undefined ){
			payload = {
				burnedCookies : '0'
			};
		}
		
		if( payload.burnedCookies!=='0' ){
			cookiesKitchen.hideAlert();
			
			if( !cookiesKitchen.getCookie(cookiesKitchen.settings.cookieName) && cookiesKitchen.checkCookie(cookiesKitchen.settings.cookieName, cookiesKitchen.settings.cookieVal) ){
				cookiesKitchen.setCookie(cookiesKitchen.settings.cookieName, cookiesKitchen.settings.cookieVal, cookiesKitchen.settings.cookieTime);
			}
		}else{
			
			cookiesKitchen.showAlert();
			
		}
	},
	
	/**
	  * @desc PUBLIC - Tells the API that user have closed the advice, and store it (session)
	  * @param object payload - CookiesKitchen API returned object
	  * 		0 => User never have closed the advice (session) 
	  * 		1 => User have closed the advice (sesison)
	*/
	makeMeBurn : function(payload){
		
		if( payload===undefined ){
			payload = {
				burnedCookies : '0'
			};
		}
		
		cookiesKitchen.setCookie(cookiesKitchen.settings.cookieName, cookiesKitchen.settings.cookieVal, cookiesKitchen.settings.cookieTime);
		
		if( payload.burnedCookies==='0' && this.tryCount>0 ){
			$.ajax({
				url			: self.settings.apiUrl,
				dataType	: "jsonp",
				data 		: {
					cFn		: "cookiesKitchen.makeMeBurn",
					domain	: cookiesKitchen.settings.domain
				},
				complete:function(){
					cookiesKitchen.tryCount--;
				}
			});
		}
	}
};


cookiesKitchen.init();



})(jQuery);
