var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var router = express.Router();
var routes = require('./routes/index')
    ;
var users = require('./routes/users');
var functions = require('./routes/functions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 8000);



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var url="localhost";

app.get('/getAll', function(req, res){

  var table;
  var securityToken;
  var Skip;
  var Take;
  //var namespace='duoworld.duoweb.info';
  var namespace='intouch.duosoftware.com';

  if(req.query.Skip==null) {
    console.log('Skip is taken as NULL');
  }
  else{
    Skip=req.query.Skip;
  }
  if(req.query.Take==null) {
    console.log('take is taken as NULL');
  }
  else{
    Take=req.query.Take;
  }

  if(req.query.securityToken==null) {
    res.end('Parameter securityToken name is invalid');
  }
  else{
    securityToken=req.query.securityToken;
  }
  if(req.query.className==null) {
    res.end('Parameter Class name cannot be NULL');
  }
  else{
    table=req.query.className;
  }
  //var url="localhost";
  //var securityToken="123";

  functions.getall(table,securityToken,Skip,Take,namespace, function(found){
    res.end(found);
  })


});


app.get('/getAllFromID', function(req, res){

  var table;
  var id;
  var securityToken;
  //var namespace='duoworld.duoweb.info';
  var namespace='intouch.duosoftware.com';

  if(req.query.securityToken==null) {
    res.end('Parameter securityToken name is invalid');
  }
  else{
    securityToken=req.query.securityToken;
  }
  if(req.query.id==null) {
    res.end('Parameter ID name cannot be NULL');
  }
  else{
    id=req.query.id;
  }
  if(req.query.className==null) {
    res.end('Parameter Class name cannot be NULL');
  }
  else{
    table=req.query.className;
  }
  //var url="localhost";


  functions.getallbyid(table,id,securityToken,namespace, function(found){
    res.end(found);
  })

});

app.post('/insertSingle', function(req, response){

  var table;
  var securityToken;
  var namespace='duoworld.duoweb.info';

  //var incPost=JSON.parse(req.param.securityToken);
  console.log(req.body);
  //console.log(req.body.securityToken);
  if(req.body.securityToken==null) {
    response.end('Parameter securityToken name is invalid');
  }
  else{
    securityToken=req.body.securityToken;
  }

  if(req.body.className==null) {
    response.end('Parameter Class name cannot be NULL');
  }
  else{
    table=req.body.className;
  }

  var KeyProp = req.body.KeyProperty;
  var Obj= req.body.Object;


  functions.insertSingle(table,securityToken,namespace,KeyProp,Obj, function(found){
    response.end(found);
  })

});

app.post('/insertMultiple', function(req, response){

  var table;
  var securityToken;
  var namespace='duoworld.duoweb.info';

  //var incPost=JSON.parse(req.param.securityToken);
  console.log(req.body);
  //console.log(req.body.securityToken);
  if(req.body.securityToken==null) {
    response.end('Parameter securityToken name is invalid');
  }
  else{
    securityToken=req.body.securityToken;
  }

  if(req.body.className==null) {
    response.end('Parameter Class name cannot be NULL');
  }
  else{
    table=req.body.className;
  }
  //var url="localhost";


  //What I need in input json
  //{"className":"customer","securityToken":"123", "KeyProperty":"id","Object":{"id":"111", "name":"abc"}};

  var KeyProp = req.body.KeyProperty;
  var Obj= req.body.Object;


  functions.insertMultiple(table,securityToken,namespace,KeyProp,Obj, function(found){
    response.end(found);
  })


});


app.post('/sqlQuery', function(req, response){

  var table='customer';
  var securityToken=123;
  var namespace='duoworld.duoweb.info';
  var Query= req.body.Object;


  functions.sqlQuery(table,securityToken,namespace,Query, function(found){
    response.end(found);
  })


});






app.get('/deletefromid', function(req, res){


  var table;            //Class Name
  var id;               //Value of Primary Key
  var key=null;              //Primary Key field
  var securityToken;    //Token


  if(req.query.key==null) {
    res.end('Parameter Key name is invalid');
  }
  else{
    key=req.query.key;
  }
  if(req.query.securityToken==null) {
    res.end('Parameter securityToken name is invalid');
  }
  else{
    securityToken=req.query.securityToken;
  }
  if(req.query.id==null) {
    res.end('Parameter ID name cannot be NULL');
  }
  else{
    id=req.query.id;
  }
  if(req.query.className==null) {
    res.end('Parameter Class name cannot be NULL');
  }
  else{
    table=req.query.className;
  }
  //var url="localhost";
  var temp=key.toString();
  //{"Object":{"id":"1001"}, "Parameters":{"KeyProperty":"id"}}
  var del_data=JSON.stringify({"Object":{"id":"1004"}, "Parameters":{"KeyProperty":"id"}});

  var options = {
    headers: {
      'securityToken': securityToken,
      'log': 'log',
      'Content-Type': 'application/json'
    },
    host: url,
    port: 3000,
    path: '/duoworld.duoweb.info/'+table,
    method: 'DELETE'
  };


  functions.DELEminator(del_data,options,function (found){
    //console.log(found);
    //var result=JSON.stringify(found);
    res.end(found);
    //res.end("");

  });

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
