var mywebrtc;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g_elementCheckboxCamera": () => (/* binding */ g_elementCheckboxCamera),
/* harmony export */   "g_elementCheckboxMicrophone": () => (/* binding */ g_elementCheckboxMicrophone),
/* harmony export */   "g_elementVideoLocal": () => (/* binding */ g_elementVideoLocal),
/* harmony export */   "g_elementAudioLocal": () => (/* binding */ g_elementAudioLocal),
/* harmony export */   "g_elementVideoRemote": () => (/* binding */ g_elementVideoRemote),
/* harmony export */   "g_elementAudioRemote": () => (/* binding */ g_elementAudioRemote),
/* harmony export */   "GlobalRTCParms": () => (/* binding */ GlobalRTCParms),
/* harmony export */   "g_elementTextareaOfferSideOfferSDP": () => (/* binding */ g_elementTextareaOfferSideOfferSDP),
/* harmony export */   "g_elementTextareaAnswerSideAnswerSDP": () => (/* binding */ g_elementTextareaAnswerSideAnswerSDP),
/* harmony export */   "setEndPoint": () => (/* binding */ setEndPoint),
/* harmony export */   "connectionType": () => (/* binding */ connectionType),
/* harmony export */   "videoStart": () => (/* binding */ videoStart),
/* harmony export */   "retry": () => (/* binding */ retry),
/* harmony export */   "RemoteHelper": () => (/* reexport safe */ _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper),
/* harmony export */   "onclickCheckbox_CameraMicrophone": () => (/* reexport safe */ _video_js__WEBPACK_IMPORTED_MODULE_3__.onclickCheckbox_CameraMicrophone),
/* harmony export */   "setAnswerSDPthenChatStarts": () => (/* reexport safe */ _webrtc_offer_js__WEBPACK_IMPORTED_MODULE_1__.setAnswerSDPthenChatStarts)
/* harmony export */ });
/* harmony import */ var _remote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./remote.js */ "./src/remote.js");
/* harmony import */ var _webrtc_offer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webrtc/offer.js */ "./src/webrtc/offer.js");
/* harmony import */ var _webrtc_answer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webrtc/answer.js */ "./src/webrtc/answer.js");
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./video.js */ "./src/video.js");




console.log("Hello World!");
var g_elementCheckboxCamera = document.getElementById("checkbox_camera");
var g_elementCheckboxMicrophone = document.getElementById("checkbox_microphone");
var g_elementVideoLocal = document.getElementById("video_local");
var g_elementAudioLocal = document.getElementById("audio_local");
var g_elementVideoRemote = document.getElementById("video_remote");
var g_elementAudioRemote = document.getElementById("audio_remote");
var GlobalRTCParms = {
  g_rtcPeerConnection: null
};
var g_elementTextareaOfferSideOfferSDP = document.getElementById("textarea_offerside_offersdp");
var g_elementTextareaAnswerSideAnswerSDP = document.getElementById("textarea_answerside_answersdp");
var setEndPoint = function setEndPoint(data) {
  _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.endpoints = data;
};
var connectionType = function connectionType(type) {
  _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.type = type;
}; // amend isHost???host???????????????undefined????????????????????????connectionType?????????????????????

var videoStart = function videoStart(isHost) {
  console.log("videoStart");
  _video_js__WEBPACK_IMPORTED_MODULE_3__.mediaManeger.bCamera_new = true;
  g_elementCheckboxCamera.checked = true;
  _video_js__WEBPACK_IMPORTED_MODULE_3__.mediaManeger.bMicrophone_new = true;
  (0,_video_js__WEBPACK_IMPORTED_MODULE_3__.onclickCheckbox_CameraMicrophone)(function () {
    //host??????createoffersdp,guest??????answersdp??????
    console.log("isHost", isHost);
    GlobalRTCParms.g_rtcPeerConnection = null;

    if (isHost) {
      console.log("host");
      (0,_webrtc_offer_js__WEBPACK_IMPORTED_MODULE_1__.start_createOfferSDP)();
    } else {
      //console.log("guset");
      //setOfferSDPandCreateAnswerSDP();
      _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.start();
    }
  });
};
var retry = function retry() {
  GlobalRTCParms.g_rtcPeerConnection = null;

  if (_remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.type == "offer") {
    console.log("host");
    (0,_webrtc_offer_js__WEBPACK_IMPORTED_MODULE_1__.start_createOfferSDP)();
  } else if (_remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.type = "answer") {
    //console.log("guset");
    //setOfferSDPandCreateAnswerSDP();
    _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.start();
  }
};
_remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.prepare( // offer side
function (data) {
  (0,_webrtc_offer_js__WEBPACK_IMPORTED_MODULE_1__.setAnswerSDPthenChatStarts)(data);
}, //answer side
//setOfferSDPandCreateAnswerSDP(data)
function (data) {
  (0,_webrtc_answer_js__WEBPACK_IMPORTED_MODULE_2__.setOfferSDPandCreateAnswerSDP)(data);
});


/***/ }),

/***/ "./src/remote.js":
/*!***********************!*\
  !*** ./src/remote.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RemoteHelper": () => (/* binding */ RemoteHelper)
/* harmony export */ });
var RemoteHelper = {
  isHost: null,
  endpoints: {},
  watingSDP: false,
  type: null,
  start: function start() {
    console.log("start polling");
    RemoteHelper.waitingSdp = true;
  },
  stop: function stop() {
    console.log("stop polling");
    RemoteHelper.waitingSdp = false;
  },
  emit: function emit(event, options) {
    // amend options.data.type???offer answer?????????????????????????????????????
    // offer answer????????????controller????????????
    var sdp = options.data.sdp;
    var endpoint = RemoteHelper.endpoints.update_sdp;
    $.post(endpoint, {
      sdp: sdp
    }, function (res) {});
  },
  prepare: function prepare(offerSide_callback, answerSide_callback) {
    console.log("prepare");
    setInterval(function () {
      console.log("prepare setInterval");

      if (RemoteHelper.waitingSdp == true) {
        console.log("watingSDP = true");
        var endpoint = RemoteHelper.endpoints.get_video_info;
        var callback = null;

        if (RemoteHelper.type == "offer") {
          callback = offerSide_callback;
        } else if (RemoteHelper.type == "answer") {
          callback = answerSide_callback;
        } else {
          console.log("callback empty");
          return;
        }

        $.ajax({
          type: "GET",
          url: endpoint,
          dataType: "json"
        }).done(function (data) {
          callback(data); // amend stop???setRemoteDescription??????????????????????????????????????????
        });
      }
    }, 5000);
  }
};

/***/ }),

/***/ "./src/video.js":
/*!**********************!*\
  !*** ./src/video.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaManeger": () => (/* binding */ mediaManeger),
/* harmony export */   "onclickCheckbox_CameraMicrophone": () => (/* binding */ onclickCheckbox_CameraMicrophone),
/* harmony export */   "setStreamToElement": () => (/* binding */ setStreamToElement)
/* harmony export */ });
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.js */ "./src/client.js");

var mediaManeger = {
  bCamera_new: false
}; // ????????????????????????On/Off?????????????????????????????????????????????????????????

