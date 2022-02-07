var resourceManagement = require('creeps_functions_resourceManagement');
var structureManagement = require('creeps_functions_structureManagement');

var roleRepairer = {
    /** 
     * @param {Creep} creep
     * A repairer will prioritise the repair of expansionary, road, defence
     * structures and then finally walls.
     * 
    */
    run: function(creep) {
        // Set flags
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🛠️ repair');
	    }

        // Screep behaviour
	    if(creep.memory.repairing) { 
            structureManagement.repairStructures(creep);
	    }
	    else {
            resourceManagement.withdrawEnergy(creep);
	    }
	}
};

module.exports = roleRepairer;