import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import greet from "./greet.js";
import pkg from 'pg';
const { Client } = pkg;
import flash from 'express-flash';
import session from 'express-session';


const { Pool } = pkg;
import fs from 'fs';
import {
  createUsersTable,
  getUsers,
  addUser,
  getGreetedUsersCount,
  removeAllUsers,
} from './database.js';


const connectionString = process.env.DATABASE_URL||'postgres://bheka:OByrOSiZ7tqz1mAzx72ukmRZNAPr0Iol@dpg-cj5qva2cn0vc73flmoq0-a.oregon-postgres.render.com/razorma_r4tr';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});


client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });
  import { pool } from './database.js';

import { db } from './database.js';
async function connectToDatabase() {
  try {
    await db.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}
async function main() {
  // Create the 'users' table
  // await removeAllUsers()
  await createUsersTable();
  // await addUser();
  await connectToDatabase();
  // await getGreetedUsersCount();
  // await removeAllUsers()
  await getUsers();
  // db.$pool.end();
}

let app = express();
const greeting = greet()

app.use(session({ 
  secret: 'Razorma', 
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Setup the Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', async function (req, res) {
  try {
    const greetedCount = await getGreetedUsersCount(); 

    res.render('home', {
      name: greeting.greetName(),
      language: greeting.getLanguageGreeting(),
      counter: greetedCount, 
      errorName: greeting.errorName(),
      errorLang: greeting.errorLang(),
      errorMessage:req.flash('error'),
      infoMessage:req.flash('success')
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.post("/greetings", async function (req, res) {
  const letterRegex = /^[a-zA-Z ]*$/
  if(req.body.name===""||req.body.language===undefined){
    greeting.getName("")
    greeting.setLanguageGreeting("")
    req.flash('error', 'Please enter both name and language.');
  }else  if(!letterRegex.test(req.body.name)){
    greeting.getName("")
    greeting.setLanguageGreeting("")
    req.flash('error', 'Please enter a valid name of only letters.');

  }else  if(letterRegex.test(req.body.name)){
    greeting.getName(req.body.name)
    greeting.setLanguageGreeting(req.body.language)

    try {
      await addUser(req.body.name);
      await getUsers();
      // await getGreetedUsersCount();

    } catch (error) {
      console.error('Error adding user:', error.message);
    }

  } 
    res.redirect("/")
});
app.get("/greeted", async function (req, res) {
  try {
    const names = await getUsers(); 

    res.render('greeted', { names }); 
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.get("/counter/:name", async function (req, res) {
  const requestedName = req.params.name;
  try {
    const nameArray = await getUsers();
    const matchingUsers = nameArray.filter(user => user.username === requestedName);
    res.render('counter', { names: matchingUsers });
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/reset", async function (req, res) {
  greeting.getName("")
  greeting.setLanguageGreeting("")
  try {
    await removeAllUsers()
    req.flash('success', 'Names successesfully deleted from storage.');
  } catch (error) {
    console.error('Error deleting users:', error.message);
  }
  res.redirect("/")
});

  let PORT = process.env.PORT || 3012;
  
  app.listen(PORT, function(){
    console.log('App starting on port', PORT);
  });




main().catch((error) => {
  console.error('An error occurred:', error);
});
