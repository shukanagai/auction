$(function(){
    $("#muteBtn").click(function(){
        if(isMute == 0){
            isMute = 1;
            $("#muteBtn").html(`<i class="fas fa-volume-up"></i>`);
        }
        else{
            isMute = 0;
            $("#muteBtn").html(`<i class="fas fa-volume-mute"></i>`);
        }
        console.log(isMute);
    });
});