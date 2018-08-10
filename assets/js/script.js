AOS.init({
    duration: 1200,
})

var mobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
}

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

function scrolledIntoElement(elem) {
    var docViewTop = $(window).scrollTop();
    var elemTop = $(elem).offset().top;

    return docViewTop >= elemTop;
}

function scrolledPassedElement(elem, offset) {
    var docViewTop = $(window).scrollTop();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return docViewTop >= (elemBottom - offset);
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
        return '<div class="card" data-aos="fade-up"><div class="card-header">' + newstile.date + '</div><div class="card-body"><h5 class="card-title">' + newstile.title + '</h5>' + img + '<p class="card-text">' + descriptionSnippet + ' ... </p><button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target=".readmore' + index + '">Read More</button></div></div>'
    }
    function modaltile(newstile, index) {
        return '<div class="modal fade readmore' + index + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">' + newstile.title + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><img src="' + newstile.imageloc + '" width="100%"><div class="modal-body"><p>' + newstile.desc + '</p></div></div></div></div>'
    }

    newstiles.forEach(function (tile, i) {
        var card = cardtile(tile, i);
        var popup = modaltile(tile, i);
        $('div#tiles').append(card);
        $('div#news').append(popup);
    });

    if (mobile) $('div#tiles').width(322 * newstiles.length);
    else $('div#tiles').append('<div class="verti"></div>');
}

function createPopover() {
    function popover(subsystem) {
        return '<div id="' + subsystem.title + '" class="carpart" data-toggle="popover" data-trigger="hover" data-html="true" title="' + subsystem.title + '" style="width:' + subsystem.loc.width + ';height:' + subsystem.loc.height + ';top:' + subsystem.loc.top + ';left:' + subsystem.loc.left + '"  data-content="<div class=\'carpopover\'><img src=\'' + subsystem.leadpic + '\' alt=\'' + subsystem.designlead + '\'><div class=\'popovercontent\'><p><b>System Lead:</b> ' + subsystem.designlead + '</p><p>' + subsystem.desc + '</p></div></div>"></div>'
    }

    carparts.forEach(function (tile) {
        console.log(tile);
        var popov = popover(tile);
        $('div#car').append(popov);
    });

    $(function () {
        $('[data-toggle="popover"]').popover({
            container: 'body'
        })
    })
}

function createSponsorLink() {
    function sponsorimg(tier, link){
        name = link.split('.')[0];
        if (name.includes('_')) name = name.split('_').join(" ");
        return '<img src="assets/images/sponsors/' + tier + '/' + link + '" alt="' + name + '">'
    }
    sponsorlist.platinum.forEach(function(sponsor){
        var sponlink = sponsorimg('platinum', sponsor);
        $("div#platinum").append(sponlink);
    });
    sponsorlist.gold.forEach(function(sponsor){
        var sponlink = sponsorimg('gold', sponsor);
        $("div#gold").append(sponlink);
    });
    sponsorlist.silver.forEach(function(sponsor){
        var sponlink = sponsorimg('silver', sponsor);
        $("div#silver").append(sponlink);
    });
    sponsorlist.bronze.forEach(function(sponsor){
        var sponlink = sponsorimg('bronze', sponsor);
        $("div#bronze").append(sponlink);
    });

}


$(document).ready(function () {
    createNewsTiles();
    $('.page').each(function () {
        scrollpositions.push($(this).offset().top);
        console.log(scrollpositions);
    });
    var file = window.document.location.href.split("/");
    file = file[file.length - 1].split('#');
    file = file[0];
    if (file == 'index.html' || file == '' || file == 'Bajasite') {
        createSponsorLink();
        $(window).scroll(function () {
            if (scrolledIntoElement('#about')) $('nav#mynav').addClass('bg-white');
            else $('nav#mynav').removeClass('bg-white');
        });
    }
    if (file == 'thecar.html') {
        if (!mobile) createPopover();
        $(window).scroll(function () {
            if (scrolledPassedElement('#car', 50)) $('nav#mynav a').addClass('txt-white');
            else $('nav#mynav a').removeClass('txt-white');
        });
    }
});

