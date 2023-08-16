import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import greet from "./greet.js";
import flash from 'express-flash';
import session from 'express-session';
import createUsersTable from "./tables.js"
import pgPromise from 'pg-promise';
import GreetingRoutes from "./routes/greetings.js"

const pgp = pgPromise();

// Define the database connection configuration
const connectionString = process.env.DATABASE_URL || 'postgres://bheka:OByrOSiZ7tqz1mAzx72ukmRZNAPr0Iol@dpg-cj5qva2cn0vc73flmoq0-a.oregon-postgres.render.com/razorma_r4tr';
const ssl = { rejectUnauthorized: false }

// Create a database instance using pg-promise
const db = pgp({ connectionString, ssl });
export {db}
import AddAndRetrieveNames from "./database.js";

// Initialize AddAndRetrieveNames with the database instance
const addAndRetrieveNames = AddAndRetrieveNames(db)

// Initialize GreetingRoutes with AddAndRetrieveNames
const greetingRoutes = GreetingRoutes(addAndRetrieveNames)

// Perform table creation on application startup
async function main() {
  await createUsersTable(db);
}

let app = express();
const greeting = greet()

// Configure session and flash middleware
app.use(session({ 
  secret: 'Razorma', 
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Setup the Handlebars view engine
app.engine('handlebars', engine({
  // Define a custom Handlebars helper
  helpers: {
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Define routes using GreetingRoutes
app.get('/', greetingRoutes.showAdd);
app.post("/greetings", greetingRoutes.add);
app.get("/greeted", greetingRoutes.get);
app.get("/counter/:name", greetingRoutes.getFor);
app.post("/reset", greetingRoutes.reset);

let PORT = process.env.PORT || 3012;

// Start the server
app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});

// Run the main function to create tables
main().catch((error) => {
  console.error('An error occurred:', error);
});