var onclickCheckbox_CameraMicrophone = function onclickCheckbox_CameraMicrophone(callback) {
  console.log("UI Event : Camera/Microphone checkbox clicked."); // ?????????????????????

  var trackCamera_old = null;
  var trackMicrophone_old = null;
  var bCamera_old = false;
  var bMicrophone_old = false;
  var stream = _client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal.srcObject;

  if (stream) {
    trackCamera_old = stream.getVideoTracks()[0];

    if (trackCamera_old) {
      bCamera_old = true;
    }

    trackMicrophone_old = stream.getAudioTracks()[0];

    if (trackMicrophone_old) {
      bMicrophone_old = true;
    }
  } // ???????????????
  // video start?????????????????????
  // video start??????????????????????????????????????????????????????true?????????
  // ?????????????????????=false?????????


  var bCamera_new = false;
  bCamera_new = mediaManeger.bCamera_new;

  if (_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxCamera.checked == false) {
    bCamera_new = false;
  } else {
    bCamera_new = true;
  }

  var bMicrophone_new = false;
  bMicrophone_new = mediaManeger.bMicrophone_new;

  if (_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxMicrophone.checked == false) {
    bMicrophone_new = false;
  } else {
    bMicrophone_new = true;
  } // ????????????


  console.log("Camera :  %s => %s", bCamera_old, bCamera_new);
  console.log("Microphoneo : %s = %s", bMicrophone_old, bMicrophone_new);

  if (bCamera_old === bCamera_new && bMicrophone_old === bMicrophone_new) {
    // ????????????????????????????????????????????????
    if (callback) callback();
    return;
  }

  console.log("trackCamera_old", trackCamera_old); // ?????????????????????????????????????????????????????????????????????????????????????????????HTML?????????stream??????????????????????????????????????????????????????????????????LED????????????????????????

  if (trackCamera_old) {
    console.log("Call : trackCamera_old.stop()");
    trackCamera_old.stop();
  }

  if (trackMicrophone_old) {
    console.log("Call : trackMicrophone_old.stop()");
    trackMicrophone_old.stop();
  } // HTML?????????????????????????????????????????????


  console.log("Call : setStreamToElement( Video_Local, null )");
  setStreamToElement(_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal, null);

  if (!bCamera_new && !bMicrophone_new) {
    // ???????????????????????????????????????????????????????????????????????????????????????????????????Off?????????
    return;
  } // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????On?????????
  // ??????????????????????????????????????????????????????
  // - ????????????navigator.getUserMedia() ?????????????????????????????????????????????
  //   ????????????navigator.mediaDevices.getUserMedia() ???????????????????????????????????????????????????


  console.log("Call : navigator.mediaDevices.getUserMedia( video=%s, audio=%s )", bCamera_new, bMicrophone_new);
  navigator.mediaDevices.getUserMedia({
    video: bCamera_new,
    audio: bMicrophone_new
  }).then(function (stream) {
    // HTML????????????????????????????????????????????????
    console.log("Call : setStreamToElement( Video_Local, stream )");
    setStreamToElement(_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal, stream);
    console.log("setStreamToElement complete");
    if (callback) callback();
  })["catch"](function (error) {
    // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    console.error("Error : ", error);
    alert("Could not start Camera.");
    _client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxCamera.checked = false;
    _client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxMicrophone.checked = false;
    return;
  });
}; // HTML??????????????????????????????????????????????????????????????????????????????????????????
// HTML????????????????????????????????????????????????????????????video????????????audio??????
// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????null???
// ????????????????????????????????????Video???????????????Audio???????????????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????????????????????????????HTML???????????????????????????????????????????????????

function setStreamToElement(elementMedia, stream) {
  console.log("setStreamToElement"); // ???????????????????????????????????????????????????HTML?????????srcObj??????????????????
  // - ????????????elementVideo.src = URL.createObjectURL( stream ); ?????????????????????????????????URL.createObjectURL()????????????????????????
  //   ????????????elementVideo.srcObject = stream; ?????????????????????

  elementMedia.srcObject = stream;

  if (!stream) {
    // ??????????????????????????????????????????????????????????????????????????????
    return;
  } // ??????


  if ("VIDEO" === elementMedia.tagName) {
    // VIDEO???????????????????????????????????????
    elementMedia.volume = 0.0;
    elementMedia.muted = true;
  } else if ("AUDIO" === elementMedia.tagName) {
    // AUDIO????????????????????????????????????????????????
    elementMedia.volume = 1.0;
    elementMedia.muted = false;
  } else {
    console.error("Unexpected : Unknown ElementTagName : ", elementMedia.tagName);
  }
}

/***/ }),

/***/ "./src/webrtc/answer.js":
/*!******************************!*\
  !*** ./src/webrtc/answer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setOfferSDPandCreateAnswerSDP": () => (/* binding */ setOfferSDPandCreateAnswerSDP)
/* harmony export */ });
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client.js */ "./src/client.js");
/* harmony import */ var _webrtc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webrtc.js */ "./src/webrtc/webrtc.js");

 // prepare?????????callback???????????????

