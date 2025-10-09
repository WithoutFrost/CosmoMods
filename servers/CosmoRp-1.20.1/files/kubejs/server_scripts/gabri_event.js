ItemEvents.rightClicked(event => {
    let { player, item, item: { id } } = event;
    const mainHandItem = player.mainHandItem
    const offHandItem = player.offHandItem
    if (mainHandItem.id === 'cosmosstuff:rita'){
    player.addItemCooldown(mainHandItem, 6000)
    player.runCommandSilent('/playsound minecraft:entity.elder_guardian.ambient ambient @a ~ ~ ~')
    player.runCommandSilent('/execute at @s as @e[distance=..7] run effect give @s minecraft:resistance 60 1 true')
    player.runCommandSilent('/execute at @s as @e[distance=..7] run effect give @s minecraft:regeneration 60 1 true')
    player.runCommandSilent('/execute at @s as @e[distance=..7] run effect give @s minecraft:haste 60 1 true')
    player.runCommandSilent('/execute at @s as @e[distance=..7] run effect give @s minecraft:absorption 60 3 true')
    player.runCommandSilent('/particle minecraft:end_rod ~ ~ ~ 3.125 3.125 3.125 0.125 100')
    player.runCommandSilent('/particle minecraft:end_rod ~ ~ ~ 3.125 3.125 3.125 0.125 100')
    player.runCommandSilent('/particle minecraft:end_rod ~ ~ ~ 3.125 3.125 3.125 0.125 100')
    player.runCommandSilent('/particle minecraft:end_rod ~ ~ ~ 3.125 3.125 3.125 0.125 100')

   }    
});

EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:rita') return
    entity.potionEffects.add("survival_instinct:bleeding", 500, 0, false, true)
})

EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:rita') return
    entity.potionEffects.add("minecraft:mining_fatigue", 500, 0, false, true)
})

const Diva_Tag = "santo";

PlayerEvents.tick((event)=> {
    const player  = event.player;
        const hasrita = player.inventory.allItems.some(item =>
        !item.isEmpty() && item.id === 'cosmosstuff:rita'
    )
        if(!player.getTags().contains(Diva_Tag)&&hasrita){
            player.runCommandSilent('/damage @s 5 minecraft:magic')
            player.runCommandSilent('/effect give @s minecraft:slowness 5 6 true')
        }
});

