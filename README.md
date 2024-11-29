# HeoMusic

![](/img/HeoMusic3.webp)

一个基于[Aplayer](https://github.com/DIYgod/APlayer)和[MetingJS](https://github.com/metowolf/MetingJS)的静态音乐播放器

## 预览

[HeoMusic - 用音乐感染人心](https://music.zhheo.com/)

## 基本操作

`Space空格键`：暂停/播放音乐

`上/下方向键`：增加/减少音量

`左/右方向键`：上一曲/下一曲

## 修改歌单/私有部署与配置（适用于在线音乐）

### ID

播放列表的id，可以从音乐歌单分享的链接中获取，例如`https://y.qq.com/n/ryqq/playlist/8668419170`中，id为`8668419170`

### Server

播放列表的服务商，例如`netease`（网易云音乐）,`tencent`（腾讯）,`kugou`（酷狗）,`xiami`（小米音乐）,`baidu`（百度音乐）

### Type（可选）

播放列表的类型，例如`song`（单曲）, `playlist`（歌单，默认）, `album`（专辑）, `search`（搜索结果）, `artist`（歌手）

### localMusic（可选）

本地音乐/外链音乐。如果填写了本地音乐，则优先使用本地音乐。

本地音乐需要添加loaclMusic数组，它的形式类似于：

```
  var localMusic = [{
      name: '重生之我在异乡为异客',
      artist: '王睿卓',
      url: '/music/重生之我在异乡为异客.mp3',
      cover: '/music/重生之我在异乡为异客.png',
      lrc: '/music/重生之我在异乡为异客.lrc'
  },
  {
      name: '落',
      artist: '唐伯虎',
      url: '/music/落.mp3',
      cover: '/music/落.png',
      lrc: '/music/落.lrc'
  }
  ];
```

### remoteMusic（可选）

使用json格式的链接来进行读取localMusic，会覆盖localMusic的设置。

例如：

```
var remoteMusic = './music.json';
```

musicjson内容例如：

```
[
  {
    "name": "重生之我在异乡为异客",
    "artist": "王睿卓",
    "url": "/music/重生之我在异乡为异客.mp3",
    "cover": "/music/重生之我在异乡为异客.png",
    "lrc": "/music/重生之我在异乡为异客.lrc"
  },
  {
    "name": "落",
    "artist": "唐伯虎",
    "url": "/music/落.mp3",
    "cover": "/music/落.png",
    "lrc": "/music/落.lrc"
  }
]
```

## 使用URL参数（推荐）

HeoMusic支持URL参数 `https://music.zhheo.com/?id=`+ id +`&server=` + server

例如：

**HeoMusicTop:** https://music.zhheo.com/?id=8668419170&server=tencent

**鸡你太美:** https://music.zhheo.com/?id=2762963245&server=netease

## 修改HTML的方法（适用于在线音乐和本地音乐）

编辑`index.html`的相关代码，填写歌单id和服务商

![修改id和server](/img/help.webp)

直接访问首页`index.html`即可

## 参与开发

[@张洪Heo](https://github.com/zhheo)
[@anzhiyu](https://github.com/anzhiyu-c)
[@Glowed](https://github.com/Glowed)
[@kuole-o](https://github.com/kuole-o)
[查看更多](https://github.com/zhheo/HeoMusic/graphs/contributors)

## 许可

项目中包含已经过修改的 MIT 协议项目

[Aplayer](https://github.com/DIYgod/APlayer)

[MetingJS](https://github.com/metowolf/Meting)

[MetingAPI](https://github.com/injahow/meting-api)

项目中包含的未经过修改的 MIT 协议项目

[color-thief](https://github.com/lokesh/color-thief)

图标采用remixicon，使用 Apache 协议

## 打赏

如果你喜欢这个项目，不妨支持一下作者，让作者更有动力更新！

[去打赏作者](https://rewards.zhheo.com/)