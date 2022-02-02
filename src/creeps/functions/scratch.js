module.exports = {
    goHarvest(creep){
        // Harvest from located source
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
        }
        if(creep.memory.source){
            if(Game.getObjectById(creep.memory.source).energy > 0){
                if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.source), { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
                }
            }
            else{
                // Find new source if current one has no energy
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                creep.memory.source = source.id; 
            }
        }
    },

    withdrawEnergy(creep){
        // TODO: Replace with a single object
        var storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    // Structures that require energy
                    structure.structureType == STRUCTURE_CONTAINER 
                    // Where the structure is not at full energy capacity
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        // var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0); 
        // console.log(storage);
        if(creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage[0]);
        }
    },

    storeEnergy(creep){
        var creepStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    // Structures that require energy
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION 
                    // Where the structure is not at full energy capacity
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        if(creepStorage.length > 0){
            if(creep.transfer(creepStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(creepStorage[0], {
                    visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
            }
        }

        // if(creep.memory.target && Game.getObjectById(creep.memory.target).store.getFreeCapacity(RESOURCE_ENERGY) > 0){

        //     if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        //             creep.moveTo(Game.getObjectById(creep.memory.target), {
        //                 visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
        //         }
        // }
        else{
            // // Prioritise spawning structures and then storage and defence
            // var spawningTargets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (
            //             // Structures that require energy
            //             structure.structureType == STRUCTURE_SPAWN ||
            //             structure.structureType == STRUCTURE_EXTENSION
            //             ) 
            //             // Where the structure is not at full energy capacity
            //             && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //     }
            // });

            var storageTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        // Structures that require energy
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE || 
                        structure.structureType == STRUCTURE_TOWER
                        ) 
                        // Where the structure is not at full energy capacity
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            // Assign target id to memory
            if(storageTargets.length > 0){
                if(creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storageTargets[0], {
                        visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
                    }
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