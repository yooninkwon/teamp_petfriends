const app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  rtsp = require('rtsp-ffmpeg');
server.listen(6148); //열고싶은 포트번호 입력
var uri = 'rtsp://bluecctv:back15@172.16.220.2:554/stream1',
// var uri = 'rtsp://bluecctv:back15@172.16.4.2:5540/stream1';

  stream = new rtsp.FFMpeg({input: uri, command: 'C:\\FFmpeg-7.1\\bin\\ffmpeg.exe'});

 console.log('Stream :', stream);
io.on('connection', function(socket) {
  var pipeStream = function(data) {
    socket.emit('data', data.toString('base64'));
  };
  stream.on('data', pipeStream);
  socket.on('disconnect', function() {
    stream.removeListener('data', pipeStream);
  });
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
