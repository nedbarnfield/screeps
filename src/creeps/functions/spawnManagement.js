module.exports = {
    displaySpawnInfo(spawn){
        // Display name of screep being spawned in room
        var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
        Game.spawns[spawn].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawn].pos.x+1,
            Game.spawns[spawn].pos.y,
            {align: 'left', opacity: 0.8});
    },

    spawnCreepsWrapper(spawn, creepRole){
        /**
         * @param spawn: The spawn from which you will create a creep
         * @param creepRole: The role the creep will perform at runtime
         * 
         * This wrapper determines the name based on their roles,
         * and the number of body parts based on the available energy.
         */
        var newName = creepRole + Game.time;
        var creepPartsLimit = Math.floor(Game.spawns[spawn].room.energyCapacityAvailable / 250)
        var creepParts = [];
        for(var i = 0; i < creepPartsLimit; i++){
            creepParts.push(WORK, CARRY, MOVE, MOVE);
        }
        Game.spawns[spawn].spawnCreep(creepParts, newName, {memory: {role: creepRole}});
    },

    spawnReporting(spawn){
        // TODO: Needs to be creeps specific to spawn
        var activeCreeps = Object.keys(Game.creeps).length;
        console.log('Active creeps: ' + activeCreeps + '; ' + 'Current room energy: ' + Game.spawns['Spawn1'].room.energyAvailable + '; ' + 'Current max room energy: ' + Game.spawns['Spawn1'].room.energyCapacityAvailable);
    }
}