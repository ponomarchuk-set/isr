document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const selectFileButton = document.getElementById("selectFile");
    const selectFileButtonN = document.getElementById("selectFileN");
    const videoSource = document.getElementById("videoSource");
    const fileElem = document.getElementById("fileElem");

    selectFileButton.addEventListener(
        "click",
        (e) => {
          if (fileElem) {
            fileElem.click();
          }
        },
        false,
      );

    fileElem.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoSource.src = fileURL;
            video.load();
            video.play();
        }
    });

    
  selectFileButtonN.addEventListener("click", async () => {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Video Files',
                    accept: {
                        'video/*': ['.mp4', '.webm', '.ogg', '.avi']
                    }
                }
            ],
            excludeAcceptAllOption: true,
            multiple: false
        });

        const file = await fileHandle.getFile();
        const fileURL = URL.createObjectURL(file);
        videoSource.src = fileURL;
        video.load();
        video.play();
    } catch (error) {
        console.error("Error selecting file:", error);
    }
  });

});
