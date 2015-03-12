var models = require("../../models/models");
var Person = models.Person;
var Thing = models.Thing;
var db = require("../../config/db");
describe("models", function(){
    var ids = {};
    beforeEach(function(done){
        db.connect(function(){
            models.seed(function(
              err, 
              moe, 
              larry, 
              curly, 
              rock,
              paper,
              scissors)
              {
                ids.moeId = moe._id;
                ids.larryId = larry._id;
                ids.curlyId = curly._id;
                ids.rockId = rock._id;
                ids.paperId = paper._id;
                ids.scissorsId = scissors._id;
                done();
            });
        });
    });
    afterEach(function(done){
        db.disconnect(function(){
            done();
        });
    });
    
    describe("Person", function(){
      describe("getPersonByName", function(){
          var person;
          beforeEach(function(done){
              Person.getOneByName("Moe", function(err, _person){
                  person = _person;
                  done();
              });
          });
          
          it("person is moe", function(){
              expect(person.name).toEqual("Moe");
          });
      });
      
      describe("getPersonById", function(){
        var person;
        beforeEach(function(done){
          Person.getOneById(ids.moeId, function(err, _person){
            person = _person;
            done();
          }); 
        });
        it("returns moe", function(){
          expect(person.name).toEqual("Moe");
        });
      });//end getPersonById
      
      describe("getAll", function(){
        var people;
        beforeEach(function(done){
          Person.getAll(function(err, _people){
            people = _people.map(function(person){
              return person.name;
            });
            done();
          });
        });
        it("return [curly, larry, moe]", function(){
          expect(people).toEqual(["Curly", "Larry", "Moe"]); 
        });
        
      });
      
    });//end of person tests
    describe("Thing", function(){
      describe("getOneByName", function(){
        var thing;
        beforeEach(function(done){
          Thing.getOneByName("Rock", function(err, _thing){
            thing = _thing;
            done();
          }); 
        });
        
        it("is a rock", function(){
          expect(thing.name).toEqual("Rock");
        });
      });//end of getOneByName
      describe("getOneById", function(){
        var thing; 
        beforeEach(function(done){
          Thing.getOneById(ids.rockId, function(err, _thing){
            thing = _thing;
            done();
          });
        });
        it("is a rock", function(){
          expect(thing.name).toEqual("Rock");
        });
      });
      describe("getAll", function(){
        var things;
        beforeEach(function(done){
          Thing.getAll(function(err, _things){
            things = _things.map(function(thing){
              return thing.name;
            });
            done();
          });
        });
        it("return [Paper, Rock, Scissors]", function(){
          expect(things).toEqual(["Paper", "Rock", "Scissors"]); 
        });
        
      });
    });//end of Thing
    
});