var resourceManagement = require('creeps_functions_resourceManagement');
var structureManagement = require('creeps_functions_structureManagement');

var roleBuilder = {

    /** 
     * @param {Creep} creep
     * A builder creep searches for buildings that need to be constructed and
     * then builds them. If no targets are available then it acts as 
     * a harvester. 
     * 
     * The state of the builder is controlled via a flag set in it's memory
     * named 'building' accessed via creep.memory.building. This boolean
     * is used in combination with the creep's energy storage to determine
     * whether or not it can build or whether it should harvest energy. 
     * 
     * 
     * Builder must prioritise building, then storing, then harvest.
     * 
     * 
    */
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

        // If it is building i.e. is carrying energy
	    if(creep.memory.building) {
            structureManagement.buildStructures(creep);
        }
	    else {
            resourceManagement.withdrawEnergy(creep);
        }
    }
};

module.exports = roleBuilder;