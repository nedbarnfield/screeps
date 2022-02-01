const { filter } = require("lodash");
var resourceManagement = require('creeps_functions_resourceManagement');

var roleHarvester = {
    /** 
     * @param {Creep} creep
     * A harvester is a creep with at least one carry, move and work parts.
     * i.e. Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY], 'Harvester1');
     * It can utilise the creep.moveTo, creep.harvest, and creep.transfer
     * methods to find an energy source, move to it, extract the energy and
     * finally transfer it to the spawn or other building to power it up.
     * */

    run: function (creep) {
        // Set flags to ensure all resources are consumed before switching tasks

        // If creep at full capacity, stop harvesting and go store energy
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
            creep.say('🚧 store');
        }

        // If the creep has no energy left then it needs to go harvest
        if (!creep.store.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
	        creep.say('🔄 harvest');
        }

        // Harvest or store
        if(creep.memory.harvesting == true){
            resourceManagement.goHarvest(creep);
        }
        else {
            resourceManagement.storeEnergy(creep);
        }
    }
};

module.exports = roleHarvester;