var roleRepairer = {

    /** 
     * @param {Creep} creep
     * A builder creep searches for repairings that need to be constructed and
     * then builds them. If no targets are available then it acts as 
     * a harvester. 
     * 
     * The state of the builder is controlled via a flag set in it's memory
     * named 'repairing' accessed via creep.memory.repairing. This boolean
     * is used in combination with the creep's energy storage to determine
     * whether or not it can build or whether it should harvest energy. 
    */
    run: function(creep) {
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🛠️ repair');
	    }

        // Currently sorting each tick and repairing a different object each time until they are all the same health.
        // Needs to store an object id and then heal it until it is at full health
	    if(creep.memory.repairing) {
            // Repair all structures that are not walls
        	const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            // As a last resort target walls
            else{
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL
                });
                
                targets.sort((a,b) => a.hits - b.hits);

                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
	    }
	    else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            }
	    }
	}
};

//         // TODO: Tidy up 
// 	    if(creep.memory.repairing) {
//             // Repair target
//         	if(creep.memory.repairTarget){
//                 var target = Game.getObjectById(creep.memory.repairTarget);
//                 if(target.hits != target.hitsMax){
//                     if(creep.repair(Game.getObjectById(creep.memory.repairTarget)) == ERR_NOT_IN_RANGE) {
//                         creep.moveTo(Game.getObjectById(creep.memory.repairTarget))
//                     }
//                     else{
//                         // otherwise define new target
//                         const targets = creep.room.find(FIND_STRUCTURES, {
//                             filter: object => object.hits < object.hitsMax
//                         });
//                         // TODO: Should be based on percentage not ints
//                         targets.sort((a,b) => a.hits - b.hits);
//                         creep.memory.repairTarget = targets[0].id;
//                     }
//                 }
//             }
//         }
// 	    else {
//             var source = creep.pos.findClosestByPath(FIND_SOURCES);
//             if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
//             }
//         }
// 	}
// };

module.exports = roleRepairer;