// Modified from source: http://stackoverflow.com/a/18078705/772086
var ajax = {};
ajax.x = function() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }
  var versions = [
    "MSXML2.XmlHttp.6.0",
    "MSXML2.XmlHttp.5.0",
    "MSXML2.XmlHttp.4.0",
    "MSXML2.XmlHttp.3.0",
    "MSXML2.XmlHttp.2.0",
    "Microsoft.XmlHttp"
  ];

  var xhr;
  for (var i = 0; i < versions.length; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    } catch (e) {}
  }
  return xhr;
};

ajax.send = function(url, callback, method, data, async) {
  if (async === undefined) {
    async = true;
  }
  var x = ajax.x();
  x.open(method, url, async);
  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      callback(x.responseText)
    }
  };
  if (method == 'POST') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  x.send(data)
};

ajax.get = function(url, data, callback, async) {
  var query = [];
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

// Get subscriber count
function getSubscriberCount() {
  ajax.get('https://www.googleapis.com/youtube/v3/channels', {
    part: 'statistics',
    id: 'UC0v-tlzsn0QZwJnkiaUSJVQ',
    key: 'AIzaSyA2CqJawypLfBg0M7KSjH0DH9fecvLYnW4'
  }, function(res) {
    var channelInfo = JSON.parse(res)
    var subscriberCount = channelInfo.items[0].statistics.subscriberCount

      document.getElementById('odometer').innerHTML = subscriberCount;
  });
}

getSubscriberCount();
setInterval(getSubscriberCount, 5000);

// Play/Pause on Button Click
function toggleAudio() {
  var audio = document.getElementById('background_audio');
  var button = document.getElementById('play');

  if (audio.paused) {
    audio.play();
    button.innerHTML = 'Pause Sad Music';
  } else {
    audio.pause();
    button.innerHTML = 'Play Sad Music';
  }
}
