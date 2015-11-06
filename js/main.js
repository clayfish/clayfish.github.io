var DEV_MODE = true;

$(document).ready(function () {
    var body = $('body');

    var now = new Date();
    $('.current-year').each(function() {
        $(this).html(now.getFullYear());
    });

    if(DEV_MODE) {
        body.find('.site-content').html("We are building it up for you.");
    }

});
