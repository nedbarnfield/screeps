const { add } = require("lodash");

module.exports = {
    repairStructures(creep){
        if(this.repairExpansionaryStructures(creep) != 0){
            if(this.repairRoads(creep) != 0){
                if(this.repairDefenceStructures(creep) != 0){
                    this.repairWalls(creep);
                };
            }
        }
    },

    repairExpansionaryStructures(creep){
        // Repair all structures that are not walls
        // Refactor this to take boilerplate into own function with structure array as argument
        const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && (object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_ROAD && object.structureType != STRUCTURE_RAMPART)
        });

        if(targets.length > 0) {
            targets.sort((a,b) => a.hits - b.hits);
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 0;
            }
        }
        else{
            return -1;
        }
    },

    repairDefenceStructures(creep){
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && (object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_TOWER)
        });

        if(targets.length > 0) {
            targets.sort((a,b) => a.hits - b.hits);
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 0;
            }
        }
        else{
            return -1;
        }
    },

    repairWalls(creep){
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL 
        });

        if(targets.length > 0) {
            targets.sort((a,b) => a.hits - b.hits);
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 0;
            }
        }
        else{
            return -1;
        }
    },

    repairRoads(creep){
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && object.structureType == STRUCTURE_ROAD
        });

        if(targets.length > 0) {
            targets.sort((a,b) => a.hits - b.hits);
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 0;
            }
        }
        else{
            console.log('No roads to repair.')
            return -1;
        }
    },

    buildStructures(creep){
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
        // TODO: Extract to it's own transfer function in defence
        // Then store energy
        // else{
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (
        //                 // Structures that require energy
        //                 structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ||
        //                 structure.structureType == STRUCTURE_TOWER
        //                 ) 
        //                 // Where the structure is not at full energy capacity
        //                 && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //         }
        //     })
        //     if (targets.length > 0) {
        //         if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        //         }
        //     }
        else{
            this.repairDefenceStructures(creep);
        }
    }
};