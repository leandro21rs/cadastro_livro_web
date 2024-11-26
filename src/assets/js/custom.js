$(document).ready(function() {

    $(".area-user")
        .mouseover(function() {
            $("#header-overlay").addClass("active");
        })
        .mouseout(function() {
            $("#header-overlay").removeClass("active");
        })

    $("nav ul li ul li > a").on("click", function(event) {
        event.preventDefault();
        $(".cd-close").trigger("click")
        $(".cd-dropdown").hide()
        $(".cd-dropdown").removeClass("dropdown-is-active")
        setTimeout(() => $(".cd-dropdown").show(), 200)
        $(".cd-dropdown-content").removeClass("move-out")
    })

    $("body").on('click', 'ul.p-submenu-list.p-active-submenu', function(valor) {
        $('.p-slidemenu-backward').trigger('click'); //.trigger('click');
        $('.p-component-overlay').trigger('click');
    });

    // $("body").on('click', '.p-sidebar-close', function () {
    //   $('.p-component-overlay').trigger('click');
    // });

    // $("body").on('click', '.p-menuitem-text', function () {
    //   var parent = $(this).parent().find(".p-submenu-icon");
    //   if (parent.length == 0) $('.p-component-overlay').trigger('click');
    // });

    // $("body").on('click', '.p-menuitem-link', function () {
    //   $(".p-sidebar-close-icon").trigger("click");
    // });

    $("body").on('click', '.p-menuitem-link', function() {
        if ($(this).closest('.menuAberto').length > 0) {
            $(".p-sidebar-close-icon").trigger("click");
        }
    });

    // Muda estilo do topo para deixar fixo ao rolar o scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 120) {
            $('#header-top').addClass('header-section-sticked');
        } else {
            $('#header-top').removeClass('header-section-sticked');
        }
    });

});

var hashTagActive = ""; //Scroll SUAVE
$(".scrolling").on("click touchstart", function(event) {
    if (hashTagActive != this.hash) {
        event.preventDefault();
        //calculate destination place
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 500, 'swing');
        hashTagActive = this.hash;
    }
});
