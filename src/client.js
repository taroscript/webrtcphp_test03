import {
	RemoteHelper,
} from "./remote.js";

import {
  start_createOfferSDP,
  setAnswerSDPthenChatStarts
} from "./webrtc/offer.js"

import {
  setOfferSDPandCreateAnswerSDP  
} from "./webrtc/answer.js"

import {
  onclickCheckbox_CameraMicrophone,
  mediaManeger
} from "./video.js"

console.log("Hello World!");

export const g_elementCheckboxCamera = document.getElementById( "checkbox_camera" );
export const g_elementCheckboxMicrophone = document.getElementById( "checkbox_microphone" );

export const g_elementVideoLocal = document.getElementById( "video_local" );
export const g_elementAudioLocal = document.getElementById( "audio_local" );
export const g_elementVideoRemote = document.getElementById( "video_remote" );
export const g_elementAudioRemote = document.getElementById( "audio_remote" );

export const GlobalRTCParms = {
  g_rtcPeerConnection : null
};

export const g_elementTextareaOfferSideOfferSDP = document.getElementById( "textarea_offerside_offersdp" );
export const g_elementTextareaAnswerSideAnswerSDP = document.getElementById( "textarea_answerside_answersdp" );


export const setEndPoint = (data) => {
  RemoteHelper.endpoints = data;
};

export const connectionType = (type) => {
  RemoteHelper.type = type;
}


// amend isHostはhostではないとundefinedになっているからconnectionTypeに変更したい。
export const videoStart = (isHost) => {

  console.log("videoStart")
  
  
  mediaManeger.bCamera_new = true;
  g_elementCheckboxCamera.checked=true;
  mediaManeger.bMicrophone_new = true;
  
  onclickCheckbox_CameraMicrophone(()=>{
    //hostならcreateoffersdp,guestならanswersdp作成
    console.log("isHost",isHost);
    GlobalRTCParms.g_rtcPeerConnection = null;
    if(isHost){
      console.log("host");
      start_createOfferSDP();
    }else{
      //console.log("guset");
      //setOfferSDPandCreateAnswerSDP();
      RemoteHelper.start();
    }
  })
    
}

export const retry = () => {
  GlobalRTCParms.g_rtcPeerConnection = null;
  
  if(RemoteHelper.type=="offer"){
    console.log("host");
    start_createOfferSDP();
  }
  else if(RemoteHelper.type="answer"){
    //console.log("guset");
    //setOfferSDPandCreateAnswerSDP();
    RemoteHelper.start();
  }
}

RemoteHelper.prepare(

  // offer side
  (data) => {
    setAnswerSDPthenChatStarts(data);
  },
  //answer side
  //setOfferSDPandCreateAnswerSDP(data)
  (data) =>{
    setOfferSDPandCreateAnswerSDP(data);
  }
);


export { RemoteHelper, 
  onclickCheckbox_CameraMicrophone,
  setAnswerSDPthenChatStarts };