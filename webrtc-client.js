var host = host || 'localhost';
var globalUserID = globalUserID || '';

$(function () {

  var myVideo = document.getElementById('my-video');
  var theirVideo = document.getElementById('their-video');
  var myId = document.getElementById('my-id');
  var video = document.getElementById('their-id');
  var incomingCallAudio = document.getElementById('incoming-call-audio');

  var constraints = {video: true, audio: false};

  function successCallback(stream) {
    // make stream available to console
    window.localMediaStream = stream;
    myVideo = attachMediaStream(myVideo, stream);
  }

  function errorCallback(error) {
    console.log('getUserMedia error: ', error);
  }

  // request the webcam and audio
  navigator.getUserMedia(constraints, successCallback, errorCallback);

  console.log('Browser Detected: ' + webrtcDetectedBrowser);
  console.log('PeerJS server running on ' + host);

  // configure the peer
  var peer = new Peer(globalUserID, {
    key: 'peerjs',
    host: host,
    port: 56000,
    debug: 3
  });

  peer.on('open', function (id) {
    console.log('Peer connected with id=' + id);
    $('#my-id').text(id);
  });

  // Receiving a call
  peer.on('call', function (call) {

    // play notification sound
    incomingCallAudio.play();

    // display the alert
    var alert = confirm('Incoming Call from ' + call.peer);

    // accept or reject the call
    if (alert == true) {
      // Answer automatically instead of prompting user
      call.answer(window.localMediaStream);

      // Hang up on an existing call if present
      if (window.existingCall) {
        console.warn('Existing call present, hanging up');
        window.existingCall.close();
      }

      // Wait for stream on the call, then set peer video display
      call.on('stream', function (stream) {
        theirVideo = attachMediaStream(theirVideo, stream);
      });

      // UI stuff
      window.existingCall = call;

      $('#their-id').text(call.peer);

      call.on('close', function () {
        console.info('WebRTC call hanged up');
      });
    }
    else {
      console.warn('Call from ' + call.peer + ' was rejected');
    }

  });

  // make call
  $('#make-call').click(function () {
    var call = peer.call($('#callto-id').val(), window.localMediaStream);
  });

  // end call
  $('#end-call').click(function () {
    if (window.existingCall) {
      window.existingCall.close();
    }
  });

});
