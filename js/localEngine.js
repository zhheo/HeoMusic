var encodedLocalMusic = localMusic.map(item => ({
  name: item.name,
  artist: item.artist,
  url: encodeURIComponent(item.url),
  cover: encodeURIComponent(item.cover),
  lrc: encodeURIComponent(item.lrc)
}));

document.getElementById('heoMusic-page').classList.add('localMusic');

const ap = new APlayer({
  container: document.getElementById('heoMusic-page'),
  lrcType: 3,
  audio: encodedLocalMusic
});