var setOfferSDPandCreateAnswerSDP = function setOfferSDPandCreateAnswerSDP(data) {
  // amend UI Event????????????
  console.log("UI Event : 'Set OfferSDP and Create AnswerSDP.' button clicked.");

  if (_client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection) {
    // ????????????????????????????????????????????????
    alert("Connection object already exists.");
    return;
  } // const callback = (data) =>{
  // amend ????????????????????????????????????????????????


  if (!data.host_join.offer_sdp) {
    // OfferSDP??????
    console.log("OfferSDP is empty. Please enter the OfferSDP.");
    return;
  }

  var strOfferSDP = data.host_join.offer_sdp + "\r\n"; // RTCPeerConnection???????????????????????????

  console.log("Call : createPeerConnection()");
  var rtcPeerConnection = (0,_webrtc_js__WEBPACK_IMPORTED_MODULE_1__.createPeerConnection)(_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal.srcObject);
  _client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection = rtcPeerConnection; // ??????????????????????????????
  // OfferSDP????????????AnswerSDP?????????

  var sessionDescription = new RTCSessionDescription({
    type: "offer",
    sdp: strOfferSDP
  });
  console.log("Call : setOfferSDP_and_createAnswerSDP()");
  setOfferSDP_and_createAnswerSDP(rtcPeerConnection, sessionDescription); // }
  // const endpoint = RemoteHelper.endpoints.get_video_info;
  // $.ajax({
  //     type:"GET",
  //     url:endpoint,
  //     dataType: "json"
  // }).done((data)=>{
  //     callback(data.host_join);
  // })
}; // OfferSDP????????????AnswerSDP?????????
// amend ???????????????????????????????????????????????????????????????

function setOfferSDP_and_createAnswerSDP(rtcPeerConnection, sessionDescription) {
  console.log("Call : rtcPeerConnection.setRemoteDescription()");
  console.log("sessionDescription", sessionDescription);
  rtcPeerConnection.setRemoteDescription(sessionDescription).then(function () {
    // AnswerSDP?????????
    console.log("Call : rtcPeerConnection.createAnswer()");
    return rtcPeerConnection.createAnswer();
  }).then(function (sessionDescription) {
    // ???????????????AnswerSDP??????LocalDescription?????????
    console.log("Call : rtcPeerConnection.setLocalDescription()");
    return rtcPeerConnection.setLocalDescription(sessionDescription);
  }).then(function () {
    // Vanilla ICE?????????????????????SDP????????????????????????
    // Trickle ICE?????????????????????SDP??????????????????
    _client_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.stop();
  })["catch"](function (error) {
    console.error("Error : ", error);
  });
}

/***/ }),

/***/ "./src/webrtc/offer.js":
/*!*****************************!*\
  !*** ./src/webrtc/offer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "start_createOfferSDP": () => (/* binding */ start_createOfferSDP),
/* harmony export */   "setAnswerSDPthenChatStarts": () => (/* binding */ setAnswerSDPthenChatStarts)
/* harmony export */ });
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client.js */ "./src/client.js");
/* harmony import */ var _remote_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../remote.js */ "./src/remote.js");
/* harmony import */ var _webrtc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webrtc.js */ "./src/webrtc/webrtc.js");


 // ???Create OfferSDP.??????????????????????????????????????????

var start_createOfferSDP = function start_createOfferSDP() {
  //console.log( "UI Event : 'Create Offer SDP.' button clicked." );
  console.log("Create Offer SDP"); //let g_rtcPeerConnection = null;

  if (_client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection) {
    // ????????????????????????????????????????????????
    alert("Connection object already exists.");
    return;
  } // RTCPeerConnection???????????????????????????


  console.log("Call : createPeerConnection()");
  var rtcPeerConnection = (0,_webrtc_js__WEBPACK_IMPORTED_MODULE_2__.createPeerConnection)(_client_js__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal.srcObject); //g_rtcPeerConnection = rtcPeerConnection;    // ??????????????????????????????

  _client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection = rtcPeerConnection; // OfferSDP?????????

  createOfferSDP(rtcPeerConnection);
}; // OfferSDP?????????

