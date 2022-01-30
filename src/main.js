var roleHarvester = require('creeps_roles_harvester');
var roleUpgrader = require('creeps_roles_upgrader');
var roleBuilder = require('creeps_roles_builder');
var roleRepairer = require('creeps_roles_repairer');
var roleRepairer = require('creeps_roles_repairer');
const { filter } = require('lodash');
const towerAttack = require('creeps_towers_towerAttack');

module.exports.loop = function () {
    // Memory management
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // TODO: Implement a defend and grow method to prioritise defence (restocking energy to towers, ramparts, etc) when attackers are detected
    // for(roomName in Game.rooms){
    //     var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    //     if(hostiles.length > 0){
    //         var username = hostiles[0].owner.username;
    //         Game.notify(`User ${username} spotted in room ${roomName}`);
    //         defendRoom(roomName);
    //     }
    //     else{
    //         growRoom(roomName);
    //     }
    // }

    // Maintain constant workforce
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    // TODO: Needs to be spawn agnostic
    var towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });

    // Lower level room controller can only make basic creeps
    // Add in condition to only generate a creep when max capacity has been reached rather than test every tick - && (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] == Game.spawns['Spawn1'].store.getCapacity[RESOURCE_ENERGY])
    var available_energy = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION);
    var smallCreep = [WORK, CARRY, MOVE];
    var mediumCreep = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
    var largeCreep = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    if(available_energy.length < 1){
        var creepSize = smallCreep;
    }
    else if(available_energy.length < 5){
        var creepSize = mediumCreep;
    }
    else{
        var creepSize = largeCreep;
    }


    if(!Game.spawns['Spawn1'].spawning){
        if(harvesters.length < 2){
            
            var newName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(creepSize, newName, {memory: {role: 'harvester'}});
        }
        else if(upgraders.length < 3){
            var newName = 'Upgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(creepSize, newName, {memory: {role: 'upgrader'}});
        }
        else if(builders.length < 3){
            var newName = 'Builder' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(creepSize, newName, {memory: {role: 'builder'}});
        }
        else if(repairers.length < 2){
            var newName = 'Repairer' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(creepSize, newName, {memory: {role: 'repairer'}});
        }
    }
    else{     
        // Display name of screep being spawned
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
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    // Attack the nearest enemy if any.
    towers.forEach((tower) => towerAttack.run(tower));
}