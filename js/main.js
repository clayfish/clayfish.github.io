$(document).ready(function () {
    var body = $('body');

    var now = new Date();
    $('.current-year').each(function() {
        $(this).html(now.getFullYear());
    });
});
