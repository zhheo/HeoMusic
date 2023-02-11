var heo = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const heoMusicBg = document.getElementById("music_bg")

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
      heoMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(()=>{
        const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
        // 确保player加载完成
        console.info(heoMusicBg);
        if (musiccover) {
          clearInterval(timer)
          heoMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          heo.addEventListenerChangeMusicBg();
        }
      }, 100)
    }
  },
  addEventListenerChangeMusicBg: function () {
    const heoMusicPage = document.getElementById("heoMusic-page");
    const aplayerIconMenu = heoMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");

    heoMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
      heo.changeMusicBg();
      console.info('player loadeddata');
    });
  }
}

// 调用
heo.changeMusicBg(false);
