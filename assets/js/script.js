AOS.init({
    duration: 1200,
})

var mobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
}

$('.pages').scrollspy({ target: '#naviconlist' })

// $('body').bind('mousewheel', function (e) {
//     if (e.preventDefault) { e.preventDefault(); }
//     e.returnValue = false;
//     return false;
// });

var currentpage = 0;
var scrollpositions = []
var scrolllock = false;

pages = ["#about", "#news", "#team"];

function isScrolledIntoView(elem) {
    var offset = 0;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom - offset <= docViewBottom) && (elemTop + offset >= docViewTop));
}

function unlockscroll() {
    setTimeout(function () { scrolllock = false; }, 100)
}

var consecutivedown = 0;
var consecutiveup = 0;
function inarow(delta) {
    var margin = 5;
    if (delta <= 0) {
        consecutiveup = 0;
        consecutivedown++;
    }
    else {
        consecutivedown = 0;
        consecutiveup++;
    }
    console.log(consecutivedown, consecutiveup);
    if (consecutivedown == margin) {
        consecutivedown = 0;
        return -1;
    }
    if (consecutiveup == margin) {
        consecutiveup = 0;
        return 1;
    }
    return 0;
}

function createNewsTiles() {
    function cardtile(newstile, index) {
        var img = '';
        if (newstile.imageloc != "" && newstile.imageloc != "None")
            img = '<img class="card-img-top" src="' + newstile.imageloc + '" alt="Card image cap">';
        descriptionSnippet = newstile.desc.substring(0, 200);
        return '<div class="card" data-aos="fade-up"><div class="card-header">' + newstile.date + '</div><div class="card-body"><h5 class="card-title">' + newstile.title + '</h5>' + img + '<p class="card-text">' + descriptionSnippet + ' ... </p><button type="button" class="btn btn-light" data-toggle="modal" data-target=".readmore' + index + '">Read More</button></div></div>'
    }
    function modaltile(newstile, index) {
        return '<div class="modal fade readmore' + index + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">' + newstile.title + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><img src="' + newstile.imageloc + '" width="100%"><div class="modal-body"><p>' + newstile.desc + '</p></div></div></div></div>'
    };

    newstiles.forEach(function (tile, i) {
        var card = cardtile(tile, i);
        var popup = modaltile(tile, i);
        $('div#tiles').append(card);
        $('div#news').append(popup);
    });
   
    if (mobile) $('div#tiles').width(322 * newstiles.length);
    else  $('div#tiles').append('<div class="verti"></div>');
}


$(document).ready(function () {
    createNewsTiles();
    $('.page').each(function () {
        scrollpositions.push($(this).offset().top);
        console.log(scrollpositions);
    });

    // $('body').bind('mousewheel', function (e) {
    //     if (!scrolllock) {
    //         var delta = e.originalEvent.wheelDelta;
    //         scrolldir = inarow(delta);
    //         if (scrolldir == -1) {
    //             currentpage++;
    //             if (currentpage == scrollpositions.length) currentpage = scrollpositions.length - 1;
    //             console.log("down");
    //             scrolllock = true;
    //             $("html, body").animate({
    //                 scrollTop: "" + scrollpositions[currentpage] + "px"
    //             }, 500, unlockscroll);
    //             console.log("Scrolling to " + scrollpositions[currentpage]);
    //         }
    //         if (scrolldir == 1) {
    //             currentpage--;
    //             if (currentpage == -1) currentpage = 0;
    //             console.log("up")
    //             scrolllock = true;
    //             $("html, body").animate({
    //                 scrollTop: "" + scrollpositions[currentpage] + "px"
    //             }, 500, unlockscroll);
    //             console.log("Scrolling to " + "" + scrollpositions[currentpage] + "px");
    //         }
    //     }
    // });

    // $(window).watch('scrollTop()', function (id, old, newo ) {
    //     $('li.nav-item').each(function () {
    //         $(this).removeClass('active');
    //     });
    //     pages.forEach(function (element) {
    //         if (isScrolledIntoView(element)) {
    //             console.log(element);
    //             $('li.nav-item > a[href$="' + element + '"]').parent().addClass('active');
    //         }
    //     });
    // });

});

