# Screeps Documentation Summary #
- - - -
## Introduction ##
### Documentation: https://docs.screeps.com/creeps.html ###
 Such a colony can mine resources, build units, conquer territory
 room - 50 x 50 cells with 1-4 exits
 Three types of surfaces - Plain land, Swamps, Walls
 Customise room with Roads, Constructed walls, Ramparts
 Energy sources are the main resource. It is limited but refreshes every 300 ticks
 Spawns are the colony centers. Reaching the maximum of 3 spawns in a room conquers it
 Spawn extensions are required to build creeps with more than 3 parts


## Creeps ##
### Documentation: https://docs.screeps.com/creeps.html ###

  Creeps are spawned from the room Spawn by allocating 3-50 parts from 7
  available body part types:
  * Work
  * Move
  * Carry
  * Attack
  * Ranged attack
  * Heal
  * Claim
  * Tough
  
  Early game create focus on harvesting, then upgrading the control centre to enable extensions, then creating larger creeps and ultimately building defenses and an army
  
  Each allocated body part weighs the creep down and fatigues it.
  To maintain the maximum movement speed of 1 square per tick, a creep
  needs to have as many MOVE parts as all other parts combined
  
  Creeps have 100 health per body part allocated
  Order of parts in creation matters as when attacked the first parts listed will be destroyed and unavailable for use. Therefore attackers should have their attack listed last if the aim is to have them continue attacking for as long as possible, similarly defenders will likely have their Tough attribute at the end as they will not need their move parts if they are under seige anyway.
  
  
  Since there are no events in the game to report death of a particular
  creep the easiest way is to just count the number of required creeps,
  and if it becomes less than a defined value, to start spawning.
  
  
  
  *Suggested creep types include:*
  Ordinary workers
  Huge construction machines able to build or repair a structure
  Quick couriers
  Miners for minerals, electrictions for energy (same based but differentiated on role to ensure spread of resources)
  Capacious trucks
  Fast and cheap scouts
  Fighters with regeneration abilities
  Tower like creeps with massive stats but move incredibly slowly
  
  Creeps live for 1500 game ticks (30 - 60 minutes) so automation of creep
  creation is essential.
  
  Standard Spawn can only spawn regular creeps with a total of 300 energy parts
  Extensions are required to add additional body parts and add
  50 energy per extension.
  
  Number of extensions available for construction depends on the level of the Room Controller thus a flow control mechanism needs to be in place build them to their maximum for the level to enable stronger creep creation
  
 


## Control ##
### Documentation: https://docs.screeps.com/control.html ###

  To expand your colony you need to develop your Global Control Level metric
  This will increase your CPU limit from 20 to the maximum of 300.
  It will also increase the number of rooms you can control with 1 room per level gained.
  New rooms will need to have the room controller be claimed bby a creep with the CLAIM body part. This will allow you to build a spawn and continue game play
  
  Controllers need to be upgraded occasionally to maintain their energy so they don't regress levels.
 
  If you have additional neutral controllers that you can't access yet you can reserve them for future use when your GCL is higher.
 

## Defense ##
### Documentation: https://docs.screeps.com/defense.html ###

Defense in screeps can be broken into passive and active defenses. Prioritise destruction of specific roles first i.e. healers.

  Passive defense:
  Walls may be built to block entrances to your colony. They need to be reinforced as they begin with 1 health but can be bolsted to 300,000,000.

  Ramparts offer the same protection of walls however you can move through and defend from them freely. Ramparts start with 1 health too however the maximum is determined by the level of the room controller. The trade off for the superior defense is that ramparts need to be maintained as they lose health every few ticks.

  Safemode is activated when starting the game and can offer approximately 20 hours of protection at a later time if the room controller has extra available activations. It is the last resort if all other defenses fail.

  Active defense:
  Towers are available from room level 3 onwards and provide the means to destroy enemy creeps. Towers can attack enemies, heal creeps and repair structures.

  Each action costs 10 energy and the effect diminishes with distance so towers should target structures and creeps closest too them for maximum effect.

  Assult teams will be able to withstand towers therefore defensive creeps need to be part of a well structured response to invasion. Given the resources required to build and maintain creeps during peacetime creep defenders should be spawned when hostile creeps enter the room.

  ## Resources ##
### Documentation: https://docs.screeps.com/resources.html ###
There are 4 kinds of resources in Screeps:
* Energy
* Minerals
* Power
* Commodities

#### Energy ####
Available in most rooms and is used to spawn creeps and building structures.
A screep with a WORK part is required to harvest it.
Room Controller level required: > 0

#### Minerals ####
Available in most rooms and is used to boost creeps' capabilities and producing trade commododities.
To gather minerals build a StructureExtractor and send a crep with a WORK part to harvest it.

There are 7 mineral types but only one will be present in each room so multiple rooms need to be controlled or trade routes open to gain access to different minerals.

Minerals are inexhaustable.

Room Controller level required: > 6

View documentation for tables on how to use the minerals effectively and how to set up labs.

#### Commodities ####
Produced in "highway rooms" in the form of a desposit.
To gather commodities send a crep with a WORK part to harvest it.
Commodities can be used to produce trade commodities and earn credits.

Factories are required to transform any of the four types of commodities into more complex commodities for sale. 
Commodities are exhausted after extraction.

Room Controller level required: > 7

View documentation for tables on how to use commodities effectively and how to set up Operatores and Factories for processing.

#### Power ####
Available in "highway" rooms, gained by looting the dropped resources from a destroyed StructurePowerBank.
Used for creating Power Creeps.

  ## Market ##
  ### Documentation: https://docs.screeps.com/market.html ###
  A proper stock exchange! Place buy and sell orders in to gain credits and resources using the Terminal structure.
  Requires energy to transfer resources from one room to another.

## NPC Invaders ##
  ### Documentation: https://docs.screeps.com/invaders.html ###

  Once every 100,000 energy mined an NPC attacker will attempt to destroy your creeps from an entrace to an adjoining neutral room.
  There is also a 10% chance that there will be a raid party of between 2-5 creeps.
  Neighbouring sectors may have a stronghold spawning the invaders. Destroying it will give you some invasion free time and also reward you with heavy resouces.

  ## Power ##
  ### Documentation: https://docs.screeps.com/power.html ###
  An end game mechanic that allows you to make your creeps more effecient.

  Power allows you to spawn Power Creeps that are effectively hero creeps.
  Power Creeps are persistant and tied to your account allowing you to respawn endlessly after an 8 hour cooldown.
  Room Controller level required: > 8