var createOfferSDP = function createOfferSDP(rtcPeerConnection) {
  // OfferSDP?????????
  console.log("Call : rtcPeerConnection.createOffer()");
  rtcPeerConnection.createOffer().then(function (sessionDescription) {
    // ???????????????OfferSDP??????LocalDescription?????????
    console.log("Call : rtcPeerConnection.setLocalDescription()");
    return rtcPeerConnection.setLocalDescription(sessionDescription);
  }).then(function () {// Vanilla ICE?????????????????????SDP????????????????????????
    // Trickle ICE?????????????????????SDP??????????????????
  })["catch"](function (error) {
    console.error("Error : ", error);
  });
}; // amend polling???answerside???sdp??????????????????????????????????????????????????????
// ???Set AnswerSDP. Then the chat starts.??????????????????????????????????????????


function setAnswerSDPthenChatStarts(data) {
  // amend button????????????
  console.log("UI Event : 'Set AnswerSDP. Then the chat starts.' button clicked.");

  if (!_client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection) {
    // ?????????????????????????????????????????????
    alert("Connection object does not exist.");
    return;
  } // const callback = (data) =>{
  // AnswerSDP???????????????????????????????????????


  if (!data.guest_join.answer_sdp) {
    // AnswerSDP??????
    console.log("AnswerSDP is empty. Please enter the AnswerSDP.");
    return;
  }

  if (data.guest_join.updated_at < data.host_join.updated_at) {
    console.log("Answer sdp isn't updated");
    return;
  }

  var OfferSideAnswerSDP = data.guest_join.answer_sdp + "\r\n";
  console.log("OfferSideAnswerSDP", OfferSideAnswerSDP); // AnswerSDP?????????

  var sessionDescription = new RTCSessionDescription({
    type: "answer",
    sdp: OfferSideAnswerSDP
  }); //console.log("OfferSideAnswerSDP",OfferSideAnswerSDP);

  console.log("Call : setAnswerSDP()");
  setAnswerSDP(_client_js__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection, sessionDescription); // }
  //   const endpoint = RemoteHelper.endpoints.get_video_info;
  //   $.ajax({
  //       type:"GET",
  //       url:endpoint,
  //       dataType: "json"
  //   }).done((data)=>{
  //       console.log("answer data",data);
  //       callback(data);
  //   });
} // AnswerSDP?????????

function setAnswerSDP(rtcPeerConnection, sessionDescription) {
  console.log("Call : rtcPeerConnection.setRemoteDescription()");
  rtcPeerConnection.setRemoteDescription(sessionDescription).then(function () {
    _remote_js__WEBPACK_IMPORTED_MODULE_1__.RemoteHelper.stop();
  })["catch"](function (error) {
    console.error("Error : ", error);
  });
}

/***/ }),

/***/ "./src/webrtc/webrtc.js":
/*!******************************!*\
  !*** ./src/webrtc/webrtc.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPeerConnection": () => (/* binding */ createPeerConnection),
/* harmony export */   "setupRTCPeerConnectionEventHandler": () => (/* binding */ setupRTCPeerConnectionEventHandler)
/* harmony export */ });
/* harmony import */ var _remote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../remote.js */ "./src/remote.js");
/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../video.js */ "./src/video.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client.js */ "./src/client.js");


 // RTCPeerConnection???????????????????????????

var createPeerConnection = function createPeerConnection(stream) {
  console.log("createPeerConnection"); // RTCPeerConnection???????????????????????????

  var config = {
    "iceServers": [{
      "urls": "stun:stun.l.google.com:19302"
    }, {
      "urls": "stun:stun1.l.google.com:19302"
    }, {
      "urls": "stun:stun2.l.google.com:19302"
    }]
  };
  var rtcPeerConnection = new RTCPeerConnection(config); // RTCPeerConnection??????????????????????????????????????????????????????

  setupRTCPeerConnectionEventHandler(rtcPeerConnection); // RTCPeerConnection??????????????????????????????????????????????????????????????????????????????????????????

  if (stream) {
    // - ????????????RTCPeerConnection.addStream(stream) ??????????????????????????????????????????????????????
    //   ????????????RTCPeerConnection.addTrack(track, stream) ??????????????????
    stream.getTracks().forEach(function (track) {
      rtcPeerConnection.addTrack(track, stream);
    });
  } else {
    console.log("No local stream.");
  }

  return rtcPeerConnection;
}; // RTCPeerConnection??????????????????????????????????????????????????????

