
import { 
    RemoteHelper
  } from "../remote.js";

import {
    setStreamToElement
} from "../video.js"

import {
    g_elementVideoLocal,
    g_elementAudioLocal,
    g_elementVideoRemote,
    g_elementAudioRemote,
    g_elementTextareaOfferSideOfferSDP,
    g_elementTextareaAnswerSideAnswerSDP,
    retry,
    GlobalRTCParms
} from "../client.js"

// RTCPeerConnectionオブジェクトの作成
export const createPeerConnection = ( stream ) => {
    console.log("createPeerConnection");
    // RTCPeerConnectionオブジェクトの生成
    let config = { "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" },
        { "urls": "stun:stun1.l.google.com:19302" },
        { "urls": "stun:stun2.l.google.com:19302" },
    ] };
    let rtcPeerConnection = new RTCPeerConnection( config );

    // RTCPeerConnectionオブジェクトのイベントハンドラの構築
    setupRTCPeerConnectionEventHandler( rtcPeerConnection );

    // RTCPeerConnectionオブジェクトのストリームにローカルのメディアストリームを追加
    
    if( stream )
    {
      
        // - 古くは、RTCPeerConnection.addStream(stream) を使用していたが、廃止予定となった。
        //   現在は、RTCPeerConnection.addTrack(track, stream) を使用する。
        stream.getTracks().forEach( ( track ) =>
        {
          rtcPeerConnection.addTrack( track, stream );
        } );
    }
    else
    {
        console.log( "No local stream." );
    }
    
    return rtcPeerConnection;
}



export const setupRTCPeerConnectionEventHandler = ( rtcPeerConnection ) => {

    rtcPeerConnection.onnegotiationneeded = () =>
    {
        console.log( "Event : Negotiation needed" );
    };

    // ICE candidate
    //  https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate
    rtcPeerConnection.onicecandidate = ( event ) =>
    {
        console.log( "Event : ICE candidate" );
        if( event.candidate )
        {   // ICE candidateがある
            console.log( "- ICE candidate : ", event.candidate );

            // Vanilla ICEの場合は、何もしない
            // Trickle ICEの場合は、ICE candidateを相手に送る
        }
        else
        {   // ICE candiateがない = ICE candidate の収集終了。
            console.log( "- ICE candidate : empty" );
        }
    };

    // ICE candidate error
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidateerror
    rtcPeerConnection.onicecandidateerror = ( event ) =>
    {
        console.error( "Event : ICE candidate error. error code : ", event.errorCode );
    };

    // ICE gathering state change イベントが発生したときのイベントハンドラ
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange
    rtcPeerConnection.onicegatheringstatechange = () =>
    {
        console.log( "Event : ICE gathering state change" );
        console.log( "- ICE gathering state : ", rtcPeerConnection.iceGatheringState );

        if( "complete" === rtcPeerConnection.iceGatheringState )
        {   
            if("offer" == rtcPeerConnection.localDescription.type)
            {
                // Vanilla ICEの場合は、ICE candidateを含んだOfferSDP/AnswerSDPを相手に送る
                // Trickle ICEの場合は、何もしない

                // Offer側のOfferSDP用のテキストエリアに貼付
                // amend 以下不要
                console.log( "- Set OfferSDP in textarea" );

                // g_elementTextareaOfferSideOfferSDP.value = rtcPeerConnection.localDescription.sdp;
                // g_elementTextareaOfferSideOfferSDP.focus();
                // g_elementTextareaOfferSideOfferSDP.select();
                
                RemoteHelper.emit("signaling",{ type:"offer", data:rtcPeerConnection.localDescription } );
                // ここにstart入れている理由は何だっけ??? offer側がanswer側sdpをセットする処理の開始のため
                RemoteHelper.start();
            }
            else if( "answer" === rtcPeerConnection.localDescription.type )
            {
                // Answer側のAnswerSDP用のテキストエリアに貼付
                console.log( "- Set AnswerSDP in textarea" );
                // g_elementTextareaAnswerSideAnswerSDP.value = rtcPeerConnection.localDescription.sdp;
                // g_elementTextareaAnswerSideAnswerSDP.focus();
                // g_elementTextareaAnswerSideAnswerSDP.select();
                
                // amend 上のコードと重複部分消せない?
                RemoteHelper.emit("signaling",{ type:"answer", data:rtcPeerConnection.localDescription } );
                
            }
            else
            {
                console.error( "Unexpected : Unknown localDescription.type. type = ", rtcPeerConnection.localDescription.type );
            }
        }
        
    };

    // ICE connection state change イベントが発生したときのイベントハンドラ
    //   https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceconnectionstatechange_event
    rtcPeerConnection.oniceconnectionstatechange = () =>
    {
        console.log( "Event : ICE connection state change" );
        console.log( "- ICE connection state : ", rtcPeerConnection.iceConnectionState );
        console.log("test:",rtcPeerConnection.iceConnectionState);
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
        if(rtcPeerConnection.iceConnectionState == "disconnected"){
            console.log("retry");
            //console.log("RemoteHelper.isHost",RemoteHelper.isHost);
            // if(RemoteHelper.type == "offer"){
            //     // host切断時は、offerから再作成するため１からリトライ
            //     retry();
            // }
            // else if(RemoteHelper.type == "answer" ){
            //     //guest切断時は、offer再設定するための、初期化処理
            //     GlobalRTCParms.g_rtcPeerConnection = null;
            // }
            retry();
            
        }
    };

    // Signaling state change
    //https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange
    rtcPeerConnection.onsignalingstatechange = () =>
    {
        console.log( "Event : Signaling state change" );
        console.log( "- Signaling state : ", rtcPeerConnection.signalingState );
    };

    // Connection state change
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange
    rtcPeerConnection.onconnectionstatechange = () =>
    {
        console.log( "Event : Connection state change" );
        console.log( "- Connection state : ", rtcPeerConnection.connectionState );
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
    };

    // Track
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
    rtcPeerConnection.ontrack = ( event ) =>
    {
        console.log( "Event : Track" );
        console.log( "- stream", event.streams[0] );
        console.log( "- track", event.track );
        // HTML要素へのリモートメディアストリームの設定
        let stream = event.streams[0];
        let track = event.track;
        if( "video" === track.kind )
        {
            console.log( "Call : setStreamToElement( Video_Remote, stream )" );
            setStreamToElement( g_elementVideoRemote, stream );
        }
        else if( "audio" === track.kind )
        {
            console.log( "Call : setStreamToElement( Audio_Remote, stream )" );
            setStreamToElement( g_elementAudioRemote, stream );
        }
        else
        {
            console.error( "Unexpected : Unknown track kind : ", track.kind );
        }
    };
}
