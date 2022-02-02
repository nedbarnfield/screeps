const { add } = require("lodash");

module.exports = {
    goHarvest(creep){
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE){
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
        }
    },

    storeEnergy(creep){
        // Preference expansionary structures then stockpiles
        var expansionaryStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) 
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if(expansionaryStorage.length > 0){
            target = creep.pos.findClosestByRange(expansionaryStorage); 
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target, {visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
            }
        }
        else {
            var stockpileStorage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });

            target = creep.pos.findClosestByRange(stockpileStorage); 
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, {visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5});
            }
        }
    },

    withdrawEnergy(creep){
        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0; }
        });
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    }
};