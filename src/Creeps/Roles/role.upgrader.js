var roleUpgrader = {
    /**
     * @param {Creep} creep
     * An upgrader is identical to a harvester, however
     * instead of returning resources to the Spawn it will
     * return resources to the Room controler so that you can
     * upgrade the room
     */
    run: function(creep) {
        // If the creep's energy store is 0 find an energy source and harvest it
        if(creep.store[RESOURCE_ENERGY] == 0){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0]);
            }
        }
        // if energy != 0 then move towards the room controller and upgrade it
        else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
    }
}

module.exports = roleUpgrader;