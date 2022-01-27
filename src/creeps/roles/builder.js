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

	    if(creep.memory.building) {
            // Prioritise expansionary structures
            var structures = _.filter(creep.room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType == STRUCTURE_EXTENSION);
            if(structures.length > 0){
                if(creep.build(structures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // then build roads
            else{
                var targets = _.filter(creep.room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType != STRUCTURE_EXTENSION);
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	     }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;