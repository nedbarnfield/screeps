var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    /**
     * The main loop takes a list of all available creeps and performs an
     * action based on their roles and context. Using the assigned role values
     * from their memory we can apply different actions to otherwise identical
     * creeps.
     * */
     for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}