ItemEvents.rightClicked(event => {
    let { player, item, item: { id } } = event;
    const mainHandItemi = player.mainHandItem
    if (mainHandItemi.id === 'cosmosstuff:laminae_fames'){
    player.addItemCooldown(mainHandItemi, 500)
    player.runCommandSilent('/playsound sons_of_sins:wistiver_sceamer ambient @a ~ ~ ~')
    player.runCommandSilent('/particle sons_of_sins:blood_particle ~ ~ ~ 1.25 1.25 1.25 0.425 500')
    player.runCommandSilent('/execute at @s as @e[distance=..10,tag=!fome] run sanity set @a[distance=..10,tag=!fome] 25')
    player.runCommandSilent('/effect give @s minecraft:invisibility 128 1 true')
    player.runCommandSilent('/execute at @s as @e[distance=..7,tag=!fome] run effect give @s biomancy:bleed 30 3 true')
    player.runCommandSilent('/execute at @s as @e[distance=..10] run summon sons_of_sins:guzzler ~ ~ ~')
    player.runCommandSilent('/execute at @s as @e[distance=..3] run summon macabre:limbsplitter ~ ~ ~')
    player.runCommandSilent('/execute at @s as @e[distance=..7,type=!minecraft:player] run effect give @s minecraft:resistance 60 2 true')

   }    
});