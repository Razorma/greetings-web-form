
import assert from "assert";
import greeting from "../greet.js";


describe('Greet Function tests' , function(){
    it('it should not greet the same name twice' , function(){
        let greets = greeting();
        greets.getName("bheka")
        greets.getName("bheka")
        greets.getName("bheka")
        greets.getName("bheka")
         assert.equal(greets.greetNumber(),1);
 
     });
    it('it should be able to get the name that is passed' , function(){
        let greet = greeting()
        greet.getName('Bob')
        assert.equal(greet.greetName(),'Bob');

    });
    it('it should be able to greet the name that is passed' , function(){
        let greet = greeting()
        greet.setLanguageGreeting('Hello')
        greet.getName('Bob')
        assert.equal(greet.getLanguageGreeting() + greet.greetName(),'Hello, Bob');

    });
    it('it should not greet you if anything other than latters is entered' , function(){
        let greet = greeting()
        greet.getName(',// ')
        assert.equal(greet.greetName(),'');
    });
    it('it should be able to greet you with Molo if isiXhosa is checked' , function(){
        let greet = greeting()
        greet.getName('Bob')
        greet.setLanguageGreeting('Molo')
        assert.equal(greet.getLanguageGreeting(),'Molo, ');

    });
    it('it should be able to greet you with Sawbona if isiZulu is checked' , function(){
        let greet = greeting()
        greet.getName('Bob')
        greet.setLanguageGreeting('Sawbona')
        assert.equal(greet.getLanguageGreeting(),'Sawbona, ');

    });
    it('it should be able to greet you with Hello if English is checked' , function(){
        let greet = greeting()
        greet.getName('Bob')
        greet.setLanguageGreeting('Hello')
        assert.equal(greet.getLanguageGreeting(),'Hello, ');

    });
    it('it should be able return an error message if name and language is not entered' , function(){
        let greet = greeting()
        assert.equal(greet.error().nameMessage,"please enter Name");
        assert.equal(greet.error().langMessage,"please enter language");

    });
    

});
