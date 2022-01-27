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
            var expansionary_structures = _.filter(creep.room.find(FIND_CONSTRUCTION_SITES), (structure) => structure.structureType != STRUCTURE_ROAD);
            var roads = _.filter(creep.room.find(FIND_CONSTRUCTION_SITES), (road) => road.structureType == STRUCTURE_ROAD);

            // Prioritise expansionary structures
            if(expansionary_structures.length > 0){
                if(creep.build(expansionary_structures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(expansionary_structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // Then roads
            else if(roads.length > 0){
                if(creep.build(roads[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roads[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // Then store energy
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            // Structures that require energy
                            structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER
                            ) 
                            // Where the structure is not at full energy capacity
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                })
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
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