var setupRTCPeerConnectionEventHandler = function setupRTCPeerConnectionEventHandler(rtcPeerConnection) {
  // Negotiation needed ????????????????????????????????????????????????????????????
  // - ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   ????????????????????????negotiationneeded??????????????????RTCPeerConnection????????????????????????????????????????????????????????????
  //   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   ????????????????????????????????????????????????negotiationneeded??????????????????????????????????????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded
  rtcPeerConnection.onnegotiationneeded = function () {
    console.log("Event : Negotiation needed");
  }; // ICE candidate ????????????????????????????????????????????????????????????
  // - ???????????????????????????ICE???????????????????????????????????????????????????????????????
  //   ????????????????????????????????????????????????????????????????????????????????????????????????
  //   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   ICE ?????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate


  rtcPeerConnection.onicecandidate = function (event) {
    console.log("Event : ICE candidate");

    if (event.candidate) {
      // ICE candidate?????????
      console.log("- ICE candidate : ", event.candidate); // Vanilla ICE??????????????????????????????
      // Trickle ICE???????????????ICE candidate??????????????????
    } else {
      // ICE candiate????????? = ICE candidate ??????????????????
      console.log("- ICE candidate : empty");
    }
  }; // ICE candidate error ????????????????????????????????????????????????????????????
  // - ????????????????????????ICE???????????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidateerror


  rtcPeerConnection.onicecandidateerror = function (event) {
    console.error("Event : ICE candidate error. error code : ", event.errorCode);
  }; // ICE gathering state change ????????????????????????????????????????????????????????????
  // - ????????????????????????ICE gathering state???????????????????????????????????????
  //   ?????????????????????ICE????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange


  rtcPeerConnection.onicegatheringstatechange = function () {
    console.log("Event : ICE gathering state change");
    console.log("- ICE gathering state : ", rtcPeerConnection.iceGatheringState);

    if ("complete" === rtcPeerConnection.iceGatheringState) {
      if ("offer" == rtcPeerConnection.localDescription.type) {
        // Vanilla ICE???????????????ICE candidate????????????OfferSDP/AnswerSDP??????????????????
        // Trickle ICE??????????????????????????????
        // Offer??????OfferSDP????????????????????????????????????
        // amend ????????????
        console.log("- Set OfferSDP in textarea"); // g_elementTextareaOfferSideOfferSDP.value = rtcPeerConnection.localDescription.sdp;
        // g_elementTextareaOfferSideOfferSDP.focus();
        // g_elementTextareaOfferSideOfferSDP.select();

        _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.emit("signaling", {
          type: "offer",
          data: rtcPeerConnection.localDescription
        }); // ?????????start??????????????????????????????????????? offer??????answer???sdp??????????????????????????????????????????

        _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.start();
      } else if ("answer" === rtcPeerConnection.localDescription.type) {
        // Answer??????AnswerSDP????????????????????????????????????
        console.log("- Set AnswerSDP in textarea"); // g_elementTextareaAnswerSideAnswerSDP.value = rtcPeerConnection.localDescription.sdp;
        // g_elementTextareaAnswerSideAnswerSDP.focus();
        // g_elementTextareaAnswerSideAnswerSDP.select();
        // amend ???????????????????????????????????????????

        _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.emit("signaling", {
          type: "answer",
          data: rtcPeerConnection.localDescription
        });
      } else {
        console.error("Unexpected : Unknown localDescription.type. type = ", rtcPeerConnection.localDescription.type);
      }
    }
  }; // ICE connection state change ????????????????????????????????????????????????????????????
  // - ??????????????????????????????????????????????????????????????????ICE connection state??????????????????????????????????????? 
  // - ????????????????????????????????????????????????new????????????????????????checking??????????????????connected??????????????????completed???????????????????????? 
  //   ??????????????????????????????????????????connected??????????????????????????????checking????????????completed????????????????????????????????????????????????
  //   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  //   ???????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceconnectionstatechange_event


  rtcPeerConnection.oniceconnectionstatechange = function () {
    console.log("Event : ICE connection state change");
    console.log("- ICE connection state : ", rtcPeerConnection.iceConnectionState);
    console.log("test:", rtcPeerConnection.iceConnectionState); // "disconnected" : ????????????????????????????????????????????????????????????????????????????????????RTCPeerConnection????????????????????????????????????
    //                  1??????????????????????????????????????????????????????????????????????????????????????????"failed "??????????????????????????????????????????
    //                  ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    //                  ??????????????????????????? "???????????? "??????????????????????????????????????????
    // "failed"       : ICE candidate??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    //                  ?????????????????????????????????????????????????????????????????????????????????ICE????????????????????????????????????
    //                  ?????????????????????????????????????????????????????????????????????????????????????????????
    // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState

    if (rtcPeerConnection.iceConnectionState == "disconnected") {
      console.log("retry"); //console.log("RemoteHelper.isHost",RemoteHelper.isHost);
      // if(RemoteHelper.type == "offer"){
      //     // host???????????????offer????????????????????????????????????????????????
      //     retry();
      // }
      // else if(RemoteHelper.type == "answer" ){
      //     //guest???????????????offer??????????????????????????????????????????
      //     GlobalRTCParms.g_rtcPeerConnection = null;
      // }

      (0,_client_js__WEBPACK_IMPORTED_MODULE_2__.retry)();
    }
  }; // Signaling state change ????????????????????????????????????????????????????????????
  // - ???????????????????????????????????????signalState??????????????????????????????????????????
  //   ????????????setLocalDescription???????????????setRemoteDescription??????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange


  rtcPeerConnection.onsignalingstatechange = function () {
    console.log("Event : Signaling state change");
    console.log("- Signaling state : ", rtcPeerConnection.signalingState);
  }; // Connection state change ????????????????????????????????????????????????????????????
  // - ???????????????????????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange


  rtcPeerConnection.onconnectionstatechange = function () {
    console.log("Event : Connection state change");
    console.log("- Connection state : ", rtcPeerConnection.connectionState); // "disconnected" : ??????????????????ICE???????????????????????????????????????1?????????disconnected?????????????????????
    //                  ??????????????????????????????????????????failed?????????connecting?????????checking???????????????????????????
    // "failed"       : ?????????1????????????ICE???????????????????????????????????????????????????????????????
    // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
  }; // Track ????????????????????????????????????????????????????????????
  // - ???????????????????????????????????????MediaStreamTrack??????????????????
  //   ??????????????????????????????????????????????????????????????????RTCRtpReceiver?????????????????????????????????????????????????????????????????????
  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
  // - ????????????rtcPeerConnection.onaddstream ?????????????????????????????????????????????
  //   ????????????rtcPeerConnection.ontrack ??????????????????


  rtcPeerConnection.ontrack = function (event) {
    console.log("Event : Track");
    console.log("- stream", event.streams[0]);
    console.log("- track", event.track); // HTML????????????????????????????????????????????????????????????

    var stream = event.streams[0];
    var track = event.track;

    if ("video" === track.kind) {
      console.log("Call : setStreamToElement( Video_Remote, stream )");
      (0,_video_js__WEBPACK_IMPORTED_MODULE_1__.setStreamToElement)(_client_js__WEBPACK_IMPORTED_MODULE_2__.g_elementVideoRemote, stream);
    } else if ("audio" === track.kind) {
      console.log("Call : setStreamToElement( Audio_Remote, stream )");
      (0,_video_js__WEBPACK_IMPORTED_MODULE_1__.setStreamToElement)(_client_js__WEBPACK_IMPORTED_MODULE_2__.g_elementAudioRemote, stream);
    } else {
      console.error("Unexpected : Unknown track kind : ", track.kind);
    }
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client.js");
/******/ 	mywebrtc = __webpack_exports__;
/******/ 	
/******/ })()
;