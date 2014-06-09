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
 
  test('Create script tag', 1, function() {
    expect(1);
    
    $("body").append('<script type="text/javascript" id="cookiesKitchen" data-name="TestName" data-extension="root">(function() {'+
    "var scp=document.createElement('script');scp.type='text/javascript';scp.async=true;scp.src='https://rawgit.com/gobalo/Cookies-Kitchen/master/src/cookiesKitchen.min.js';"+
    "var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(scp, s);"+
    '})();</script>');
    
    strictEqual($('#cookiesKitchen').length, 1, 'Script have been appended');
  });
  /*
  asyncTest('Dialog created', 2, function() {
    
    ok($('#cookies-alert').length===0, 'Alert HTML have not been appended yet');
    
    $(document).on("cooking-cookie", function(){
      ok($('#cookies-alert').length===1, 'Alert HTML have been appended');
      start();
    });
    
  });
  
  asyncTest('Background created', 2, function() {
    
    ok($('#cookies-alert-bg').length===0, 'Alert background have not been appended yet');
    
    $(document).on("cooking-cookie", function(){
      ok($('#cookies-alert-bg').length===1, 'Alert background have been appended');
      start();
    });
    
  });
  
  asyncTest('Dialog closed', 1, function() {
    
    $(document).on("burning-cookie", function(){
      ok($('#cookies-alert').length===1, 'Alert HTML have been removed');
      start();
    });
    
  });
  
  asyncTest('Background closed', 1, function() {
    
    $(document).on("burning-cookie", function(){
      ok($('#cookies-alert-bg').length===1, 'Alert background have been removed');
      start();
    });
    
  });
  */
}(jQuery));
