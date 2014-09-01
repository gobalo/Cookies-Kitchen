[![Build Status](https://travis-ci.org/gobalo/Cookies-Kitchen.svg?branch=master)](https://travis-ci.org/gobalo/Cookies-Kitchen)
[![Coverage Status](https://img.shields.io/coveralls/gobalo/Cookies-Kitchen.svg)](https://coveralls.io/r/gobalo/Cookies-Kitchen)
[![Dependency Status](https://david-dm.org/gobalo/Cookies-Kitchen.svg)](https://david-dm.org/gobalo/Cookies-Kitchen)
[![devDependency Status](https://david-dm.org/gobalo/Cookies-Kitchen/dev-status.svg)](https://david-dm.org/gobalo/Cookies-Kitchen#info=devDependencies)

#Cookies-Kitchen

Simple cookies advice for your webs

## Installation

Include this script label into the body tag for async load:

```html
<script data-domain="NAME" data-url="ADVICE-URL">
		(function() {
		    var scp=document.createElement('script');scp.type='text/javascript';scp.async=true;scp.src='https://rawgit.com/gobalo/Cookies-Kitchen/master/dist/cookiesKitchen.min.js';
		    var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(scp, s);
		})();
</script>
```

If you want a sync load, write this:

```html
<script id="cookiesKitchen" data-name="TestName" src="https://rawgit.com/gobalo/Cookies-Kitchen/master/dist/cookiesKitchen.min.js"></script>
```


## Usage

To pass data to the script use html data tag:

**data-name**: 
Name of your site, will be shown inside the advice text (REQUIRED FIELD).

**data-extension**: 
Namespace for your site, use this if you want to include different advices in diferent pages.

**data-url**: 
Link to your cookies privacy policy.

**data-animation**: 
Transition to show/hide the advice (slide || fade).

**data-style**:
Default style of the advice (1 || 2).

**data-block**:
Block the screen until the advice is closed.

## Authors

[Jose Luis Represa](https://github.com/josex2r)

[Alberto Vara](https://github.com/avara1986)

##License

Cookies-Kitchen is released under the [MIT License](http://opensource.org/licenses/MIT).
