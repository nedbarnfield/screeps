var structureTower = {
    /**
     * @param {STRUCTURE_TOWER} tower
     * This module covers the default behaviour for any tower that is spawned
     * As effecacy declines with distance the closer of the heal and attack
     * targets will be targeted first.
     * 
     * Documentation: https://docs.screeps.com/defense.html
     */

    run: function(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
        if(closestDamagedStructure){
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            tower.attack(closestHostile);
        }
    }
}

module.exports = structureTower;