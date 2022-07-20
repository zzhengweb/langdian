

// 顶部导航悬浮置顶
$(window).on('ready , scroll', function () {
    if ($(window).scrollTop() > 30) {
        $('#change_nav').addClass('navFixed');
        $('#scroll_round').addClass('add_class');
    } else {
        $('#change_nav').removeClass('navFixed');
        $('#scroll_round').removeClass('add_class');
    }
});

let change_btn = document.getElementById('change_btn');
let isOpen = false;
change_btn.onclick = function () {
    if (isOpen) {
        $("#change_nav").removeClass("open_nav");
        $("#change_nav").addClass("close_nav");
    } else {
        $("#change_nav").addClass("open_nav");
        $("#change_nav").removeClass("close_nav");
    }
    isOpen = !isOpen;
}

let isShow = false;
let popup = document.getElementById('popup');

$("#scroll_round").on("click", function () {
    $('html,body').animate({ scrollTop: 0 }, 500)
})

function client () {
    if (window.innerHeight !== undefined) {
        //ie9及其以上的版本的写法
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {
        //标准模式的写法（有DTD时）
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
    } else {
        //没有DTD时的写法
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}

AOS.init({
    offset: 10,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
});