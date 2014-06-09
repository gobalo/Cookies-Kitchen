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
	
	asyncTest("no errors", function() {
		setTimeout(function() {
			ok(1, "this test would fail.. if it ever ran");
			start();
		}, 1000);
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
				start();
			}, 500);
		});
		
		$('#cookies-alert p span#close').click();
	});
	
}(jQuery));
