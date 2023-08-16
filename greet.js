
var namesGreeted = {};
var greetingsCounter = 0;
// Define a function that returns an object with greeting-related functions
export default function greeting(){
    
    // Initialize variables

    
    let theLanguage = ''
    let name = '';
    let nameMessage = ''; 
    let langMessage =""
    
    // Function to set the name and update the greeted names
    function getName(passedName){
        // Regular expression to validate only alphabetic characters and spaces
        const letterRegex = /^[a-zA-Z ]*$/
        
        if (passedName.trim().toLowerCase() !== '' && letterRegex.test(passedName)) {
            name = passedName.trim() ;
            
            // Update namesGreeted object and greetingsCounter
            if (namesGreeted[passedName.toLowerCase()] === undefined) {
              greetingsCounter++;
              namesGreeted[passedName.toLowerCase()] = 0;
            } else {
                namesGreeted[passedName.toLowerCase()] = passedName.toLowerCase();
            }
        } else {
            name = ""
            nameMessage = "please enter Name"
            theLanguage=""
            setTimeout(function () {
                nameMessage = '';
            }, 3000)
        }
    }
    
    // Function to get the current name
    function greetName(){
        return  name
    }
    
    // Function to get the greetingsCounter
    function greetNumber(){
        return greetingsCounter
    }
  
    // Function to get the greeted names
    function greetedNames(){
        return namesGreeted
    }
    
    // Function to set the greeting language and handle errors
    function setLanguageGreeting(lang){
        if(lang===undefined||lang===""){
            theLanguage=""
            name=""
            langMessage = "please enter language"
            setTimeout(function () {
                langMessage = '';
            }, 3000)
        } else {
            theLanguage = lang+", ";
        }
    }
    
    // Function to get the greeting language and handle errors
    function getLanguageGreeting(){
        if(theLanguage===undefined){
            theLanguage=""
            langMessage = "please enter language"
            setTimeout(function () {
                langMessage = '';
            }, 3000)
        } else {
            return  theLanguage
        }
    }
    
    // Function to get the name-related error message
    function errorName(){
        setTimeout(function () {
            nameMessage = '';
        }, 3000)
        return nameMessage
    }
    
    // Function to get the language-related error message
    function errorLang(){
        theLanguage=""
        return langMessage
    }
    
    // Function to get both name and language error messages
    function error(){
        return {
            nameMessage : "please enter Name",
            langMessage : "please enter language",
        }
    }
    
    // Return an object with all the defined functions
    return {
        getName,
        greetName,
        setLanguageGreeting,
        getLanguageGreeting,
        greetNumber,
        greetedNames,
        error,
        errorName,
        errorLang
    }
}

