socket.on("getChatLog",function(logs){
    for(let i in logs){
        let log = logs[i];
        if(log.type == "message"){
            if(log.userId == id){
                $("#main_chat").append(`
                    <div class="p-c_chat-main__talk-box-me">
	                    <div class="p-c_chat-main__balloon-me">
		                    ${log.content}
	                    </div>
	                    <div class="p-c_chat-main__post-time-me">${returnTime(log.timeStamp)}</div>
                    </div>
                `);
            }
            else{
                $("#main_chat").append(`
                    <div class="p-c_chat-main__talk-box">
                        <div class="p-c_chat-main__icon-img"></div>
                        <div class="p-c_chat-main__user-name">${log.userName}</div>
                        <div class="p-c_chat-main__balloon">
                            ${log.content}
                        </div>
                        <div class="p-c_chat-main__post-time">${returnTime(log.timeStamp)}</div>
                    </div>
                `);
            }
        }
    }
});

function returnTime(timeStamp){
    timeStamp = timeStamp.split(' ');
    timeStamp = timeStamp[1].substr(0, 5);
    if(timeStamp.substr(4, 1) == ":") {
        timeStamp = "0" + timeStamp.substr(0, 4);
    }
    return timeStamp;
}