

export const RemoteHelper = {

  endpoints : {},

  emit : (event,options) => {

    const sdp = options.data.sdp;
    const endpoint = RemoteHelper.endpoints.update_sdp
    $.post(endpoint,{
      sdp : sdp
    }, function(res){
    });
  },

  prepare : (callback) => {

    const endpoint = RemoteHelper.endpoints.getVideo;
    
    console.log("prepare");

    $.ajax({
      type: "GET",
      url:endpoint,
      dataType: "json"
    }).done((data)=>{
      callback(data);
    });
  } 
};
