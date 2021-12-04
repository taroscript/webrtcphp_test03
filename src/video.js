import { 
  g_elementCheckboxCamera,
  g_elementCheckboxMicrophone,
  g_elementVideoLocal,
  g_elementVideoRemote
} from "./client.js";

export const mediaManeger = {

    bCamera_new : false

}

// カメラとマイクのOn/Offのチェックボックスを押すと呼ばれる関数
export const onclickCheckbox_CameraMicrophone = (callback) => {
    console.log( "UI Event : Camera/Microphone checkbox clicked." );

    // これまでの状態
    let trackCamera_old = null;
    let trackMicrophone_old = null;
    let bCamera_old = false;
    let bMicrophone_old = false;
    let stream = g_elementVideoLocal.srcObject;
    if( stream )
    {
        trackCamera_old = stream.getVideoTracks()[0];
        if( trackCamera_old )
        {
            bCamera_old = true;
        }
        trackMicrophone_old = stream.getAudioTracks()[0];
        if( trackMicrophone_old )
        {
            bMicrophone_old = true;
        }
    }

    // 今後の状態
    
    // video startを押したら開始
    // video startを押していなくても、チェックフラグ＝trueで開始
    // チェックフラグ=falseで停止
    let bCamera_new = false;
    bCamera_new = mediaManeger.bCamera_new;

    if( g_elementCheckboxCamera.checked == false )
    {
        bCamera_new = false;
    }
    else{
        bCamera_new = true;
    }

    let bMicrophone_new = false;
    bMicrophone_new = mediaManeger.bMicrophone_new;
    if( g_elementCheckboxMicrophone.checked == false )
    {
        bMicrophone_new = false;
    }
    else{
        bMicrophone_new = true;
    }

    
    console.log( "Camera :  %s => %s", bCamera_old, bCamera_new );
    console.log( "Microphoneo : %s = %s", bMicrophone_old, bMicrophone_new );

    if( bCamera_old === bCamera_new && bMicrophone_old === bMicrophone_new )
    {   
        if(callback)callback();
        return;
    }
    console.log("trackCamera_old",trackCamera_old);
 
    if( trackCamera_old )
    {
        console.log( "Call : trackCamera_old.stop()" );
        trackCamera_old.stop();
    }
    if( trackMicrophone_old )
    {
        console.log( "Call : trackMicrophone_old.stop()" );
        trackMicrophone_old.stop();
    }
    // HTML要素のメディアストリームの解除
    console.log( "Call : setStreamToElement( Video_Local, null )" );
    setStreamToElement( g_elementVideoLocal, null );

    if( !bCamera_new && !bMicrophone_new )
    {   
        return;
    }

    console.log( "Call : navigator.mediaDevices.getUserMedia( video=%s, audio=%s )", bCamera_new, bMicrophone_new );
    navigator.mediaDevices.getUserMedia( { video: bCamera_new, audio: bMicrophone_new } )
        .then( ( stream ) =>
        {
            // HTML要素へのメディアストリームの設定
            console.log( "Call : setStreamToElement( Video_Local, stream )" );
            setStreamToElement( g_elementVideoLocal, stream );
            console.log("setStreamToElement complete")
            if(callback)callback();
        } )
        .catch( ( error ) =>
        {
            // メディアストリームの取得に失敗⇒古いメディアストリームのまま。チェックボックスの状態を戻す。
            console.error( "Error : ", error );
            alert( "Could not start Camera." );
            g_elementCheckboxCamera.checked = false;
            g_elementCheckboxMicrophone.checked = false;
            return;
        } );
}

export function setStreamToElement( elementMedia, stream )
{   
    console.log("setStreamToElement")
    elementMedia.srcObject = stream;

    if( !stream )
    {   // メディアストリームの設定解除の場合は、ここで処理終了
        return;
    }

    // 音量
    if( "VIDEO" === elementMedia.tagName )
    {   
        elementMedia.volume = 0.0;
        elementMedia.muted = true;
    }
    else if( "AUDIO" === elementMedia.tagName )
    {   
        elementMedia.volume = 1.0;
        elementMedia.muted = false;
    }
    else
    {
        console.error( "Unexpected : Unknown ElementTagName : ", elementMedia.tagName );
    }
}