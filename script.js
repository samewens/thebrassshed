const hotspot = document.getElementById("hotspot-daw");
const screenTitle = document.getElementById("screen-title");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupBody = document.getElementById("popup-body");
const popupClose = document.getElementById("popup-close");

const trumpetHotspot = document.getElementById("Trumpet_Section_4");
const closeBtn = trumpetHotspot.querySelector(".sound-close");

function syncSceneToLanding() {
  const scene = document.getElementById("scene");
  const landingImg = document.getElementById("landingImage");

  scene.style.height = landingImg.offsetHeight + "px";
}

window.addEventListener("load", syncSceneToLanding);
window.addEventListener("resize", syncSceneToLanding);

let audio = null;

/* HOVER */
// hotspot.addEventListener("mouseenter", () => {
//   screenTitle.textContent = hotspot.dataset.title;
// });

// hotspot.addEventListener("mouseleave", () => {
//   screenTitle.textContent = "";
// });

let popupAudio = null;
let loadingTimeout = null;

document.querySelectorAll(".popup-hotspot").forEach((hotspot) => {
  /* HOVER */
  hotspot.addEventListener("mouseenter", () => {
    const title = hotspot.dataset.title;
    if (!title) return;

    // support multi-line titles using |
    screenTitle.innerHTML = title.replace("|", "<br>");
    // screenTitle.textContent = hotspot.dataset.title;
  });

  hotspot.addEventListener("mouseleave", () => {
    screenTitle.innerHTML = "";
    // screenTitle.textContent = "";
  });

  /* CLICK */
  hotspot.addEventListener("click", () => {
    stopEverything();
    hotspot.classList.add("loading");

    // loadingTimeout = setTimeout(() => {
    const { title, sound, content, popupSize } = hotspot.dataset;

    popup.classList.remove("large", "game"); // reset all modes

    if (popupSize === "large") {
      popup.classList.add("large");
    }

    if (content === "mute-match-game") {
      popup.classList.add("game");
    }
    popupTitle.textContent = title;
    popupBody.innerHTML = POPUP_CONTENT[content];

    popup.classList.remove("hidden");

    popupAudio = new Audio(`assets/audio/${sound}`);
    popupAudio.play();

    // popupAudio.addEventListener("ended", stopPopup);
    // }, 300);
  });
});

/* CLOSE POPUP */
popupClose.addEventListener("click", stopPopup);

function stopPopup() {
  // if (loadingTimeout) {
  //   clearTimeout(loadingTimeout);
  //   loadingTimeout = null;
  // }

  popup.classList.add("hidden");
  popup.classList.remove("large");
  popupBody.innerHTML = "";
  popupTitle.textContent = "";

  if (popupAudio) {
    popupAudio.pause();
    popupAudio.currentTime = 0;
    popupAudio = null;
  }
  popup.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
  document
    .querySelectorAll(".popup-hotspot.loading")
    .forEach((h) => h.classList.remove("loading"));
}

let activeAudio = null;
let activeHotspot = null;

document.querySelectorAll(".sound-hotspot").forEach((hotspot) => {
  const closeBtn = hotspot.querySelector(".sound-close");

  hotspot.addEventListener("click", () => {
    stopEverything();
    if (activeAudio) return;

    hotspot.classList.add("loading");

    // setTimeout(() => {
    const soundFile = hotspot.dataset.sound;

    activeAudio = new Audio(`assets/audio/${soundFile}`);
    activeAudio.play();

    closeBtn.classList.remove("hidden");
    activeHotspot = hotspot;

    activeAudio.addEventListener("ended", stopSound);
    // }, 300);
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stopSound();
  });
});

function stopSound() {
  if (!activeAudio || !activeHotspot) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;

  const closeBtn = activeHotspot.querySelector(".sound-close");
  closeBtn.classList.add("hidden");

  activeHotspot.classList.remove("loading");
  activeHotspot = null;
}

function stopEverything() {
  stopPopup();
  stopSound();
}
const POPUP_CONTENT = {
  "horns-brass": `
    <p>
      I can provide brass & horn sections for your project. From full arrangement and writing duties to
      replacing sampled brass or recording provided sheet music. I've done this for artists such as
      Ed Sheeran / Devlin, Labrinth, James Arthur, Tones & I, Frank Turner, Suki Waterhouse, Haircut 100,
      Clark (feat. Thom Yorke), Get Cape. Wear Cape. Fly, Benjamin Francis Leftwich, Guy Sebastian,
      Stornoway, The Boxer Rebellion and many others.
    </p>

    <iframe
      src="https://open.spotify.com/embed/playlist/4H1pEfyB9V9eeN1JWhVxFc"
      width="100%"
      height="152"
      frameborder="0"
      allow="encrypted-media">
    </iframe>
  `,

  contact: `
    <p>
      Find me on Instagram for more updates and clips of my work.
      Or get in touch if you’d like to collaborate by emailing me at
      <a href="mailto:samuel.ewens@gmail.com">samuel.ewens@gmail.com</a>
    </p>

    <a href="https://www.instagram.com/samewens" target="_blank">
      Visit Instagram
    </a>
  `,

  credits: `
    <p><strong>ARTISTS:</strong></p>
    <p>
      Labrinth, Primal Scream, Ed Sheeran, Jungle, James Arthur, Clean Bandit,
      Louis Tomlinson, Frank Turner, Tones and I, Clark / Thom Yorke,
      Suki Waterhouse, The Hoosiers, Hannah Peel, Haircut 100, Myles Sanko,
      Rae Morris, Benjamin Francis Leftwich, Devlin, The Boxer Rebellion,
      Kids In Glass Houses, Gomez, Guy Sebastian, Judge Jules, Gorilla Biscuits,
      Deep Purple, Masta Ace, Get Cape. Wear Cape. Fly, Dele Sosimi,
      Arijit Singh, Stornoway, Resolution88, Down I Go
    </p>

    <p><strong>TV THEMES | SOUNDTRACKS:</strong></p>
    <p>
      The Wheel (BBC1), First Dates (Ch4), Michael McIntyre's Big Show (BBC1),
      This Morning (ITV1), Funny Woman (Sky), Ant & Dec's Saturday Night Takeaway (ITV),
      Grayson Perry's Big American Road Trip (Ch4), The John Bishop Show (ITV),
      In With A Shout (ITV1), Hairy Bikers Mediterranean Adventure (BBC2),
      Location Location Location (Ch4), The Perfect Pitch (Ch4),
      Michael Palin: Into Iraq (Ch5), Time Travel Is Dangerous (film)
    </p>
  `,

  composer: `
    <p>
      I can provide jingles for your ads, idents or podcasts, and have written
      library / production music that has been placed in TV shows for BBC,
      ITV, Channel 4, Channel 5, plus many placements abroad including ESPN.
    </p>

    <img src="assets/images/composer.jpg" alt="Composer" style="width:100%; margin-top:10px;" />
  `,

  "night-auras": `
    <p>
      <strong>NIGHT AURAS</strong> is my instrumental solo project. Sometimes epic & cinematic, sometimes
introspective. Soundtracking the still hours, South London after dark. Find me on all streaming
services & bandcamp.
    </p>

    <a href="https://nightauras.bandcamp.com" target="_blank">
      Visit Bandcamp
    </a>

    <img src="assets/images/nightauras.jpg" alt="Night Auras" style="width:100%; margin-top:10px;" />
  `,

  "remote-sessions": `
    <p>
    I provide hassle free, quick turn-around remote sessions for trumpet & other brass for tv / media
composers. My work includes working on music for film, TV adverts and some of the UK's most
well known gameshows and prime time TV chat shows.
    </p>

    <p>
      My room is fully soundproofed and acoustically treated with top of the range mics (a selection of
Neumann's, a Coles 4038, a collection of Shure's & a Sennheiser MD441-U).
    </p>


    <img src="assets/images/remotesessions.JPG" alt="Remote Sessions" style="width:100%; margin:10px 0;" />

    <iframe width="100%" height="200" src="https://www.youtube.com/embed/Q4UAFUdDSiQ"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/RewyY5cafAU"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/wNXCC8sKz1I"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/pLAXqx6CuQU"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/ijUiM775KRI"></iframe>

     <video controls preload="metadata" width="100%">
    <source src="assets/videos/funnywoman.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  

  <video controls preload="metadata" width="100%">
    <source src="assets/videos/thismorning.mp4" type="video/mp4">
  </video>


  <video controls preload="metadata" width="100%">
    <source src="assets/videos/graysonperryclip_212.mp4" type="video/mp4">
  </video>

  <video controls preload="metadata" width="100%">
    <source src="assets/videos/inwithashout.mp4" type="video/mp4">
  </video>

  <video controls preload="metadata" width="100%">
    <source src="assets/videos/timetravel.mp4" type="video/mp4">
  </video>
  `,

  "ambient-brass": `
    <iframe
  width="100%"
  height="300"
  scrolling="no"
  frameborder="no"
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/samuelewens/sets/ambient-brass-arrangements-of&color=%23a18f5e&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false">
</iframe>
  `,

  live: `
    <p>
      See below for some footage & photos of my live work with various artists such as Jungle (Brit
Awards - ITV1), Haircut 100 (BBC Radio 2 in the Park), Clean Bandit (BBC Radio 1 Live Lounge),
Louis Tomlinson (BBC Radio 1 Live Lounge), Myles Sanko (WDR TV), Suki Waterhouse (Wembley
Stadium, supporting Taylor Swift), Rae Morris (Toe Rag Studios), Get Cape. Wear Cape. Fly &
Resolution 88 (feat. Marcus Tenney).
    </p>

    <video controls width="100%" src="assets/videos/hc100horns_345.mp4"></video>

    <iframe width="100%" height="200" src="https://www.youtube.com/embed/V9TKYFNPH9U"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/6jZAVJfg7K4"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/T56V4ironL4"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/l2U2v29If9Q"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/mPSt74adFnQ"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/VcGC0GdRYus"></iframe>
    <iframe width="100%" height="200" src="https://www.youtube.com/embed/ho4hwROqA04"></iframe>

    <img src="assets/images/live01.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live02.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live03.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live04.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live05.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live06.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live07.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live08.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live09.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live10.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live11.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live12.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live13.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live14.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live15.png" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
    <img src="assets/images/live16.jpg" alt="Remote Sessions" style="width:100%; margin:10px 0;" />
  `,

  "mute-match-game": `
    <iframe
      src="https://itch.io/embed-upload/16091915?color=000000"
      width="100%"
      height="700"
      frameborder="0">
    </iframe>
  `,
};

