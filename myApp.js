let express = require('express');
//to parse data coming form POST requests
let bodyParser = require('body-parser'); 
let app = express();
require('dotenv').config();

//body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))

//应用层全局中间件
app.use((req,res,next)=>{
    console.log('middleware');
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
//内置的静态资源中间件
app.use('/public', express.static(__dirname + '/public')); 
//app.use(path, middlewareFunction)

app.get('/',(req,res)=>{
    console.log('gethtml');
    //res.send('Hello Express'); //sending a request
    res.sendFile(__dirname + '/views/index.html'); 
    //respond to request with a file
})

//引用.env全局变量
app.get('/json',(req,res) => {
    console.log('getjson');
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({
            "message": "HELLO JSON"
        })
    }else{
        res.json({
            "message": "Hello json"
        });
    }
});

//router层中间件，可复用
app.get('/now',function getTime(req,res,next){
    req.time = new Date().toString();
    next(); 
},(req,res)=>{
    res.json({
        time:req.time
    })
})

//req params 从url中提取特定的值
app.get('/:word/echo',(req,res)=>{
    res.json({
        echo: req.params.word
    })
})
//req query
app.get('/name',(req, res)=>{
    const querystring = req.query.first + " " + req.query.last;
    const query = {
        name: querystring
    }
    res.json(query);
}).post('/name',(req,res)=>{
    const querystring = req.body.first + ' ' + req.body.last;
    res.json({
        name:querystring
    })
})



console.log("Hello World");
































 module.exports = app;

