#Cookies-Kitchen [![Build Status](https://travis-ci.org/gobalo/Cookies-Kitchen.svg?branch=master)](https://travis-ci.org/gobalo/Cookies-Kitchen) [![Coverage Status](https://img.shields.io/coveralls/gobalo/Cookies-Kitchen.svg)](https://coveralls.io/r/gobalo/Cookies-Kitchen)

Simple cookies advice for your webs

## Installation

Include the script label into the body tag:

```html
<script type="text/javascript" data-domain="NAME" data-url="ADVICE-URL">
		(function() {
		    var scp=document.createElement('script');scp.type='text/javascript';scp.async=true;scp.src=('https://rawgit.com/gobalo/Cookies-Kitchen/master/src/cookiesKitchen.min.js';
		    var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(scp, s);
		})();
</script>
```

## Usage

To pass data to the script use html data tag:

**data-domain**: 
Name of your site, will be shown inside the advice text (REQUIRED FIELD).

**data-extension**: 
Namespace for your site, use this if you want to include different advices in diferent pages.

**data-url**: 
Link to your cookies privacy policy.

**data-in**: 
Transition to show the advice (slide || fade).

**data-out**: 
Transition to hide the advice (slide || fade).

**data-style**:
Default style of the advice (1 || 2).

**data-block**:
Block the screen until the advice is closed.

## Authors

[Jose Luis Represa](https://github.com/josex2r)

[Alberto Vara](https://github.com/avara1986)

##License

Cookies-Kitchen is released under the [MIT License](http://opensource.org/licenses/MIT).
