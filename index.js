import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import greet from "./greet.js";


let app = express();
const greeting = greet()

// Setup the Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  
    res.render('home',{
      name:greeting.greetName(),
      language:greeting.getLanguageGreeting(),
      counter:greeting.greetNumber(),
      errorName:greeting.errorName(),
      errorLang:greeting.errorLang(),
    });
});
  
app.post("/greetings", function (req, res) {
  if(req.body.name===""||req.body.language===undefined){
    res.redirect("/")
    greeting.getName("")
    greeting.setLanguageGreeting("")
      return
  }else{
    greeting.getName(req.body.name)
    greeting.setLanguageGreeting(req.body.language)

  } 
    res.redirect("/")
});

  let PORT = process.env.PORT || 3012;
  
  app.listen(PORT, function(){
    console.log('App starting on port', PORT);
  });