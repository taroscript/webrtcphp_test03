/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var mywebrtc;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"g_elementCheckboxCamera\": () => (/* binding */ g_elementCheckboxCamera),\n/* harmony export */   \"g_elementCheckboxMicrophone\": () => (/* binding */ g_elementCheckboxMicrophone),\n/* harmony export */   \"g_elementVideoLocal\": () => (/* binding */ g_elementVideoLocal),\n/* harmony export */   \"GlobalRTCParms\": () => (/* binding */ GlobalRTCParms),\n/* harmony export */   \"g_elementTextareaOfferSideOfferSDP\": () => (/* binding */ g_elementTextareaOfferSideOfferSDP),\n/* harmony export */   \"setEndpoint\": () => (/* binding */ setEndpoint),\n/* harmony export */   \"abc\": () => (/* binding */ abc),\n/* harmony export */   \"videoStart\": () => (/* binding */ videoStart),\n/* harmony export */   \"RemoteHelper\": () => (/* reexport safe */ _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper),\n/* harmony export */   \"onclickCheckbox_CameraMicrophone\": () => (/* reexport safe */ _video_js__WEBPACK_IMPORTED_MODULE_2__.onclickCheckbox_CameraMicrophone)\n/* harmony export */ });\n/* harmony import */ var _remote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./remote.js */ \"./src/remote.js\");\n/* harmony import */ var _webrtc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webrtc.js */ \"./src/webrtc.js\");\n/* harmony import */ var _video_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./video.js */ \"./src/video.js\");\n\n\n\nconsole.log(\"Hello World!\");\nvar g_elementCheckboxCamera = document.getElementById(\"checkbox_camera\");\nvar g_elementCheckboxMicrophone = document.getElementById(\"checkbox_microphone\");\nvar g_elementVideoLocal = document.getElementById(\"video_local\");\nvar GlobalRTCParms = {\n  g_rtcPeerConnection: null\n};\nvar g_elementTextareaOfferSideOfferSDP = document.getElementById(\"textarea_offerside_offersdp\");\nvar setEndpoint = function setEndpoint(data) {\n  _remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.endpoints = data;\n};\nvar abc = function abc() {\n  console.log(\"abc func\");\n};\nvar videoStart = function videoStart() {\n  // offer answerなのか\n  // offer sdpの取得\n  // offer sdpの格納\n  (0,_webrtc_js__WEBPACK_IMPORTED_MODULE_1__.start_createOfferSDP)();\n};\n_remote_js__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.prepare(function (data) {\n  console.log(data);\n});\n\n\n//# sourceURL=webpack://mywebrtc/./src/client.js?");

/***/ }),

/***/ "./src/remote.js":
/*!***********************!*\
  !*** ./src/remote.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RemoteHelper\": () => (/* binding */ RemoteHelper)\n/* harmony export */ });\nvar RemoteHelper = {\n  endpoints: {},\n  emit: function emit(event, options) {\n    var sdp = options.data.sdp;\n    var endpoint = RemoteHelper.endpoints.update_sdp;\n    $.post(endpoint, {\n      sdp: sdp\n    }, function (res) {});\n  },\n  prepare: function prepare(callback) {\n    console.log(\"test\");\n    var endpoint = RemoteHelper.endpoints.getVideo;\n    console.log(\"prepare\");\n    $.ajax({\n      type: \"GET\",\n      url: endpoint,\n      dataType: \"json\"\n    }).done(function (data) {\n      callback(data);\n    });\n  }\n};\n\n//# sourceURL=webpack://mywebrtc/./src/remote.js?");

/***/ }),

