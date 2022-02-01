module.exports = {
    goHarvest(creep){
        // Harvest from located source
        if(creep.memory.source){
            if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory.source), { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            }
        }
        // If not source id not saved search for one
        else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            creep.memory.source = source.id; 
        }
    },

    storeEnergy(creep){
        if(creep.memory.target && Game.getObjectById(creep.memory.target).store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.target), {
                        visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
                }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        // Structures that require energy
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE || 
                        structure.structureType == STRUCTURE_TOWER
                        ) 
                        // Where the structure is not at full energy capacity
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            // Assign target id to memory
            if(targets.length > 0){
                creep.memory.target = targets[0].id;
            }
            else{
                // TODO: Refactor to upgrader function
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};