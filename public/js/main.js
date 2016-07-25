'use strict'
 


var $win = $(window)
var $cardimg = $('.carder-img')
var $cardhead = $('.carder-head')
var $cardtext = $('.carder-text')

$(document).scroll( function () {
    if(window.innerWidth > 992){
        if ( $win.scrollTop() + 200 > $('#design').offset().top ) {
            $cardimg.css('height', '290px')
            $cardhead.css('top', '-180px')
            $cardhead.css('background-color', 'rgba(132, 147, 182, 0.85)')
            $cardhead.css('color', 'white')
            $cardtext.css('padding-top', '30px')
        } else {
            $cardimg.css('height', '150px')
            $cardhead.css('top', '30px')
            $cardhead.css('background-color', 'inherit')
            $cardhead.css('color', 'rgba(132, 147, 182, 1)')
            $cardtext.css('padding-top', '90px')
        }
    }
    
})



$(document).ready(function() {
    // parallal init
    $.Scrollax()

    if(window.innerWidth > 992){
        // skrollr
        var s = skrollr.init()
    }



    // mobile nav toggle
    $('.nav-button').click(function(){
        $('nav ul').toggleClass('navbar-main')
    })
    $('nav ul a').click(function(){
        $('nav ul').toggleClass('navbar-main')
    })



    // auto resize textareas when adding text
    autosize($('textarea'))



    // get all a href links inside nav element and add click event
    $('a[href*="#"]', 'nav').add('.scrollElement').click(function(e) {

        e.preventDefault() // prevent hard jump

        var target = $(this).attr("href")// get clicked element
        if($(target).offset()){
            // get top position of target element and set as scroll target
            $('html, body').animate({
                    scrollTop: $(target).offset().top -90 
            }, 1000, function() {
                    // callback after animation to change url hash
                    location.hash = target
            })
        }
        return
    })



    // form submission
    $('form').submit(function (e) {
        e.preventDefault()

        var email = $.trim($('#email', 'form').val())
        var name = $.trim($('#name', 'form').val())
        var message = $.trim($('#message', 'form').val())

        $.post('https://lmerza.com/api/contactform', {email:email, name:name, message:message, recaptcha:grecaptcha.getResponse()}, function (data) {
            grecaptcha.reset()
            
            if(data.error) {
                $('.error').html(data.error)
                $('.btn', 'form').html('send')

            } else {
                $('.btn', 'form').html(data.info)
                $('.error').html('')
                $('#Email').val('')
                $('#Name').val('')
                $('#Message').val('')
            }
        })
        return
    })



    // navbar scroll color chaning effect
    var scroll_pos = 0;
    var animation_begin_pos = 0;
    var animation_end_pos = 1000;
    var beginning_color = new $.Color( 'rgba(87, 106, 151, 1)' );
    var ending_color = new $.Color( 'rgba( 10, 28, 68, 1)' );
    $(document).scroll(function() {
        // get current scroll position
        scroll_pos = $(this).scrollTop();
        // if current position is inbetween start and end position then do animation
        if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) {
            // get percent of animation left in scroll area
            var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );

            // create rgb colors based off of scroll percent left in anaimation and create new color object
            var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
            var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
            var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );

            // animate to computed colo or end/start color if out of scroll animation range
            $('nav').animate({ backgroundColor: newColor }, 0);
        } else if ( scroll_pos > animation_end_pos ) {
             $('nav').animate({ backgroundColor: ending_color }, 0);
        } else if ( scroll_pos < animation_begin_pos ) {
             $('nav').animate({ backgroundColor: beginning_color }, 0);
        }
    })   
})
