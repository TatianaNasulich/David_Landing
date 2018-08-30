

    var myVideo = document.getElementById("video");

    var playButton = document.getElementsByClassName("play")[0];

    var changeImg = document.getElementById("play");



    playButton.addEventListener('click',function () {
        if (myVideo.paused){
            myVideo.play();
            changeImg.src = "images/media-24px-outline-1-button-pause.png";
            var decorativeElem = document.querySelectorAll(".video_decorative_elem");
            console.log(decorativeElem);
            for(i=0; i<decorativeElem.length; i++){
                decorativeElem[i].classList.add("is-hidden");

            }

        }

        else{
            myVideo.pause();
            changeImg.src= "images/media-24px-outline-1-button-play.png";
        }

    });




