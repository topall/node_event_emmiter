var util = require('util');
var events = require('events');

var emmiterDebug = function(eventEmitter, eventList){
    var eventList = {};
    if (eventEmitter.emit instanceof Function) {
        var emitToLog = eventEmitter.emit;
        //console.log( util.inspect(emitToLog, { showHidden: true, depth: null }) );
        eventEmitter.emit = function (event, message) {
            console.log("event "+'"'+event+'"'+" emitted: " + message);
            emitToLog.apply(eventEmitter, arguments);
            if(!eventList[event])
                eventList[event] = 0;
            eventList[event]++;
        }
    }
    return eventList;
}

var Person = function(name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person('James');
var mary = new Person('Mary');
var ryu = new Person('Ryu');
var people = [james, mary, ryu];

// people.forEach(function(person) {
//     // console.log(person.on);
//     person.on('speak', function(message) {
//         console.log(person.name + " says: " + message);
//     });
// });
james.on('speak', function(message) {
    console.log(james.name + " says: " + message);
});

var eventList = emmiterDebug(james);
console.log('Num of events='+util.inspect(eventList, { showHidden: true, depth: null }));
james.emit('speak', 'Hi all!');
james.emit('rrrrr', 'Hi all!!!!');
james.emit('rrrrr2', 'Hi all!!!!');
james.emit('rrrrr', 'Hi all!!!!');
james.emit('rrrrr', 'Hi all!!!!');
james.emit('rrrrr3', 'Hi all!!!!');
console.log('Num of events='+util.inspect(eventList, { showHidden: true, depth: null }));

// people.forEach(function(person) {
//     person.emit('yeild', 'HII!');
//     person.emit('speak', 'Hi!');
// });

exports.eventsLogger = emmiterDebug;