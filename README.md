# HeoMusic

![](/img/cover.webp)

一个基于[Aplayer](https://github.com/DIYgod/APlayer)和[MetingJS](https://github.com/metowolf/MetingJS)的静态音乐播放器

## 预览

[HeoMusic - 用音乐感染人心](https://music.zhheo.com/)

## 基本操作

`Space空格键`：暂停/播放音乐

`上/下方向键`：增加/减少音量

`左/右方向键`：上一曲/下一曲

## 修改歌单

`id`：歌单的id

`server`：歌单的服务商，例如`netease`,`tencent`,`kugou`,`xiami`,`baidu`

### 使用URL参数（推荐）

HeoMusic支持URL参数 `https://music.zhheo.com/?id=`+ id +`&server=` + server

例如：https://music.zhheo.com/?id=8668419170&server=tencent

### 修改HTML的方法（需要自行搭建）

编辑`index.html`的相关代码，填写歌单id和服务商

![修改id和server](/img/help.webp)

直接访问首页`index.html`即可

## 浏览器支持

要求chrome或基于Chromium的v100以上浏览器

兼容Safari浏览器

## 参与开发

[@张洪Heo](https://github.com/zhheo)
[@anzhiyu](https://github.com/anzhiyu-c)
[@Glowed](https://github.com/Glowed)

## 许可

项目中包含的Aplayer及MetingJS的修改版本，他们均使用MIT协议