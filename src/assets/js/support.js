initializeCastApi = function() {
    console.log("Cast init sucesss");
    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: '57B587C1'
      });
};

async function getCurrentSession(){
    return cast.framework.CastContext.getInstance().getCurrentSession();
}

async function castContent(){

    var castSession=await getCurrentSession();
    
    var mediaInfo = new chrome.cast.media.MediaInfo("https://canadisplay.com/assets/screens/android008.png", "image/PNG");
    var request = new chrome.cast.media.LoadRequest(mediaInfo);

    console.log("cast session : ",cast.framework.CastContext.getInstance());

    castSession.loadMedia(request).then(
    function() { console.log('Load succeed'); },
    function(errorCode) { console.log('Error code: ' + errorCode); });

    var player = new cast.framework.RemotePlayer();
    var playerController = new cast.framework.RemotePlayerController(player);


    playerController.addEventListener(
    cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED, function() {
    // Use the current session to get an up to date media status.
    let session = cast.framework.CastContext.getInstance().getCurrentSession();

    if (!session) {
        return;
    }

    // Contains information about the playing media including currentTime.
    let mediaStatus = session.getMediaSession();
    if (!mediaStatus) {
        return;
    }

    // mediaStatus also contains the mediaInfo containing metadata and other
    // information about the in progress content.
    let mediaInfo = mediaStatus.media;
    });


    var context = cast.framework.CastContext.getInstance();
    context.addEventListener(
    cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
    function(event) {
    switch (event.sessionState) {
        case cast.framework.SessionState.SESSION_STARTED:
        case cast.framework.SessionState.SESSION_RESUMED:
        break;
        case cast.framework.SessionState.SESSION_ENDED:
        console.log('CastContext: CastSession disconnected');
        // Update locally as necessary
        break;
    }
    })


    playerController.addEventListener(
    cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, function() {
    if (!player.isConnected) {
    console.log('RemotePlayerController: Player disconnected');
    // Update local player to disconnected state
    }
    });
}

function stopCasting() {
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    // End the session and pass 'true' to indicate
    // that Web Receiver app should be stopped.
    castSession.endSession(true);
  }



