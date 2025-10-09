
ItemEvents.rightClicked(event => {
    let { player, item, item: { id } } = event;
    const mainHandItem = player.mainHandItem
    const offHandItem = player.offHandItem
    if (mainHandItem.id === 'cosmosstuff:lux'&& offHandItem.id === 'cosmosstuff:umbra'){
    player.addItemCooldown(mainHandItem, 1000)
    player.addItemCooldown(offHandItem, 1000)
    player.runCommandSilent('/playsound minecraft:entity.allay.death ambient @a ~ ~ ~')
    player.runCommandSilent('/execute at @s as @e[distance=..10,tag=!LU] run damage @s 25 minecraft:magic')
    player.runCommandSilent('/particle minecraft:sculk_soul ~ ~ ~ 3.125 3.125 3.125 2.125 100')
    player.runCommandSilent('/particle minecraft:sculk_soul ~ ~ ~ 3.125 3.125 3.125 2.125 100')
    player.runCommandSilent('/particle minecraft:sculk_soul ~ ~ ~ 3.125 3.125 3.125 2.125 100')
    player.runCommandSilent('/particle minecraft:sculk_soul ~ ~ ~ 3.125 3.125 3.125 2.125 100')

   }    
});
EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:lux') return
    entity.potionEffects.add("minecraft:glowing", 1000, 0, false, true)
})
EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:umbra') return
    entity.potionEffects.add("minecraft:wither", 60, 4, false, true)
})
