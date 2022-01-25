/**
 * Debugging can be logged to the console using the standard
 * console.log function or debugged using a debugger keyword
 * which provides a breakpoint in the web versions.
 * 
 * 
 */

// Example from the documentation - https://docs.screeps.com/debugging.html
 var result = creep.attack(target);
 if(result != OK) {
     console.log(creep + ' failed to attack the target ' + target +
                     ' with the code: ' + result);
 }

 // TODO: Create lambda function to console log error code if result != OK