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
        // Set flags to ensure all resources are consumed before switching tasks

        // If the creep has full capacity it needs to stop harvesting and go store energy
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
            creep.say('🚧 store');
        }

        // If the creep has no energy left then it needs to go harvest
        if (!creep.store.harvesting &&  creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
	        creep.say('🔄 harvest');
        }


        // Harvest
        if(creep.memory.harvesting == true){
            goHarvest(creep);
        }
        else {
            // Deliver resources until RESOURCE_ENERGY == 0
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        // Structures that require energy
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER || 
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
            else{
                // If there are no targets that need energy go upgrade
                if(creep.memory.upgrading){
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
};

function goHarvest(creep){
    if(creep.memory.source){
        if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.getObjectById(creep.memory.source), { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
        }
    }
    // If not search for one, save it, next tick it will move.
    else{
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        creep.memory.source = source.id; 
    }
};


// TODO: Debug this and implement
function storeEnergy(creep){
    if(!creep.memory.target){
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
        })
        creep.memory.target = targets[0].id;
    };
    
    if(Game.getObjectById(creep.memory.target).store.getFreeCapacity() > 0){
            if (creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 });
            }
    }
    else{
        creep.memory.target = null;
    }
}

module.exports = roleHarvester;