// <iframe width="100%" height="200" src="https://youtube/T56V4ironL4?si=7Rw0BbsAEwewOUP0&t=1549"></iframe>

const canvas = document.getElementById("transitionCanvas");
const ctx = canvas.getContext("2d");

const landingImg = document.getElementById("landingImage");
const mainScene = document.getElementById("mainImage");
const mainImg = mainScene.querySelector(".scene-img");
const enterBtn = document.getElementById("enterBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TRANSITION_TYPE = "pixel"; // "zoom" | "pixel"

enterBtn.addEventListener("click", async () => {
  audio = new Audio(`assets/audio/Enter_sound.mp3`);
  await audio.play();
  if (TRANSITION_TYPE === "pixel") {
    startPixelTransition();
  } else {
    startZoomTransition();
  }
});

// enterBtn.addEventListener("click", startPixelTransition);
function startPixelTransition() {
  // 🔑 Match canvas to FULL image size
  // const imgRect = landingImg.getBoundingClientRect();

  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );

  const docWidth = document.documentElement.clientWidth;

  canvas.width = docWidth;
  canvas.height = docHeight;

  console.log("size", canvas);
  canvas.style.display = "block";
  enterBtn.style.pointerEvents = "none";

  let pixelSize = 1;
  const maxPixel = 60;

  function animate() {
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width / pixelSize;
    const h = canvas.height / pixelSize;

    // draw FULL landing image pixelated
    ctx.drawImage(landingImg, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    pixelSize += 2;

    if (pixelSize < maxPixel) {
      requestAnimationFrame(animate);
    } else {
      switchToMain();
    }
  }

  animate();
}

function switchToMain() {
  // hide landing
  landingImg.style.display = "none";

  // show main scene
  mainScene.style.display = "block";

  // ensure main scene is on top
  mainScene.style.zIndex = "10";

  // cleanup
  canvas.style.display = "none";
}

/* ===== OPTION B: ZOOM TRANSITION ===== */
function startZoomTransition() {
  enterBtn.style.pointerEvents = "none";

  landingImg.classList.add("zoom-transition");

  landingImg.addEventListener(
    "animationend",
    () => {
      landingImg.style.display = "none";
      mainScene.style.display = "block";
      mainScene.style.zIndex = "10";
    },
    { once: true },
  );
}

// if (true) {
//   const landingImage = document.getElementById("landingImage");
//   const enterBtn = document.getElementById("enterBtn");
//   const mainScene = document.getElementById("mainImage");
//   const canvas = document.getElementById("transitionCanvas");

//   // Hide landing & transition UI
//   if (landingImage) landingImage.style.display = "none";
//   if (enterBtn) enterBtn.style.display = "none";
//   if (canvas) canvas.style.display = "none";

//   // Show main scene immediately
//   if (mainScene) {
//     mainScene.style.display = "block";
//     mainScene.style.zIndex = "1";
//   }

//   // 🚫 Stop here — do NOT bind transition events
//   console.log("DEBUG MODE: Transition disabled, main scene forced visible");
// }