/***/ "./src/video.js":
/*!**********************!*\
  !*** ./src/video.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"onclickCheckbox_CameraMicrophone\": () => (/* binding */ onclickCheckbox_CameraMicrophone)\n/* harmony export */ });\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.js\");\n // カメラとマイクのOn/Offのチェックボックスを押すと呼ばれる関数\n\nvar onclickCheckbox_CameraMicrophone = function onclickCheckbox_CameraMicrophone() {\n  console.log(\"UI Event : Camera/Microphone checkbox clicked.\"); // これまでの状態\n\n  var trackCamera_old = null;\n  var trackMicrophone_old = null;\n  var bCamera_old = false;\n  var bMicrophone_old = false;\n  var stream = _client__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal.srcObject;\n\n  if (stream) {\n    trackCamera_old = stream.getVideoTracks()[0];\n\n    if (trackCamera_old) {\n      bCamera_old = true;\n    }\n\n    trackMicrophone_old = stream.getAudioTracks()[0];\n\n    if (trackMicrophone_old) {\n      bMicrophone_old = true;\n    }\n  } // 今後の状態\n\n\n  var bCamera_new = false;\n\n  if (_client__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxCamera.checked) {\n    bCamera_new = true;\n  }\n\n  var bMicrophone_new = false;\n\n  if (_client__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxMicrophone.checked) {\n    bMicrophone_new = true;\n  } // 状態変化\n\n\n  console.log(\"Camera :  %s => %s\", bCamera_old, bCamera_new);\n  console.log(\"Microphoneo : %s = %s\", bMicrophone_old, bMicrophone_new);\n\n  if (bCamera_old === bCamera_new && bMicrophone_old === bMicrophone_new) {\n    // チェックボックスの状態の変化なし\n    return;\n  } // 古いメディアストリームのトラックの停止（トラックの停止をせず、HTML要素のstreamの解除だけではカメラは停止しない（カメラ動作LEDは点いたまま））\n\n\n  if (trackCamera_old) {\n    console.log(\"Call : trackCamera_old.stop()\");\n    trackCamera_old.stop();\n  }\n\n  if (trackMicrophone_old) {\n    console.log(\"Call : trackMicrophone_old.stop()\");\n    trackMicrophone_old.stop();\n  } // HTML要素のメディアストリームの解除\n\n\n  console.log(\"Call : setStreamToElement( Video_Local, null )\");\n  setStreamToElement(_client__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal, null);\n\n  if (!bCamera_new && !bMicrophone_new) {\n    // （チェックボックスの状態の変化があり、かつ、）カメラとマイクを両方Offの場合\n    return;\n  } // （チェックボックスの状態の変化があり、かつ、）カメラとマイクのどちらかもしくはどちらもOnの場合\n  // 自分のメディアストリームを取得する。\n  // - 古くは、navigator.getUserMedia() を使用していたが、廃止された。\n  //   現在は、navigator.mediaDevices.getUserMedia() が新たに用意され、これを使用する。\n\n\n  console.log(\"Call : navigator.mediaDevices.getUserMedia( video=%s, audio=%s )\", bCamera_new, bMicrophone_new);\n  navigator.mediaDevices.getUserMedia({\n    video: bCamera_new,\n    audio: bMicrophone_new\n  }).then(function (stream) {\n    // HTML要素へのメディアストリームの設定\n    console.log(\"Call : setStreamToElement( Video_Local, stream )\");\n    setStreamToElement(_client__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal, stream);\n  })[\"catch\"](function (error) {\n    // メディアストリームの取得に失敗⇒古いメディアストリームのまま。チェックボックスの状態を戻す。\n    console.error(\"Error : \", error);\n    alert(\"Could not start Camera.\");\n    _client__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxCamera.checked = false;\n    _client__WEBPACK_IMPORTED_MODULE_0__.g_elementCheckboxMicrophone.checked = false;\n    return;\n  });\n}; // HTML要素へのメディアストリームの設定（もしくは解除。および開始）\n// HTML要素は、「ローカルもしくはリモート」の「videoもしくはaudio」。\n// メディアストリームは、ローカルメディアストリームもしくはリモートメディアストリーム、もしくはnull。\n// メディアストリームには、Videoトラック、Audioトラックの両方もしくは片方のみが含まれる。\n// メディアストリームに含まれるトラックの種別、設定するHTML要素種別は、呼び出し側で対処する。\n\nfunction setStreamToElement(elementMedia, stream) {\n  // メディアストリームを、メディア用のHTML要素のsrcObjに設定する。\n  // - 古くは、elementVideo.src = URL.createObjectURL( stream ); のように書いていたが、URL.createObjectURL()は、廃止された。\n  //   現在は、elementVideo.srcObject = stream; のように書く。\n  elementMedia.srcObject = stream;\n\n  if (!stream) {\n    // メディアストリームの設定解除の場合は、ここで処理終了\n    return;\n  } // 音量\n\n\n  if (\"VIDEO\" === elementMedia.tagName) {\n    // VIDEO：ボリュームゼロ、ミュート\n    elementMedia.volume = 0.0;\n    elementMedia.muted = true;\n  } else if (\"AUDIO\" === elementMedia.tagName) {\n    // AUDIO：ボリュームあり、ミュートでない\n    elementMedia.volume = 1.0;\n    elementMedia.muted = false;\n  } else {\n    console.error(\"Unexpected : Unknown ElementTagName : \", elementMedia.tagName);\n  }\n}\n\n//# sourceURL=webpack://mywebrtc/./src/video.js?");

