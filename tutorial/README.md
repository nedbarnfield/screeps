/**
 * Since there are no events in the game to report death of a particular
 * creep the easiest way is to just count the number of required creeps,
 * and if it becomes less than a defined value, to start spawning.
 * */ 


Introduction:
// Such a colony can mine resources, build units, conquer territory
// room - 50 x 50 cells with 1-4 exits
// Three types of surfaces - Plain land, Swamps, Walls
// Customise room with Roads, Constructed walls, Ramparts
// Energy sources are the main resource. It is limited but refreshes every 300 ticks
// Spawns are the colony centers. Reaching the maximum of 3 spawns in a room conquers it
// Spawn extensions are required to build creeps with more than 3 parts
//


/**
 * Documentation: https://docs.screeps.com/creeps.html
 * Creeps are spawned from the room Spawn by allocating 3-50 parts from 7
 * available body part types:
 * - Work
 * - Move
 * - Carry
 * - Attack
 * - Ranged attack
 * - Heal
 * - Claim
 * - Tough
 * 
 * Early game create focus on harvesting, then upgrading the control centre to enable extensions, then creating larger creeps and ultimately building defenses and an army
 * 
 * Each allocated body part weighs the creep down and fatigues it.
 * To maintain the maximum movement speed of 1 square per tick, a creep
 * needs to have as many MOVE parts as all other parts combined
 * 
 * Creeps have 100 health per body part allocated
 * Order of parts in creation matters as when attacked the first parts listed will be destroyed and unavailable for use. Therefore attackers should have their attack listed last if the aim is to have them continue attacking for as long as possible, similarly defenders will likely have their Tough attribute at the end as they will not need their move parts if they are under seige anyway.
 * 
 * 
 * 
 * 
 * Suggested creep types include:
 * Ordinary workers
 * Huge construction machines able to build or repair a structure
 * Quick couriers
 * Capacious trucks
 * Fast and cheap scouts
 * Fighters with regeneration abilities
 * Tower like creeps with massive stats but move incredibly slowly
 * 
 * Creeps live for 1500 game ticks (30 - 60 minutes) so automation of creep
 * creation is essential.
 * 
 * Standard Spawn can only spawn regular creeps with a total of 300 energy parts
 * Extensions are required to add additional body parts and add
 * 50 energy per extension.
 * 
 * Number of extensions available for construction depends on the level of the Room Controller thus a flow control mechanism needs to be in place build them to their maximum for the level to enable stronger creep creation
 * 
 */


/**
 * Global Control Level: https://docs.screeps.com/control.html
 * 
 * To expand your colony you need to develop your Global Control Level metric
 * This will increase your CPU limit from 20 to the maximum of 300.
 * It will also increase the number of rooms you can control with 1 room per level gained.
 * New rooms will need to have the room controller be claimed bby a creep with the CLAIM body part. This will allow you to build a spawn and continue game play
 * 
 * Controllers need to be upgraded occasionally to maintain their energy so they don't regress levels.
 *
 * If you have additinoal neutral controllers that you can't access yet you can reserve them for future use when your GCL is higher.
 */

/**
 * Defence: https://docs.screeps.com/defense.html
 * 
 */