var DEV_MODE = true;
var DEV_MODE_APPLIED = DEV_MODE && location.href.indexOf("localhost")>-1;

$(document).ready(function () {
    var body = $('body');

    var now = new Date();
    $('.current-year').each(function() {
        $(this).html(now.getFullYear());
    });

    if(!DEV_MODE_APPLIED) {
        body.find('.site-content').html("We are building it up for you.");
    }

});
