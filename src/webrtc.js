import { 
  g_elementVideoLocal,
  GlobalRTCParms,
  g_elementTextareaOfferSideOfferSDP,
  RemoteHelper
} from "./client";

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


// RTCPeerConnectionオブジェクトの作成
export const createPeerConnection = ( stream ) => {
    console.log("createPeerConnection");
    // RTCPeerConnectionオブジェクトの生成
    let config = { "iceServers": [] };
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

// RTCPeerConnectionオブジェクトのイベントハンドラの構築
export const setupRTCPeerConnectionEventHandler = ( rtcPeerConnection ) => {
    // Negotiation needed イベントが発生したときのイベントハンドラ
    // - このイベントは、セッションネゴシエーションを必要とする変更が発生したときに発生する。
    //   一部のセッション変更はアンサーとしてネゴシエートできないため、このネゴシエーションはオファー側として実行されなければならない。
    //   最も一般的には、negotiationneededイベントは、RTCPeerConnectionに送信トラックが追加された後に発生する。
    //   ネゴシエーションがすでに進行しているときに、ネゴシエーションを必要とする方法でセッションが変更された場合、
    //   ネゴシエーションが完了するまで、negotiationneededイベントは発生せず、ネゴシエーションがまだ必要な場合にのみ発生する。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded
    rtcPeerConnection.onnegotiationneeded = () =>
    {
        console.log( "Event : Negotiation needed" );
    };

    // ICE candidate イベントが発生したときのイベントハンドラ
    // - これは、ローカルのICEエージェントがシグナリング・サーバを介して
    //   他のピアにメッセージを配信する必要があるときはいつでも発生する。
    //   これにより、ブラウザ自身がシグナリングに使用されている技術についての詳細を知る必要がなく、
    //   ICE エージェントがリモートピアとのネゴシエーションを実行できるようになる。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate
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

    // ICE candidate error イベントが発生したときのイベントハンドラ
    // - このイベントは、ICE候補の収集処理中にエラーが発生した場合に発生する。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidateerror
    rtcPeerConnection.onicecandidateerror = ( event ) =>
    {
        console.error( "Event : ICE candidate error. error code : ", event.errorCode );
    };

    // ICE gathering state change イベントが発生したときのイベントハンドラ
    // - このイベントは、ICE gathering stateが変化したときに発生する。
    //   言い換えれば、ICEエージェントがアクティブに候補者を収集しているかどうかが変化したときに発生する。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange
    rtcPeerConnection.onicegatheringstatechange = () =>
    {
        console.log( "Event : ICE gathering state change" );
        console.log( "- ICE gathering state : ", rtcPeerConnection.iceGatheringState );

        if( "complete" === rtcPeerConnection.iceGatheringState )
        {
            // Vanilla ICEの場合は、ICE candidateを含んだOfferSDP/AnswerSDPを相手に送る
            // Trickle ICEの場合は、何もしない

            // Offer側のOfferSDP用のテキストエリアに貼付
            console.log( "- Set OfferSDP in textarea" );

            g_elementTextareaOfferSideOfferSDP.value = rtcPeerConnection.localDescription.sdp;
            g_elementTextareaOfferSideOfferSDP.focus();
            g_elementTextareaOfferSideOfferSDP.select();
            RemoteHelper.emit("signaling",{ type:"offer", data:rtcPeerConnection.localDescription } )
        }
    };

    // ICE connection state change イベントが発生したときのイベントハンドラ
    // - このイベントは、ネゴシエーションプロセス中にICE connection stateが変化するたびに発生する。 
    // - 接続が成功すると、通常、状態は「new」から始まり、「checking」を経て、「connected」、最後に「completed」と遷移します。 
    //   ただし、特定の状況下では、「connected」がスキップされ、「checking」から「completed」に直接移行する場合があります。
    //   これは、最後にチェックされた候補のみが成功した場合に発生する可能性があり、成功したネゴシエーションが完了する前に、
    //   収集信号と候補終了信号の両方が発生します。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceconnectionstatechange_event
    rtcPeerConnection.oniceconnectionstatechange = () =>
    {
        console.log( "Event : ICE connection state change" );
        console.log( "- ICE connection state : ", rtcPeerConnection.iceConnectionState );
        // "disconnected" : コンポーネントがまだ接続されていることを確認するために、RTCPeerConnectionオブジェクトの少なくとも
        //                  1つのコンポーネントに対して失敗したことを確認します。これは、"failed "よりも厳しいテストではなく、
        //                  断続的に発生し、信頼性の低いネットワークや一時的な切断中に自然に解決することがあります。問題が
        //                  解決すると、接続は "接続済み "の状態に戻ることがあります。
        // "failed"       : ICE candidateは、すべての候補のペアを互いにチェックしたが、接続のすべてのコンポーネントに
        //                  互換性のあるものを見つけることができなかった。しかし、ICEエージェントがいくつかの
        //                  コンポーネントに対して互換性のある接続を見つけた可能性がある。
        // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
    };

    // Signaling state change イベントが発生したときのイベントハンドラ
    // - このイベントは、ピア接続のsignalStateが変化したときに送信される。
    //   これは、setLocalDescription（）またはsetRemoteDescription（）の呼び出しが原因で発生する可能性がある。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange
    rtcPeerConnection.onsignalingstatechange = () =>
    {
        console.log( "Event : Signaling state change" );
        console.log( "- Signaling state : ", rtcPeerConnection.signalingState );
    };

    // Connection state change イベントが発生したときのイベントハンドラ
    // - このイベントは、ピア接続の状態が変化したときに送信される。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange
    rtcPeerConnection.onconnectionstatechange = () =>
    {
        console.log( "Event : Connection state change" );
        console.log( "- Connection state : ", rtcPeerConnection.connectionState );
        // "disconnected" : 接続のためのICEトランスポートの少なくとも1つが「disconnected」状態であり、
        //                  他のトランスポートのどれも「failed」、「connecting」、「checking」の状態ではない。
        // "failed"       : 接続の1つ以上のICEトランスポートが「失敗」状態になっている。
        // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
    };

    // Track イベントが発生したときのイベントハンドラ
    // - このイベントは、新しい着信MediaStreamTrackが作成され、
    //   コネクション上のレシーバーセットに追加されたRTCRtpReceiverオブジェクトに関連付けられたときに送信される。
    //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
    // - 古くは、rtcPeerConnection.onaddstream に設定していたが、廃止された。
    //   現在は、rtcPeerConnection.ontrack に設定する。
    rtcPeerConnection.ontrack = ( event ) =>
    {
        console.log( "Event : Track" );
        console.log( "- stream", event.streams[0] );
        console.log( "- track", event.track );
    };
}
