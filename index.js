const express = require ('express'),
    morgan = require('morgan'),
    util = require('util'),
    cp = require('child_process'),
    logger = require('./commons/logger');
var jsonConcat = require("json-concat");
 
var jsonfile = require('jsonfile')
const fs = require('fs');
var sloc  = require('sloc');
var app = express();

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var validator = require('express-validator');

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));





app.use(cookieParser('keyboard cat'));

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(flash());
app.use(validator());
var bodyParser = require('body-parser');
var UserRoutes = require('./Routes/UserRoutes');

app.set('views', __dirname + '/Views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  
    res.send('Hello World!');
});


app.get('/read', function (req, res) {

var file = '/var/www/html/NodeMongo/log/log.json';

fileBuffer =  fs.readFileSync(file);
to_string = fileBuffer.toString();
split_lines = to_string.split("\n");
console.log(split_lines.length-1);
 
const stats = fs.statSync(file);
console.log(stats);

fs.readFile(file,
 function(err, data) {        
        var jsonData = data;
   var jsonParsed = JSON.parse(jsonData);
       console.log(jsonParsed);
     });

});

app.get('/array', function (req, res) {
    
var activity_object = { 'API': 'login' ,
                        'Timestamp' : '2018-01-03 14:30:00' , 
                        'Browser': 'mozilla',
                        'UserIP':'192.168.1.49',
                        'Device':'Web'};
var steps_array = [];

 steps_array.push('step1');
 steps_array.push('step2');
 steps_array.push('step3');
 steps_array.push('step4');

var request_object = {  'first_name':'kiran' , 
                        'last_name':'rao   ',
                        'signature':'adadasewqeq42qeqwvfasdasd'};

var response_object = {'status':'200','result':''};  

var logger_object = {'activity': activity_object,
                    'steps':steps_array ,
                    'request':request_object,
                    'response':response_object
                    };     


var file = '/var/www/html/NodeMongo/log/log.json';

const stats = fs.statSync(file);
console.log(stats);
fileBuffer =  fs.readFileSync(file);
to_string = fileBuffer.toString();
split_lines = to_string.split("\n");
var lineNumber = split_lines.length-1
console.log(split_lines.length-1);
if(stats.size ==0)
{
     logger_object = [logger_object];
     jsonfile.writeFileSync(file, logger_object, {spaces: 1, EOL: '\r\n',flag: 'a'});
}
else
{
        var filename = file;
        var lines2nuke = 1;
        var command = util.format('tail -n %d %s', lines2nuke, filename);

        cp.exec(command, (err, stdout, stderr) => {
            if (err) throw err;
            var to_vanquish = stdout.length;
            fs.stat(filename, (err, stats) => {
                if (err) throw err;
                fs.truncate(filename, stats.size - to_vanquish, (err) => {
                    if (err) throw err;
                   { 
                        console.log('File truncated!'); 
                         fs.appendFile(file, ',' , function (err) {
                       if (err) throw err;      
                        jsonfile.writeFileSync(file, logger_object, {spaces: 1, EOL: '\r\n',flag: 'a'});
                      fs.appendFile(file, ']' , function (err) { if (err) throw err;});

                       });
                   }
                })
            });
        });  

   


}





  res.json(logger_object);


})


