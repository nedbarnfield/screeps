/**
 * Since there are no events in the game to report death of a particular
 * creep the easiest way is to just count the number of required creeps,
 * and if it becomes less than a defined value, to start spawning.
 * */ 





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