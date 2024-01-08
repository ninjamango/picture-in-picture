

const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select a media stream , pass to video element
const displayMediaOptions = {
    video: {
      displaySurface: "browser",
    },
    audio: {
      suppressLocalAudioPlayback: false,
    },
    preferCurrentTab: false,
    selfBrowserSurface: "exclude",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
  };

  async function startCapture(displayMediaOptions) {
    let captureStream = null;
  
    try {
      captureStream =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    return captureStream;
  }

  function startCapture(displayMediaOptions) {
    return navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }










async function selectMediaStream(){
    try {

        const mediaStream = await navigator.mediaDevices.getDisplayMediaStream();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        
    }
    catch(error) {
        //Catch Error Here 
        console.log('whoops, error here:', error);

    }


    button.addEventListener('click', async() => {
        //Disable Button
        button.disabled = true;
        //start Pictue in picture 
        await videoElement.requestPictureinPicture();
        //reset button state
        button.disabled = false;

    });
}

//On Load 
selectMediaStream();