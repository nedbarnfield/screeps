var resourceManagement = require('creeps_functions_resourceManagement');
var roleUpgrader = {
    /**
     * @param {Creep} creep
     * An upgrader is identical to a harvester, however
     * instead of returning resources to the Spawn it will
     * return resources to the Room controler so that you can
     * upgrade the room
     */
    run: function(creep) {

        // If the creep's energy store is 0 find an energy source and harvest it
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }

	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('🚧 upgrade');
	    }

        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
        else{
            resourceManagement.withdrawEnergy(creep);
        }
    }
}

module.exports = roleUpgrader;