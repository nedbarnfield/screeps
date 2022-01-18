/**
 * Since there are no events in the game to report death of a particular
 * creep the easiest way is to just count the number of required creeps,
 * and if it becomes less than a defined value, to start spawning.
 * */ 
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