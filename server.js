var flatiron = require('flatiron'),
  ecstatic = require('ecstatic'),
  app = flatiron.app;

// setup flatiron http server
app.use(flatiron.plugins.http, {
  before: [
    ecstatic(__dirname + '/public')
  ]
});

// run app
app.start(3000);

var io = require('socket.io').listen(app.server);

io.sockets.on('connection', function (socket) {
  socket.on('test:chg', function(data){
    socket.broadcast.emit('test:chg', data);
  });
  socket.on('code:chg', function(data){
    socket.broadcast.emit('code:chg', data);
  });

});


