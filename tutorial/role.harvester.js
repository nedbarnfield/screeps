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
                creep.moveTo(sources[0]);
            }
        }
        else {
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
};

module.exports = roleHarvester;