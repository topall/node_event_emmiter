var log4js = require('log4js’);
exports.eventsLogger = function(eventEmitter){ 
  var emitToLog = eventEmitter.emit;

    eventEmitter.emit = function () {
        var event = arguments[0];
        console.log("event emitted: " + event);
        emitToLog.apply(eventEmitter, arguments);
    }
}