/***/ }),

/***/ "./src/webrtc.js":
/*!***********************!*\
  !*** ./src/webrtc.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"start_createOfferSDP\": () => (/* binding */ start_createOfferSDP),\n/* harmony export */   \"createPeerConnection\": () => (/* binding */ createPeerConnection),\n/* harmony export */   \"setupRTCPeerConnectionEventHandler\": () => (/* binding */ setupRTCPeerConnectionEventHandler)\n/* harmony export */ });\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/client.js\");\n // 「Create OfferSDP.」ボタンを押すと呼ばれる関数\n\nvar start_createOfferSDP = function start_createOfferSDP() {\n  //console.log( \"UI Event : 'Create Offer SDP.' button clicked.\" );\n  console.log(\"Create Offer SDP\"); //let g_rtcPeerConnection = null;\n\n  if (_client__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection) {\n    // 既にコネクションオブジェクトあり\n    alert(\"Connection object already exists.\");\n    return;\n  } // RTCPeerConnectionオブジェクトの作成\n\n\n  console.log(\"Call : createPeerConnection()\");\n  var rtcPeerConnection = createPeerConnection(_client__WEBPACK_IMPORTED_MODULE_0__.g_elementVideoLocal.srcObject); //g_rtcPeerConnection = rtcPeerConnection;    // グローバル変数に設定\n\n  _client__WEBPACK_IMPORTED_MODULE_0__.GlobalRTCParms.g_rtcPeerConnection = rtcPeerConnection; // OfferSDPの作成\n\n  createOfferSDP(rtcPeerConnection);\n}; // RTCPeerConnectionオブジェクトの作成\n\nvar createPeerConnection = function createPeerConnection(stream) {\n  console.log(\"createPeerConnection\"); // RTCPeerConnectionオブジェクトの生成\n\n  var config = {\n    \"iceServers\": []\n  };\n  var rtcPeerConnection = new RTCPeerConnection(config); // RTCPeerConnectionオブジェクトのイベントハンドラの構築\n\n  setupRTCPeerConnectionEventHandler(rtcPeerConnection); // RTCPeerConnectionオブジェクトのストリームにローカルのメディアストリームを追加\n\n  if (stream) {\n    // - 古くは、RTCPeerConnection.addStream(stream) を使用していたが、廃止予定となった。\n    //   現在は、RTCPeerConnection.addTrack(track, stream) を使用する。\n    stream.getTracks().forEach(function (track) {\n      rtcPeerConnection.addTrack(track, stream);\n    });\n  } else {\n    console.log(\"No local stream.\");\n  }\n\n  return rtcPeerConnection;\n}; // OfferSDPの作成\n\nvar createOfferSDP = function createOfferSDP(rtcPeerConnection) {\n  // OfferSDPの作成\n  console.log(\"Call : rtcPeerConnection.createOffer()\");\n  rtcPeerConnection.createOffer().then(function (sessionDescription) {\n    // 作成されたOfferSDPををLocalDescriptionに設定\n    console.log(\"Call : rtcPeerConnection.setLocalDescription()\");\n    return rtcPeerConnection.setLocalDescription(sessionDescription);\n  }).then(function () {// Vanilla ICEの場合は、まだSDPを相手に送らない\n    // Trickle ICEの場合は、初期SDPを相手に送る\n  })[\"catch\"](function (error) {\n    console.error(\"Error : \", error);\n  });\n}; // RTCPeerConnectionオブジェクトのイベントハンドラの構築\n\n\nvar setupRTCPeerConnectionEventHandler = function setupRTCPeerConnectionEventHandler(rtcPeerConnection) {\n  // Negotiation needed イベントが発生したときのイベントハンドラ\n  // - このイベントは、セッションネゴシエーションを必要とする変更が発生したときに発生する。\n  //   一部のセッション変更はアンサーとしてネゴシエートできないため、このネゴシエーションはオファー側として実行されなければならない。\n  //   最も一般的には、negotiationneededイベントは、RTCPeerConnectionに送信トラックが追加された後に発生する。\n  //   ネゴシエーションがすでに進行しているときに、ネゴシエーションを必要とする方法でセッションが変更された場合、\n  //   ネゴシエーションが完了するまで、negotiationneededイベントは発生せず、ネゴシエーションがまだ必要な場合にのみ発生する。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded\n  rtcPeerConnection.onnegotiationneeded = function () {\n    console.log(\"Event : Negotiation needed\");\n  }; // ICE candidate イベントが発生したときのイベントハンドラ\n  // - これは、ローカルのICEエージェントがシグナリング・サーバを介して\n  //   他のピアにメッセージを配信する必要があるときはいつでも発生する。\n  //   これにより、ブラウザ自身がシグナリングに使用されている技術についての詳細を知る必要がなく、\n  //   ICE エージェントがリモートピアとのネゴシエーションを実行できるようになる。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate\n\n\n  rtcPeerConnection.onicecandidate = function (event) {\n    console.log(\"Event : ICE candidate\");\n\n    if (event.candidate) {\n      // ICE candidateがある\n      console.log(\"- ICE candidate : \", event.candidate); // Vanilla ICEの場合は、何もしない\n      // Trickle ICEの場合は、ICE candidateを相手に送る\n    } else {\n      // ICE candiateがない = ICE candidate の収集終了。\n      console.log(\"- ICE candidate : empty\");\n    }\n  }; // ICE candidate error イベントが発生したときのイベントハンドラ\n  // - このイベントは、ICE候補の収集処理中にエラーが発生した場合に発生する。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidateerror\n\n\n  rtcPeerConnection.onicecandidateerror = function (event) {\n    console.error(\"Event : ICE candidate error. error code : \", event.errorCode);\n  }; // ICE gathering state change イベントが発生したときのイベントハンドラ\n  // - このイベントは、ICE gathering stateが変化したときに発生する。\n  //   言い換えれば、ICEエージェントがアクティブに候補者を収集しているかどうかが変化したときに発生する。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange\n\n\n  rtcPeerConnection.onicegatheringstatechange = function () {\n    console.log(\"Event : ICE gathering state change\");\n    console.log(\"- ICE gathering state : \", rtcPeerConnection.iceGatheringState);\n\n    if (\"complete\" === rtcPeerConnection.iceGatheringState) {\n      // Vanilla ICEの場合は、ICE candidateを含んだOfferSDP/AnswerSDPを相手に送る\n      // Trickle ICEの場合は、何もしない\n      // Offer側のOfferSDP用のテキストエリアに貼付\n      console.log(\"- Set OfferSDP in textarea\");\n      _client__WEBPACK_IMPORTED_MODULE_0__.g_elementTextareaOfferSideOfferSDP.value = rtcPeerConnection.localDescription.sdp;\n      _client__WEBPACK_IMPORTED_MODULE_0__.g_elementTextareaOfferSideOfferSDP.focus();\n      _client__WEBPACK_IMPORTED_MODULE_0__.g_elementTextareaOfferSideOfferSDP.select();\n      _client__WEBPACK_IMPORTED_MODULE_0__.RemoteHelper.emit(\"signaling\", {\n        type: \"offer\",\n        data: rtcPeerConnection.localDescription\n      });\n    }\n  }; // ICE connection state change イベントが発生したときのイベントハンドラ\n  // - このイベントは、ネゴシエーションプロセス中にICE connection stateが変化するたびに発生する。 \n  // - 接続が成功すると、通常、状態は「new」から始まり、「checking」を経て、「connected」、最後に「completed」と遷移します。 \n  //   ただし、特定の状況下では、「connected」がスキップされ、「checking」から「completed」に直接移行する場合があります。\n  //   これは、最後にチェックされた候補のみが成功した場合に発生する可能性があり、成功したネゴシエーションが完了する前に、\n  //   収集信号と候補終了信号の両方が発生します。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceconnectionstatechange_event\n\n\n  rtcPeerConnection.oniceconnectionstatechange = function () {\n    console.log(\"Event : ICE connection state change\");\n    console.log(\"- ICE connection state : \", rtcPeerConnection.iceConnectionState); // \"disconnected\" : コンポーネントがまだ接続されていることを確認するために、RTCPeerConnectionオブジェクトの少なくとも\n    //                  1つのコンポーネントに対して失敗したことを確認します。これは、\"failed \"よりも厳しいテストではなく、\n    //                  断続的に発生し、信頼性の低いネットワークや一時的な切断中に自然に解決することがあります。問題が\n    //                  解決すると、接続は \"接続済み \"の状態に戻ることがあります。\n    // \"failed\"       : ICE candidateは、すべての候補のペアを互いにチェックしたが、接続のすべてのコンポーネントに\n    //                  互換性のあるものを見つけることができなかった。しかし、ICEエージェントがいくつかの\n    //                  コンポーネントに対して互換性のある接続を見つけた可能性がある。\n    // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState\n  }; // Signaling state change イベントが発生したときのイベントハンドラ\n  // - このイベントは、ピア接続のsignalStateが変化したときに送信される。\n  //   これは、setLocalDescription（）またはsetRemoteDescription（）の呼び出しが原因で発生する可能性がある。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange\n\n\n  rtcPeerConnection.onsignalingstatechange = function () {\n    console.log(\"Event : Signaling state change\");\n    console.log(\"- Signaling state : \", rtcPeerConnection.signalingState);\n  }; // Connection state change イベントが発生したときのイベントハンドラ\n  // - このイベントは、ピア接続の状態が変化したときに送信される。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange\n\n\n  rtcPeerConnection.onconnectionstatechange = function () {\n    console.log(\"Event : Connection state change\");\n    console.log(\"- Connection state : \", rtcPeerConnection.connectionState); // \"disconnected\" : 接続のためのICEトランスポートの少なくとも1つが「disconnected」状態であり、\n    //                  他のトランスポートのどれも「failed」、「connecting」、「checking」の状態ではない。\n    // \"failed\"       : 接続の1つ以上のICEトランスポートが「失敗」状態になっている。\n    // see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState\n  }; // Track イベントが発生したときのイベントハンドラ\n  // - このイベントは、新しい着信MediaStreamTrackが作成され、\n  //   コネクション上のレシーバーセットに追加されたRTCRtpReceiverオブジェクトに関連付けられたときに送信される。\n  //   see : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack\n  // - 古くは、rtcPeerConnection.onaddstream に設定していたが、廃止された。\n  //   現在は、rtcPeerConnection.ontrack に設定する。\n\n\n  rtcPeerConnection.ontrack = function (event) {\n    console.log(\"Event : Track\");\n    console.log(\"- stream\", event.streams[0]);\n    console.log(\"- track\", event.track);\n  };\n};\n\n//# sourceURL=webpack://mywebrtc/./src/webrtc.js?");

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