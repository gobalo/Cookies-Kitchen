(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */
 
	test('Created script tag', function() {
		expect(1);
		
		strictEqual($('#cookiesKitchen').length, 1, 'Script have been appended successfully');
	});
	
	test("Alert created", function() {
		expect(2);
		strictEqual($('#cookies-alert').length, 1, 'Alert have not been appended yet');
		
		ok($('#cookies-alert').is(":visible"), 'Alert is hidden');
	});
	
	test("Background created", function() {
		expect(2);
		strictEqual($('#cookies-alert-bg').length, 1, 'Background have not been appended yet');
		
		ok(!$('#cookies-alert-bg').is(":visible"), 'Background is hidden');
	});
	
	asyncTest("Close alert", function() {
		$(document).on("burning-cookie", function(){
			ok($('#cookies-alert').is(":visible"), 'Alert HTML is not visible');
			
			setTimeout(function(){
				ok(!$('#cookies-alert').is(":visible"), 'Alert HTML stills visible');
				$(document).unbind();
				start();
			}, 500);
		});
		
		$('#cookies-alert p span#close').click();
	});
	
	test("Check cookie value", function() {
		expect(1);
		ok(window.cookiesKitchen.checkCookie('eatMe', 'soGood'), 'Cookie have not been set: '+window.cookiesKitchen.getCookie('eatMe'));
	});
	
	test("Show alert", function() {
		expect(1);
		window.cookiesKitchen.animation = 'fade';
		window.cookiesKitchen.block = true;
		//Show alert again
		window.cookiesKitchen.cookMe();
		ok($('#cookies-alert').is(":visible"), 'Alert HTML is hidden');
	});
	
	asyncTest("Close alert", function() {
		window.cookiesKitchen.hideAlert();
		setTimeout(function(){
			ok(!$('#cookies-alert').is(":visible"), 'Alert HTML stills visible');
			start();
		}, 1000);
	});
	
	test("CookMe", function() {
		expect(1);
		window.cookiesKitchen.hideAlert();
		window.cookiesKitchen.cookMe({burnedCookies : '1'});
		ok(!$('#cookies-alert').is(":visible"), 'Alert HTML stills visible');
	});
	
}(jQuery));
