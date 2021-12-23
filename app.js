if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express=require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app=express();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require("mongoose");

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
//*************technology***********//
const menus=[{
  id:'cs',
  col:'header',
  name:'Computer Science',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_compsci/comp1.svg',
  define:'“Computer Science” is an umbrella term which encompasses four major areas of computing: theory, algorithms, programming languages, and architecture.'
},
{
  id:'wd',
  col:'header1',
  name:'Web Development',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_webdev/webdev1.svg',
  define:'In general, web development refers to the tasks involved in creating websites for intranet or internet hosting. Web design, web content development, client-side/server-side scripting, and network security settings are all part of the web development process.'
},
{
  id:'ds',
  col:'header2',
  name:'Data Science',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_datascience/datascience1.svg',
  define:'Data science is a discipline that combines domain knowledge, programming abilities, and math and statistics knowledge to extract useful insights from data. Machine learning algorithms are used to numbers, text, photos, video, audio, and other data to create artificial intelligence (AI) systems that can execute jobs that would normally need human intelligence. As a result, these systems produce insights that analysts and business users may employ to create meaningful commercial value.'
},
{
  id:'md',
  col:'header3',
  name:'Mobile Development',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_mobdev/mobdev1.svg',
  define:'A typical mobile application uses a network connection to work with remote computing resources, and mobile application development is the process of designing software applications that operate on a mobile device. As a result, the mobile development process entails building installable software bundles (code, binaries, assets, and so on), integrating backend services like data access through an API, and testing the app on target devices.'
},
{
  id:'cp',
  col:'header4',
  name:'Competitive Programming',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_comppro/comppro1.svg',
  define:'If you are a programmer, you have probably grasped the significance of Steve Jobs words, and you have probably also noticed that even after you have turned off your computer, you can not stop thinking about the programming or code you have created for your project. By splitting your code into smaller bits and then utilising your logic-based creativity to address an issue from several angles, you not only learn how to code, but you also learn the "art of thinking."'
},
{
  id:'gd',
  col:'header5',
  name:'Game Development',
  img:'https://varcode-project.github.io/creative-at-home/ilustrasi/bagian_gamedev/gamedev1.svg',
  define:'The term "game development" refers to the process of designing, developing, and releasing a game. It may entail concept generation, design, construction, testing, and distribution. It is critical to consider game mechanics, rewards, player involvement, and level design when creating a game.'
},]
const users =[]

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.sendFile(__dirname+'/views/index.html')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.sendFile(__dirname+'/views/register.html')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.get("/menu",function(req,res){
  res.sendFile(__dirname+'/views/menu.html')
});
app.get("/section/:Reqname",function(req,res){
  const p=req.params.Reqname;
   menus.forEach(function(tech){
      if(tech.id==p){
         res.render("section",{ItemName:tech.name,ItemInfo:tech.define,ItemSrc:tech.img,style:tech.col});
      }
   });
});

app.get("/about",function(req,res){
  res.sendFile(__dirname+'/views/About.html')
});

app.get("/contact",function(req,res){
  res.sendFile(__dirname+'/views/contact.html')
});

app.get("/search",function(req,res){
  res.sendFile(__dirname+'/views/search.html')
});
app.post("/contact",function(req,res){
   const name= req.body.username;
   const email=req.body.email;
   const msg=req.body.query;
   res.redirect("/");
});

app.post("/search",function(req,res){
   const p=req.body.search;
   menus.forEach(function(tech){
    if(tech.name==p){
       res.render("section",{ItemName:tech.name,ItemInfo:tech.define,ItemSrc:tech.img,style:tech.col});
    }
 });
 res.send("NOT FOUND");
});
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
