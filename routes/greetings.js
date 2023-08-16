import greet from "../greet.js";
const greeting = greet()


export default function GreetingRoutes(addAndRetrieveNames){

    async function showAdd(req, res) {
        try {
          const greetedCount = await addAndRetrieveNames.getGreetedUsersCount(); 
      
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
      }
      async function add(req, res) {
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
            await addAndRetrieveNames.addUser((req.body.name).toLowerCase());
            await addAndRetrieveNames.getUsers();
          } catch (error) {
            console.error('Error adding user:', error.message);
          }
      
        } 
          res.redirect("/")
      }

      async function get(req, res) {
        try {
          const names = await addAndRetrieveNames.getUsers(); 
      
          res.render('greeted', { names }); 
        } catch (error) {
          console.error('Error getting users:', error.message);
          res.status(500).send('Internal Server Error');
        }
      }

      async function getFor(req, res) {
        const requestedName = req.params.name;
        try {
          const nameArray = await addAndRetrieveNames.getUsers();
          const matchingUsers = nameArray.filter(user => user.username === requestedName);
          res.render('counter', { names: matchingUsers });
        } catch (error) {
          console.error('Error getting users:', error.message);
          res.status(500).send('Internal Server Error');
        }
      }

      async function reset(req, res) {
        greeting.getName("")
        greeting.setLanguageGreeting("")
        try {
          await addAndRetrieveNames.removeAllUsers()
          req.flash('success', 'Names successesfully deleted from storage.');
        } catch (error) {
          console.error('Error deleting users:', error.message);
        }
        res.redirect("/")
      }
      return{
        showAdd,
        add,
        get,
        getFor,
        reset,
      }
}