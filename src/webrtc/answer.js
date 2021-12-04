import { 
  g_elementVideoLocal,
  GlobalRTCParms,
  RemoteHelper,
} from "../client.js";
import {
  createPeerConnection
} from "./webrtc.js"



// prepareに渡すcallback関数に変更
export const setOfferSDPandCreateAnswerSDP = (data) =>{
  // amend UI Eventではない
  console.log( "UI Event : 'Set OfferSDP and Create AnswerSDP.' button clicked." );

  if( GlobalRTCParms.g_rtcPeerConnection )
  {   // 既にコネクションオブジェクトあり
      alert( "Connection object already exists." );
      return;
  }
  
  // const callback = (data) =>{
  
  // amend もっと上手い判定の仕方はないのか
  if( !data.host_join.offer_sdp ){   // OfferSDPが空
      console.log( "OfferSDP is empty. Please enter the OfferSDP." );
      return;
  }

  let strOfferSDP = data.host_join.offer_sdp + "\r\n";
  
  // RTCPeerConnectionオブジェクトの作成
  console.log( "Call : createPeerConnection()" );
  let rtcPeerConnection = createPeerConnection( g_elementVideoLocal.srcObject );
  GlobalRTCParms.g_rtcPeerConnection = rtcPeerConnection;    // グローバル変数に設定

  // OfferSDPの設定とAnswerSDPの作成
  let sessionDescription = new RTCSessionDescription( {
      type: "offer",
      sdp: strOfferSDP,
  } );
  
  console.log( "Call : setOfferSDP_and_createAnswerSDP()" );
  setOfferSDP_and_createAnswerSDP( rtcPeerConnection, sessionDescription );
  // }

  // const endpoint = RemoteHelper.endpoints.get_video_info;

  // $.ajax({
  //     type:"GET",
  //     url:endpoint,
  //     dataType: "json"
  // }).done((data)=>{
  //     callback(data.host_join);

  // })

}

// OfferSDPの設定とAnswerSDPの作成
// amend 関数名何とかならない？上とほぼかぶっている
function setOfferSDP_and_createAnswerSDP( rtcPeerConnection, sessionDescription )
{
  console.log( "Call : rtcPeerConnection.setRemoteDescription()" );
  console.log("sessionDescription",sessionDescription);
  rtcPeerConnection.setRemoteDescription( sessionDescription )
      .then( () =>
      {
          // AnswerSDPの作成
          console.log( "Call : rtcPeerConnection.createAnswer()" );
          return rtcPeerConnection.createAnswer();
      } )
      .then( ( sessionDescription ) =>
      {
          // 作成されたAnswerSDPををLocalDescriptionに設定
          console.log( "Call : rtcPeerConnection.setLocalDescription()" );
          return rtcPeerConnection.setLocalDescription( sessionDescription );
      } )
      .then( () =>
      {
          RemoteHelper.stop();
      } )
      .catch( ( error ) =>
      {
          console.error( "Error : ", error );
      } );
}