import { run } from "./role.harvester";

export function loop() {
    /** A harvester is a creep with at least one carry, move and work parts.
     * It can utilise the creep.moveTo, creep.harvest, and creep.transfer
     * methods to find an energy source, move to it, extract the energy and
     * finally transfer it to the spawn or other building to power it up. */
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        run(creep);
    }
}