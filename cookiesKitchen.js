/* ---------------- */
/*	SCRIPT PARAMS	*/
/*	domain			*/
/* 	extension		*/
/*	url(privacy url)*/
/*	animations(slide,fade)	*/
/*		in			*/
/*		out			*/
/*	block(background)*/
/* ---------------- */
var cookiesFactory;
(function($){

var $div,$bg,$close;

cookiesFactory={
	settings	: {},
	tryCount	: 3,
	cookie		: document.cookie,
	
	styles : {
		"bg": "#cookies-alert-bg{top:0;left:0;background:black;opacity:0.7;z-index:999;position:fixed;width:100%;height:100%}",
		"1"	: "#cookies-alert{top:0;left:0;position:fixed;z-index:999999;padding: 10px 0px;width: 100%;background-color:#CA303C;border-bottom:solid 1px #a72731;box-shadow: 0px 0px 2px #a72731;}#cookies-alert p{width: 100%;text-align: center;font-family:'Open Sans',sans-serif,Arial;font-size:14px;margin: 0;color: #fff;}#cookies-alert p a{color:#fff}#cookies-alert #close{font-weight:900;text-shadow: 1px 1px 2px #bbb;cursor:pointer;position:fixed;right: 20px;}",
		"2"	: "#cookies-alert{bottom:10px;right:20px;position:fixed;z-index:999999;padding:8px 0px;width:400px;background-color:#CA303C;border-radius:4px;}#cookies-alert p{font-family:'Open Sans',sans-serif,Arial;font-size:13px;margin: 0px 20px 0 20px;text-align:justify;color:#fff;}#cookies-alert p a{color:#fff}#cookies-alert #close{cursor:pointer;float:right;text-decoration:underline}"
	},
	
	init : function(){
		console.log("Calentando el horno...");
		var self=this;
		
		this.cookie = document.cookie;
		
		var scripts	= document.getElementsByTagName('script'),
			thisTag	= scripts[scripts.length-1];

		$(scripts).each(function(){
			if($(this).attr("data-domain"))
				thisTag=$(this);
		});
		
		this.settings.domain	= document.domain.replace(/^([a-zA-Z]+)\.*.*/,"$1")+(this.ext||"");
		this.settings.name		= $(thisTag).attr('data-domain') || this.domain.substr(0,1).toUpperCase()+this.domain.substr(1);
		this.settings.ext		= $(thisTag).attr('data-extension');
		this.settings.url		= $(thisTag).attr('data-url');
		this.settings.linkClass	= $(thisTag).attr('data-linkClass') || "";
		this.settings.inAnim	= $(thisTag).attr('data-in');
		this.settings.outAnim	= $(thisTag).attr('data-out');
		this.settings.block		= $(thisTag).attr('data-block')==="true"?true:false;
		this.settings.style		= $(thisTag).attr('data-style') || 1;
		
		if(!this.getCookie('eatMe')){
			this.showAlert();
			$.ajax({
				url			: "http://gobalo.es/kwsn/api/cookiesKitchen",
				dataType	: "jsonp",
				data 		: {
					cFn		: "cookiesFactory.cookMe",
					domain	: self.settings.domain
				},
				timeout:3000,
				error:function(jqXHR, error){
					if(error=="timeout")
						self.cookMe({
							burnedCookies:"0"
						});
				}
			});
		}
	},
	
	setCookie : function(name,value,time){
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+time);
		value = escape(value) + ( (time==null) ? "" : "; expires=" + exdate.toUTCString() );
		document.cookie = name+"="+value;
		this.cookie = document.cookie;
	},
	
	getCookie : function(name){
		var cookieValue	= this.cookie,
			init = cookieValue.indexOf(" "+name+"=");			
		if(init==-1)
			init=cookieValue.indexOf(name+"=");
		if(init==-1)
			cookieValue=null;
		else{
			init=cookieValue.indexOf("=",init)+1;
			var end=cookieValue.indexOf(";",init);
			if (end==-1)
				end=cookieValue.length;
			cookieValue=unescape(cookieValue.substring(init,end));
		}
		return cookieValue;
	},
	
	checkCookie : function(name,val){
		var re = new RegExp(name+"="+val+"(;*)","g");
		return this.cookie.match(re);
	},
	
	showAlert : function(){
		if(!$div && !$bg){
			$bg	= $('<div id="cookies-alert-bg"></div>').hide();
			$div= $('<div id="cookies-alert"></div>').hide();
			
			switch(this.settings.style){
				case "1":
					$close=$('<span id="close" style="top:10px">X</span>');
					break;
				default:
					$close=$('<span id="close">Cerrar</span>');
			}
			
			$close.hide();
			
			var privacy	= this.settings.url!="" ? '<a href="'+this.settings.url+'" class="'+this.settings.linkClass+'" target="_blank">Política de Cookies</a>' : 'Política de Cookies',
				$content= $('<p><strong>'+this.settings.name+'</strong> utiliza cookies propias y de terceros para mejorar tu experiencia de navegación y realizar tareas de análisis. Si continúas navegando consideramos que aceptas el uso de cookies.<br/>Por favor, revisa nuestra '+privacy+'.</p>'),
				$close	= $($close).click(this.hideAlert);
				
			$div.append('<style>'+this.styles["bg"]+this.styles[this.settings.style]+'</style>').append($content.append($close));
			$("body").prepend($div).prepend($bg);
			
			$(document).trigger("cooking-cookie");
		}
		
		if(this.settings.block)
			$bg.fadeIn();
		
		switch(this.settings.inAnim){
			case 'slide':
				$div.slideDown();
				break;
			case 'fade':
			default:	
				$div.fadeIn();
		}
		
		$close.fadeIn();
	},
	
	hideAlert : function(){
		$(document).trigger("burning-cookie");
		
		$("#cookies-alert p span#close").fadeOut();

		switch(cookiesFactory.settings.outAnim){
			case 'slide':
				$div.slideUp();
				break;
			case 'fade':
			default:
				$div.fadeOut();
		}
		
		if(cookiesFactory.settings.block)
			$bg.fadeOut();
			
		cookiesFactory.makeMeBurn({
			burnedCookies:'0'
		});
	},
	
	cookMe : function(payload){
		if(payload.burnedCookies!='0'){
			cookiesFactory.hideAlert();
			if(!cookiesFactory.getCookie('eatMe') && cookiesFactory.checkCookie('eatMe','soGood'))
				cookiesFactory.setCookie('eatMe',"soGood",100);
		}
	},
	
	makeMeBurn : function(payload){
		cookiesFactory.setCookie('eatMe',"soGood",100);
		if(payload.burnedCookies=='0' && this.tryCount>0)
			$.ajax({
				url			: "http://gobalo.es/kwsn/api/cookiesKitchen",
				dataType	: "jsonp",
				data 		: {
					cFn		: "cookiesFactory.makeMeBurn",
					domain	: cookiesFactory.settings.domain
				},
				complete:function(){
					cookiesFactory.tryCount--;
				}
			});
	}
};


cookiesFactory.init();



})(jQuery);
