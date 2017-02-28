//slider
$(document).ready(function()
{
    $('.carousel').carousel();
});

$(function () {

    /* SET PARAMETERS */
    var change_img_time     = 5000;
    var transition_speed    = 200;

    var simple_slideshow    = $("#slider"),
        listItems           = simple_slideshow.children('li'),
        listLen             = listItems.length,
        i                   = 0,

        changeList = function () {
            listItems.eq(i).fadeOut(transition_speed, function () {
                i += 1;
                if (i === listLen) {
                    i = 0;
                }
                listItems.eq(i).fadeIn(transition_speed);
            });

        };

    listItems.not(':first').hide();
    setInterval(changeList, change_img_time);

});

$(document).ready(function()
{
    //slider button
    $("#button").click(function () {
        $('html, body').animate({
            scrollTop: $(".headline-text").offset().top
        }, 1000);
    });

    $("#button1").click(function () {
        $('html, body').animate({
            scrollTop: $(".headline-text").offset().top
        }, 1000);
    });

    $("#button2").click(function () {
        $('html, body').animate({
            scrollTop: $(".headline-text").offset().top
        }, 1000);
    });
})


