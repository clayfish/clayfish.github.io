var DEV_MODE = true;
var DEV_MODE_APPLIED = DEV_MODE && location.href.indexOf("localhost") > -1;
var serif = false;

/**
 *
 * @param name
 * @param value
 * @param expiryDays
 */
function setCookie(name, value, expiryDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

/**
 *
 * @param cname
 * @returns {*}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 *
 * @param name
 * @returns {boolean}
 */
function checkCookie(name) {
    return getCookie(name) != '';
}

$(document).ready(function () {
    var body = $('body');

    var now = new Date();
    $('.current-year').each(function () {
        $(this).html((now.getFullYear() + '').substring(2));
    });

    if (!DEV_MODE_APPLIED) {
        //body.find('.site-content').html("We are building it up for you.");
        body.find('.under-development').each(function () {
            $(this).hide();
        });
        // Redirect to https
        if (window.location.protocol != "https:") {
            window.location.protocol = "https";
        }
    }

    if (checkCookie('serif')) {
        serif = JSON.parse(getCookie('serif'));
    } else {
        setCookie('serif', serif, 30);
    }

    var onFontChange = function () {
        if (serif) {
            body.css('font-family', '"Merriweather", serif');
        } else {
            body.css('font-family', '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
        }
    };

    if (serif) {
        onFontChange();
    }

    console.log('You can change the font by setting "serif" variable to true or false. Currently serif is ' + serif + '.');

    var oldFont = serif;
    setInterval(function () {
        if (oldFont != serif) {
            oldFont = serif;
            setCookie('serif', serif, 30);
            onFontChange();
        }
    }, 3000);

    body.on('click', '.serif-switch', function (e) {
        serif = !serif;
    });

    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope:',  registration.scope);
        }).catch(function(error) {
            console.log('ServiceWorker registration failed:', errror);
        });
    }

});
