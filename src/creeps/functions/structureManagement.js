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
    }
};