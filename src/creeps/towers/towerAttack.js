// Documentation: https://docs.screeps.com/defense.html
var towerAttack = {
    /** 
     * @param {STRUCTURE_TOWER} tower
     * A tower can attack enemies, heal creeps, and repair structures
     * This simple module is to ensure early game hostile creeps will
     * at least be dealt with.
     * 
    */
    run: function(tower) {
        const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                // Not a threat if they have no attack parts left
                return object.getActiveBodyparts(ATTACK) == 0;
            }
        });
        if(target){
            tower.attack(target);
        }
    }
};

module.exports = towerAttack;