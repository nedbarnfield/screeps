/**
 * Since there are no events in the game to report death of a particular
 * creep the easiest way is to just count the number of required creeps,
 * and if it becomes less than a defined value, to start spawning.
 * */ 


// Such a colony can mine resources, build units, conquer territory
// room - 50 x 50 cells with 1-4 exits
// Three types of surfaces - Plain land, Swamps, Walls
// Customise room with Roads, Constructed walls, Ramparts
// Energy sources are the main resource. It is limited but refreshes every 300 ticks
// Spawns are the colony centers. Reaching the maximum of 3 spawns in a room conquers it
// Spawn extensions are required to build creeps with more than 3 parts
//


/**
 * Documentation: https://docs.screeps.com/creeps.html
 * Creeps are spawned from the room Spawn by allocating 3-50 parts from 7
 * available body part types:
 * - Work
 * - Move
 * - Carry
 * - Attack
 * - Ranged attack
 * - Heal
 * - Claim
 * - Tough
 * 
 * Early game create focus on harvesting, then upgrading the control centre to enable extensions, then creating larger creeps and ultimately building defenses and an army
 * 
 * Each allocated body part weighs the creep down and fatigues it.
 * To maintain the maximum movement speed of 1 square per tick, a creep
 * needs to have as many MOVE parts as all other parts combined
 * 
 * Creeps have 100 health per body part allocated
 * Order of parts in creation matters as when attacked the first parts listed will be destroyed and unavailable for use. Therefore attackers should have their attack listed last if the aim is to have them continue attacking for as long as possible, similarly defenders will likely have their Tough attribute at the end as they will not need their move parts if they are under seige anyway.
 * 
 * 
 * 
 * 
 * Suggested creep types include:
 * Ordinary workers
 * Huge construction machines able to build or repair a structure
 * Quick couriers
 * Capacious trucks
 * Fast and cheap scouts
 * Fighters with regeneration abilities
 * Tower like creeps with massive stats but move incredibly slowly
 * 
 * Creeps live for 1500 game ticks (30 - 60 minutes) so automation of creep
 * creation is essential.
 * 
 * Standard Spawn can only spawn regular creeps with a total of 300 energy parts
 * Extensions are required to add additional body parts and add
 * 50 energy per extension.
 * 
 * Number of extensions available for construction depends on the level of the Room Controller thus a flow control mechanism needs to be in place build them to their maximum for the level to enable stronger creep creation
 * 
 */


/**
 * Global Control Level: https://docs.screeps.com/control.html
 * 
 * To expand your colony you need to develop your Global Control Level metric
 * This will increase your CPU limit from 20 to the maximum of 300.
 * It will also increase the number of rooms you can control with 1 room per level gained.
 * New rooms will need to have the room controller be claimed bby a creep with the CLAIM body part. This will allow you to build a spawn and continue game play
 * 
 * Controllers need to be upgraded occasionally to maintain their energy so they don't regress levels.
 *
 * If you have additinoal neutral controllers that you can't access yet you can reserve them for future use when your GCL is higher.
 */

/**
 * Defence: https://docs.screeps.com/defense.html
 * 
 */

TODO:
Create a tower module and import functionality there.
Get a list of towers and use a for loop to trigger action for all of them












 var roleHarvester = require('role.harvester');
 var roleUpgrader = require('role.upgrader');
 
 module.exports.loop = function () {
 

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
     console.log('Harvesters: ' + harvesters.length);
 
     if(harvesters.length < 2) {
         var newName = 'Harvester' + Game.time;
         console.log('Spawning new harvester: ' + newName);
         Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
             {memory: {role: 'harvester'}});        
     }
     
     if(Game.spawns['Spawn1'].spawning) { 
         var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
         Game.spawns['Spawn1'].room.visual.text(
             '🛠️' + spawningCreep.memory.role,
             Game.spawns['Spawn1'].pos.x + 1, 
             Game.spawns['Spawn1'].pos.y, 
             {align: 'left', opacity: 0.8});
     }
 
     for(var name in Game.creeps) {
         var creep = Game.creeps[name];
         if(creep.memory.role == 'harvester') {
             roleHarvester.run(creep);
         }
         if(creep.memory.role == 'upgrader') {
             roleUpgrader.run(creep);
         }
     }
 }

/**
 * Example of a multi part larger creep to be made once 500 energy is available
 */
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );

// Activate safe mode when someone enters the room
Game.spawns['Spawn1'].room.controller.activateSafeMode();

// Setting up of defenses can be manual using the contrust pad or automated
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


// Structure Tower must be in the list of buildings the harvester will deliver energy to

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('6f7b51b8c7ad18b6763dce63');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

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