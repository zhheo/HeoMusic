console.log("\n %c HeoMusic 开源静态音乐播放器 v1.5 %c https://github.com/zhheo/HeoMusic \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
var local = false;

if (typeof userId === 'undefined') {
  var userId = "8152976493"; // 替换为实际的默认值
}
if (typeof userServer === 'undefined') {
  var userServer = "netease"; // 替换为实际的默认值
}
if (typeof userType === 'undefined') {
  var userType = "playlist"; // 替换为实际的默认值
}

if (typeof remoteMusic !== 'undefined' && remoteMusic) {
  fetch(remoteMusic)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        localMusic = data;
      }
      loadMusicScript();
    })
    .catch(error => {
      console.error('Error fetching remoteMusic:', error);
      loadMusicScript();
    });
} else {
  loadMusicScript();
}

function loadMusicScript() {
  if (typeof localMusic === 'undefined' || !Array.isArray(localMusic) || localMusic.length === 0) {
    // 如果 localMusic 为空数组或未定义，加载 Meting2.min.js
    var script = document.createElement('script');
    script.src = './js/Meting2.min.js';
    document.body.appendChild(script);
  } else {
    // 否则加载 localEngine.min.js
    var script = document.createElement('script');
    script.src = './js/localEngine.min.js';
    document.body.appendChild(script);
    local = true;
  }
}

var volume = 0.8;

// 获取地址栏参数
// 创建URLSearchParams对象并传入URL中的查询字符串
const params = new URLSearchParams(window.location.search);

var heo = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const heoMusicBg = document.getElementById("music_bg")

    if (isChangeBg) {
      // player loadeddata 会进入此处
      const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
      var img = new Image();
      img.src = extractValue(musiccover.style.backgroundImage);
      img.onload = function() {
        heoMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      };
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(()=>{
        const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
        // 确保player加载完成
        if (musiccover) {
          clearInterval(timer)
          //初始化音量
          if (local) {
            ap.volume(0.8, true);
          }else {
            document.querySelector('meting-js').aplayer.volume(0.8,true);
          }

          // 绑定事件
          heo.addEventListenerChangeMusicBg();
          // 添加歌词点击事件
          heo.addLyricClickEvent();
        }
      }, 100)
    }
  },
  addEventListenerChangeMusicBg: function () {
    const heoMusicPage = document.getElementById("heoMusic-page");
    if (local) {
      ap.on('loadeddata', function () {
        heo.changeMusicBg();
    });
    }else {
      heoMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
        heo.changeMusicBg();
        // console.info('player loadeddata');
      });
    }
  },

  scrollLyric: function() {
    const lrcContent = document.querySelector('.aplayer-lrc');
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    
    if (lrcContent && currentLyric) {
      let targetScrollTop = currentLyric.offsetTop;
      lrcContent.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  },

  getCustomPlayList: function() {
    const heoMusicPage = document.getElementById("heoMusic-page");
    const playlistType = params.get("type") || "playlist";
    
    if (params.get("id") && params.get("server")) {
      console.log("获取到自定义内容")
      var id = params.get("id")
      var server = params.get("server")
      heoMusicPage.innerHTML = `<meting-js id="${id}" server="${server}" type="${playlistType}" mutex="true" preload="auto" order="random"></meting-js>`;
    } else {
      console.log("无自定义内容")
      heoMusicPage.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="${userType}" mutex="true" preload="auto" order="random"></meting-js>`;
    }
    heo.changeMusicBg(false);
  },
  bindEvents: function () {
    var e = this;
    // 添加歌词点击事件
    if (this.lrc) {
        this.template.lrc.addEventListener('click', function (event) {
            // 确保点击的是歌词 p 元素
            var target = event.target;
            if (target.tagName.toLowerCase() === 'p') {
                // 获取所有歌词元素
                var lyrics = e.template.lrc.getElementsByTagName('p');
                // 找到被点击歌词的索引
                for (var i = 0; i < lyrics.length; i++) {
                    if (lyrics[i] === target) {
                        // 获取对应时间并跳转
                        if (e.lrc.current[i]) {
                            var time = e.lrc.current[i][0];
                            e.seek(time);
                            if (e.paused) {
                                e.play();
                            }
                        }
                        break;
                    }
                }
            }
        });
    }
  },
  // 添加新方法处理歌词点击
  addLyricClickEvent: function() {
    const lrcContent = document.querySelector('.aplayer-lrc-contents');
    
    if (lrcContent) {
        lrcContent.addEventListener('click', function(event) {
            if (event.target.tagName.toLowerCase() === 'p') {
                const lyrics = lrcContent.getElementsByTagName('p');
                for (let i = 0; i < lyrics.length; i++) {
                    if (lyrics[i] === event.target) {
                        // 获取当前播放器实例
                        const player = local ? ap : document.querySelector('meting-js').aplayer;
                        // 使用播放器内部的歌词数据
                        if (player.lrc.current[i]) {
                            const time = player.lrc.current[i][0];
                            player.seek(time);
                        }
                        break;
                    }
                }
            }
        });
    }
  },
}

// 调用
heo.getCustomPlayList();


// 改进vh
const vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 1;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//获取图片url
function extractValue(input) {
  var valueRegex = /\("([^\s]+)"\)/g;
  var match = valueRegex.exec(input);
  return match[1];
}

//空格控制音乐
document.addEventListener("keydown", function(event) {
  //暂停开启音乐
  if (event.code === "Space") {
    event.preventDefault();
    if (local) {
      ap.toggle();
    }else {
      document.querySelector('meting-js').aplayer.toggle();
    }

  };
  //切换下一曲
  if (event.keyCode === 39) {
    event.preventDefault();
    if (local) {
      ap.skipForward();
    }else {
      document.querySelector('meting-js').aplayer.skipForward();
    }

  };
  //切换上一曲
  if (event.keyCode === 37) {
    event.preventDefault();
    if (local) {
ap.skipBack();
    }else {
      document.querySelector('meting-js').aplayer.skipBack();
    }

  }
  //增加音量
  if (event.keyCode === 38) {
    if (volume <= 1) {
      volume += 0.1;
      if (local) {
        ap.volume(volume,true);
      }else {
        document.querySelector('meting-js').aplayer.volume(volume,true);
      }

    }
  }
  //减小音量
  if (event.keyCode === 40) {
    if (volume >= 0) {
      volume += -0.1;
      if (local) {
        ap.volume(volume,true);
      }else {
        document.querySelector('meting-js').aplayer.volume(volume,true);
      }
      
    }
  }
});