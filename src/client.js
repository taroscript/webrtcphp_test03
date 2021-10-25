import {
	RemoteHelper,
} from "./remote.js";
import {
  start_createOfferSDP
} from "./webrtc.js"
import {
  onclickCheckbox_CameraMicrophone
} from "./video.js"

console.log("Hello World!");

export const g_elementCheckboxCamera = document.getElementById( "checkbox_camera" );
export const g_elementCheckboxMicrophone = document.getElementById( "checkbox_microphone" );

export const g_elementVideoLocal = document.getElementById( "video_local" );

export const GlobalRTCParms = {
  g_rtcPeerConnection : null
};

export const g_elementTextareaOfferSideOfferSDP = document.getElementById( "textarea_offerside_offersdp" );


export const setEndpoint = (data) => {
  RemoteHelper.endpoints = data;
};

export const abc = () =>{
  console.log("abc func");
};

export const videoStart = () => {
  // offer answerなのか
  // offer sdpの取得
  // offer sdpの格納
  start_createOfferSDP()
  
}

RemoteHelper.prepare(

  (data) => {
    
    console.log(data);
  }
);


export { RemoteHelper, onclickCheckbox_CameraMicrophone };