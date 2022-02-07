var roleHarvester = require('creeps_roles_harvester');
var roleUpgrader = require('creeps_roles_upgrader');
var roleBuilder = require('creeps_roles_builder');
var roleRepairer = require('creeps_roles_repairer');
var roleRepairer = require('creeps_roles_repairer');
const { filter } = require('lodash');
const towerAttack = require('creeps_towers_towerAttack');
var spawnManagement = require('creeps_functions_spawnManagement');

module.exports.loop = function () {
    // Memory management
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // TODO: Implement a defend and grow method to prioritise defence (restocking energy to towers, ramparts, etc) when attackers are detected
    for(roomName in Game.rooms){
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0){
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
            // defendRoom(roomName);
        }
        // else{
        //     growRoom(roomName);
        // }
    }

    // Maintain constant workforce
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    // TODO: Create a container/roadworker class - have 1 of each repair and roadworker
    // TODO: Needs to be spawn agnostic
    // Report on room stats
    if(Game.time % 10 == 0){
        spawnManagement.spawnReporting('Spawn1');
    }

    // Spawn creeps and maintain workforce!
    var activeCreeps = Object.keys(Game.creeps).length;
    if(activeCreeps <=  7 && (Game.spawns['Spawn1'].room.energyAvailable == Game.spawns['Spawn1'].room.energyCapacityAvailable)){
        if(harvesters.length < 3){
            spawnManagement.spawnCreepsWrapper('Spawn1', 'harvester');
        }
        else if(upgraders.length < 2){
            spawnManagement.spawnCreepsWrapper('Spawn1', 'upgrader');
        }
        else if(repairers.length < 1){
            spawnManagement.spawnCreepsWrapper('Spawn1', 'repairer');
        }
        else if(builders.length < 1){
            spawnManagement.spawnCreepsWrapper('Spawn1', 'builder');
        }
    }

    // Display spawning creep info in room
    if(Game.spawns['Spawn1'].spawning){
        spawnManagement.displaySpawnInfo('Spawn1');
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
}