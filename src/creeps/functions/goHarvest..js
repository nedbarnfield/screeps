var goHarvest = {

    function(creep){
        // If there is a source Id in memory move to it
        if(creep.memory.source){
            if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory.source), { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            }
        }
        // If not search for one, save it, next tick it will move.
        else{
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            creep.memory.source = sources[0].id; 
        }
    }
};