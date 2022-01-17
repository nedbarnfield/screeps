const { filter } = require("lodash");

var roleHarvester = {
    /** 
     * @param {Creep} creep
     * A harvester is a creep with at least one carry, move and work parts.
     * i.e. Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY], 'Harvester1');
     * It can utilise the creep.moveTo, creep.harvest, and creep.transfer
     * methods to find an energy source, move to it, extract the energy and
     * finally transfer it to the spawn or other building to power it up.
     * */

    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleHarvester;