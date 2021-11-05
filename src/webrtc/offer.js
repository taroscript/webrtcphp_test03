import { 
  g_elementVideoLocal,
  GlobalRTCParms,
} from "../client.js";
import {
    RemoteHelper
} from "../remote.js";
import {
  createPeerConnection
} from "./webrtc.js"

// 「Create OfferSDP.」ボタンを押すと呼ばれる関数
export const start_createOfferSDP = () => {
    //console.log( "UI Event : 'Create Offer SDP.' button clicked." );
    console.log( "Create Offer SDP" );
    //let g_rtcPeerConnection = null;
    if( GlobalRTCParms.g_rtcPeerConnection )
    {   // 既にコネクションオブジェクトあり
        alert( "Connection object already exists." );
        return;
    }
    
    
    // RTCPeerConnectionオブジェクトの作成
    console.log( "Call : createPeerConnection()" );
    let rtcPeerConnection = createPeerConnection( g_elementVideoLocal.srcObject );
    //g_rtcPeerConnection = rtcPeerConnection;    // グローバル変数に設定
    GlobalRTCParms.g_rtcPeerConnection = rtcPeerConnection;

    // OfferSDPの作成
    createOfferSDP( rtcPeerConnection );
    
}

// OfferSDPの作成
const createOfferSDP = ( rtcPeerConnection ) =>{
  // OfferSDPの作成
  console.log( "Call : rtcPeerConnection.createOffer()" );
  rtcPeerConnection.createOffer()
      .then( ( sessionDescription ) =>
      {
          // 作成されたOfferSDPををLocalDescriptionに設定
          console.log( "Call : rtcPeerConnection.setLocalDescription()" );
          return rtcPeerConnection.setLocalDescription( sessionDescription );
      } )
      .then( () =>
      {
          // Vanilla ICEの場合は、まだSDPを相手に送らない
          // Trickle ICEの場合は、初期SDPを相手に送る
      } )
      .catch( ( error ) =>
      {
          console.error( "Error : ", error );
      } );
}


// amend pollingでanswersideのsdpが発行された情報を取得する必要あり。
// 「Set AnswerSDP. Then the chat starts.」ボタンを押すと呼ばれる関数
export function setAnswerSDPthenChatStarts(data){
    // amend buttonではない
    console.log( "UI Event : 'Set AnswerSDP. Then the chat starts.' button clicked." );

    if( !GlobalRTCParms.g_rtcPeerConnection )
    {   // コネクションオブジェクトがない
        alert( "Connection object does not exist." );
        return;
    }
    // const callback = (data) =>{
    // AnswerSDPを、テキストエリアから取得
      
    if( !data.guest_join.answer_sdp ){   
        // AnswerSDPが空
        console.log( "AnswerSDP is empty. Please enter the AnswerSDP." );
        return;
    }

    if(data.guest_join.updated_at<data.host_join.updated_at){
        console.log("Answer sdp isn't updated");
        return;
    }

    let OfferSideAnswerSDP = data.guest_join.answer_sdp + "\r\n";
    console.log("OfferSideAnswerSDP",OfferSideAnswerSDP);
    // AnswerSDPの設定
    let sessionDescription = new RTCSessionDescription( {
        type: "answer",
        sdp: OfferSideAnswerSDP,
    });
    //console.log("OfferSideAnswerSDP",OfferSideAnswerSDP);
    console.log( "Call : setAnswerSDP()" );

    setAnswerSDP( GlobalRTCParms.g_rtcPeerConnection, sessionDescription );
    // }
  
    //   const endpoint = RemoteHelper.endpoints.get_video_info;
    //   $.ajax({
    //       type:"GET",
    //       url:endpoint,
    //       dataType: "json"
    //   }).done((data)=>{
    //       console.log("answer data",data);
    //       callback(data);
    //   });

}

// AnswerSDPの設定
function setAnswerSDP( rtcPeerConnection, sessionDescription )
{
  console.log( "Call : rtcPeerConnection.setRemoteDescription()" );
  rtcPeerConnection.setRemoteDescription( sessionDescription )
    .then( () =>
    {
        RemoteHelper.stop();
    } )
    .catch( ( error ) =>
    {
        console.error( "Error : ", error );
    } );
}