app.get('/logs', function (req, res) {

var FileArray = [];
var object1 = [];
FileArray.push('/var/www/html/NodeMongo/log/login/2018/1/1.json') ;
FileArray.push('/var/www/html/NodeMongo/log/login/2018/1/2.json') ;
FileArray.push('/var/www/html/NodeMongo/log/login/2018/1/3.json') ;
FileArray.push('/var/www/html/NodeMongo/log/login/2018/1/4.json') ;
 len = FileArray.length;
 var json_obj;
 console.log(len)
for (var i = 0;i < len; i++) 
{
 object1 =  object1.concat(JSON.parse(fs.readFileSync(FileArray[i]))) ;

  //jsonfile.readFile(FileArray[i]);
}

/*start */

    //set default variables
    var totalLogs = object1.length,
        pageSize = 2,
        pageCount = totalLogs/2,
        currentPage = 1,
        logs = [],
        logsArrays = [], 
        logsList = [];

   
    //split list into groups
    while (object1.length > 0) {
        logsArrays.push(object1.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    //show list of students from group
    logsList = logsArrays[+currentPage - 1];
console.log(logsArrays);
    console.log({
        data: logsList,
        pageSize: pageSize,
        totalLogs: totalLogs,
        pageCount: pageCount,
        currentPage: currentPage
    });
    //render index.ejs view file
    res.render('pages/logs', {
         data: logsList,
        pageSize: pageSize,
        totalLogs: totalLogs,
        pageCount: pageCount,
        currentPage: currentPage
    });

/* End */
//res.render('pages/logs',{ data : object1});
 //res.json( object1);


});


app.get('/fs', function (req, res) {
  var results2 =JSON.parse(fs.readFileSync('/var/www/html/NodeMongo/log/login/2018/1/2.json'));

var results1 =JSON.parse(fs.readFileSync('/var/www/html/NodeMongo/log/login/2018/1/1.json'));

var results3 = results1.concat(results2);
res.json(results3);
})


app.get('/test', function (req, res) {
    logger.debug('Debug test');
    logger.info('Info test');
  res.send('Hello test!')
})
app.get('/kiran', function (req, res) {
    logger.debug('Debug kiran');
    logger.info('Info kiran');
  res.send('Hello kiran!')
})
app.get('/random/:fname/:lname', function (req, res) {

var str1 = req.params.fname;
var str2 = req.params.lname;
 
var suggesions = [];

var len1 = str1.length;
var len2 = str2.length;
var special_chars = [ '$' ,'.' ,'|' ,'?', '*', '+','_','-' ];

suggesions.push(padNum(str1));
suggesions.push(padNum(str2));
suggesions.push(padNum(str1+str2));
suggesions.push(padNum(str2+str1));
suggesions.push(padNum(str1[0]+str2));
suggesions.push(padNum(str2+str1[0]));

for(var i =0 ;i<special_chars.length;i++)
     {
	suggesions.push(padNum(str1+special_chars[i]+str2));
	suggesions.push(padNum(str2+special_chars[i]+str1));
	suggesions.push(padNum(str1[0]+special_chars[i]+str2));
	suggesions.push(padNum(str2+special_chars[i]+str1[0]));
     }

res.send(suggesions);



function padNum(str)
{
  if(str.length < 6)
  {
  var pad  = 6 - str.length;
  var no = Math.floor( Math.random()*100000).toString().substring(0,pad+1);
  return str+no;
  }
  else if(str.length > 18)
  {
  str = str.substring(0,18);  
  return str;
  }
else
 return str;
}

})
app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.get('/:id/kiran/:name', function (req, res) {
var params_array= Object.keys(req.params).map(function(k) { return req.params[k] });
console.log(params_array);
console.log(req.path);
console.log(req.url);
var final_api_arr=[];
var api_arr = req.path.split("/");
   var final_api = '';
	  for(i=0;i<api_arr.length ; i++)
	  {
	  	if(params_array.indexOf(api_arr[i]) == '-1')
	  		final_api_arr.push(api_arr[i]);
	  }
   api = final_api_arr.join("/");

console.log(api);




  res.send('path : '+req.path+ ' | folder to create : '+api);

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));







app.use((req, res, next) => {

    res.on('finish', function() {
    	    console.log("middleware running...");
       app.locals = {userdata :req.session.user };
    });
    	 
   
    next();
});
/*
app.locals = {
   userdata: {
        first_name: 'kiran',
        last_name: 'Bootstrap.',
        email:'abc@kbc.com'
    }
};
*/

app.use('/user',UserRoutes);
app.listen(5009);

console.log("All is well");

