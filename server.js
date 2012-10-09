var flatiron = require('flatiron'),
  filed = require('filed'),
  ejs = require('ejs'),
  es = require('event-stream'),
  request = require('request'),
  fs = require('fs'),
  template = fs.readFileSync('./views/template.html.ejs').toString(),
  app = flatiron.app;

// couch
var COUCH = process.env.COUCH || 'http://127.0.0.1:5984/testdrive';

// setup flatiron http server
app.use(flatiron.plugins.http);

// first time test runner
app.router.post('/run', function(){
  es.pipeline(this.req, request.post(COUCH), this.res );
});

// test runner with existing doc
app.router.post('/run/:id', function(id){
  console.log(this.req.body);
  es.pipeline(this.req, request.put(COUCH + '/' + id), this.res );
});

// get jasmine runner
app.router.get('/runner/:id', function(id){
  var temp = function(data,cb){ cb(null, ejs.render(template, data)) };
  es.pipeline(request(COUCH + '/' + id), es.parse(), es.map(temp), this.res);
});

// get index
app.router.get('/', function() {
  es.pipeline(filed(__dirname + '/public/index.html'), this.res);
});

// get assets
app.router.get('/css/*', function() {
  es.pipeline(filed(__dirname + '/public' + this.req.url), this.res);
});

app.router.get('/js/*', function() {
  es.pipeline(filed(__dirname + '/public' + this.req.url), this.res);
});

app.router.get('/spec/*', function() {
  es.pipeline(filed(__dirname + '/public' + this.req.url), this.res);
});

app.router.get('/loading.html', function() {
  es.pipeline(filed(__dirname + '/public' + this.req.url), this.res);
});

// run app
app.start(3000);
