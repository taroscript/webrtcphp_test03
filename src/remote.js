

export const RemoteHelper = {

  isHost : null,
  
  endpoints : {},

  watingSDP : false,
  
  type : null,

  start : () => {
    console.log("start polling");
    RemoteHelper.waitingSdp = true
  },

  stop : () => {
    console.log("stop polling");
    RemoteHelper.waitingSdp = false
  },

  emit : (event,options) => {

    // amend options.data.typeにoffer answer情報入っているが使わない?
    // offer answerの判別はcontroller側で判定
    const sdp = options.data.sdp;
    const endpoint = RemoteHelper.endpoints.update_sdp

    $.post(endpoint,{
      sdp : sdp
    }, function(res){
    });
  },

  prepare : (offerSide_callback,answerSide_callback) => {
    console.log("prepare");
    
    setInterval(function(){
      
      console.log("prepare setInterval");
      
      if(RemoteHelper.waitingSdp == true){
        console.log("watingSDP = true");
        const endpoint = RemoteHelper.endpoints.get_video_info;
        let callback = null;
        
        if(RemoteHelper.type == "offer"){
          callback = offerSide_callback;
        }
        else if(RemoteHelper.type == "answer"){
          callback = answerSide_callback;
        }else{
          console.log("callback empty")
          return;
        }
        $.ajax({
          type: "GET",
          url:endpoint,
          dataType: "json"
        }).done((data)=>{
          callback(data);
          // amend stopはsetRemoteDescriptionの後に記述した方がいいのか？
          
        });
      }

    }, 5000);
    
    
  }

};
