var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const { filter } = require('lodash');

/**
 * Key points to consider:
 * Memory management:
 * - What metrics do I need to keep on top of?
 *      - What needs to happen when those metrics reach their limits?
 * - What is an ideal number of creeps?
 * CPU usage and code effeciency:
 * - Clean code is a must.
 * - Can you profile the code?
 * - Until extensions are filled produce small creeps, otherwise replace with larger ones
 * Resource sustainability:
 * - What happens when an energy source is depleted?
 * - Is there a limit to extraction rates in a tick?
 * Offence:
 * - Army?
 * Defence:
 * - How many towers and where should they be placed?
 * - Auto repair scripts
 */

module.exports.loop = function () {
    // Memory management


    // There should be two modes - defence and expansion
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0){
        defendRoom(Game.room);
    }
    else{
        expandRoom(Game.room);
    }

    // TODO: Work out the best mix of automated screep development
    // Starting game will require 1 harvester and 1 upgrader.
    // When do you swap them out and develop them further?

    
    /**
     * If the number of harvesters drops below 2 the Spawn will create a new
     * creep using the role and timestamp as a name, assigning it with the role
     * harvester.
     * Alternatively you can extend the life of a creep using the renewCreep
     * function - https://docs.screeps.com/api/#StructureSpawn.renewCreep
     */
    if(harvesters.length < 2){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
    }

    /**
     * If the Spawn is creating a creep it will display the type of creep it is
     * creating.
     */
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x+1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    /**
     * The main loop takes a list of all available creeps and performs an
     * action based on their roles and context. Using the assigned role values
     * from their memory we can apply different actions to otherwise identical
     * creeps.
     * */
     for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}