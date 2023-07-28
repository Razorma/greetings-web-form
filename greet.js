
var namesGreeted = {};
var greetingsCounter = 0;
export default function greeting(){
    
    let theLanguage = ''
    let name = '';
    let nameMessage = ''; 
    let langMessage =""
    function getName(passedName){
        const letterRegex = /^[a-zA-Z ]*$/
        if (passedName.trim().toLowerCase() !== '' && letterRegex.test(passedName)) {
            name = passedName.trim() ;
            if (namesGreeted[passedName.toLowerCase()] === undefined) {
              greetingsCounter++;
              namesGreeted[passedName.toLowerCase()] = 0;
            }else{
                namesGreeted[passedName.toLowerCase()] = passedName.toLowerCase();
            }
        }else{
            nameMessage = "please enter Name"
            theLanguage=""
            setTimeout(function () {
                nameMessage = '';
            }, 3000)
        }
       
    }
    function greetName(){
        return  name
    }
    function greetNumber(){
        return greetingsCounter
    }
  
    function greetedNames(){
        return namesGreeted
    }
    function setLanguageGreeting(lang){
        if(lang===undefined){
            theLanguage=""
            name=""
            langMessage = "please enter language"
            setTimeout(function () {
                langMessage = '';
            }, 3000)
        }else{
            theLanguage = lang+", ";
        }
        
    }
    function getLanguageGreeting(){
        if(theLanguage===undefined){
            theLanguage=""
            langMessage = "please enter language"
            setTimeout(function () {
                langMessage = '';
            }, 3000)
        }else{
            return  theLanguage
        }
    }
    function errorName(){
        setTimeout(function () {
            nameMessage = '';
        }, 3000)
        return nameMessage
     }
    function errorLang(){
        theLanguage=""
       return langMessage
    }
    function error(){
        return{
            nameMessage : "please enter Name",
            langMessage : "please enter language",

        }
    }
    return{
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
