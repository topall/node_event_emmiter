var util = require('util');
var events = require('events');

var emmiterDebug = function(eventEmitter){
    if (eventEmitter.prototype.emit instanceof Function) {
        var emitToLog = eventEmitter.prototype.emit;
        eventEmitter.prototype.emit = function (event, message) {
            console.log("event "+'"'+event+'"'+" emitted: " + message);
            emitToLog.apply(eventEmitter, arguments);
        }
    }
}

var Person = function(name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

emmiterDebug(Person);

var james = new Person('James');
var mary = new Person('Mary');
var ryu = new Person('Ryu');
var people = [james, mary, ryu];

people.forEach(function(person) {
    person.on('speak', function(message) {
        console.log(person.name + " says: " + message);
    });
});
james.emit('speak', 'Hi all!');

people.forEach(function(person) {
    person.emit('yeild', 'HII!');
    person.emit('speak', 'Hi!');
});

exports.eventsLogger = emmiterDebug;