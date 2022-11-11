/* 
ｃ_chatモーダルやメニュー部分の表示・非表示
 */

$(function(){
    $(".p-c_chat_modal__button-wrap").click(function(){
        const index = $(".p-c_chat_modal__button-wrap").index(this);
        $(".p-c_chat_modal").eq(index).fadeOut(300).css("display","flex");
    });

    $(".p-c_chat_menu__menu-btn").click(function(){
        const index = $(".p-c_chat_menu__menu-btn").index(this);
        $(".p-c_chat_modal").eq(index).fadeIn(300).css("display","flex");
    });

    $(".p-c_chat_menu__menu-button").eq(0).click(function(){
        $(".p-c_chat_menu__menu--close").eq(0).addClass("p-c_chat_menu__menu").removeClass("p-c_chat_menu__menu--close");
    });
    $(".p-c_chat_menu__close").eq(0).click(function(){
        $(".p-c_chat_menu__menu").eq(0).addClass("p-c_chat_menu__menu--close").removeClass("p-c_chat_menu__menu");
    });

    $("#members").click(function(){
        $(".p-c_chat_modal").eq(2).fadeIn(300).css("display","flex");
    });
});
