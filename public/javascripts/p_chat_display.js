/* 
p_chatモーダルやメニュー部分の表示・非表示
 */

$(function(){
    $(".p-p_chat_menu__menu-btn--grey").click(function(){
        $(".p-p_chat_menu__main").eq(0).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(6).fadeIn(300);
        },500);
    });

    $("#back_menu5").click(function(){
        $(".p-p_chat_menu__pages").eq(6).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__main").eq(0).fadeIn(300);
        },500);
    });

    $("#back_menu1").click(function(){
        $(".p-p_chat_menu__pages").eq(0).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__main").eq(0).fadeIn(300);
        },500);
    });

    $("#start_total1").click(function(){
        $(".p-p_chat_menu__pages").eq(0).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(1).fadeIn(300);
        },500);
    });

    $("#finish_total1").click(function(){
        $(".p-p_chat_menu__pages").eq(1).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(2).fadeIn(300);
        },500);
    });

    $("#back_menu2").click(function(){
        $(".p-p_chat_menu__pages").eq(2).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__main").eq(0).fadeIn(300);
        },500);
    });

    $(".p-p_chat_menu__menu-btn--perple").click(function(){
        $(".p-p_chat_menu__main").eq(0).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(0).fadeIn(300);
        },500);
    });

    $(".p-p_chat_menu__menu-btn--orange").click(function(){
        $(".p-p_chat_menu__main").eq(0).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(3).fadeIn(300);
        },500);
    });

    $("#back_menu3").click(function(){
        $(".p-p_chat_menu__pages").eq(3).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__main").eq(0).fadeIn(300);
        },500);
    });

    $("#start_total2").click(function(){
        $(".p-p_chat_menu__pages").eq(3).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(4).fadeIn(300);
        },500);
    });

    $("#finish_total2").click(function(){
        $(".p-p_chat_menu__pages").eq(4).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__pages").eq(5).fadeIn(300);
        },500);
    });

    $("#back_menu4").click(function(){
        $(".p-p_chat_menu__pages").eq(5).fadeOut(300);
        setTimeout(function(){
            $(".p-p_chat_menu__main").eq(0).fadeIn(300);
        },500);
    });
});
