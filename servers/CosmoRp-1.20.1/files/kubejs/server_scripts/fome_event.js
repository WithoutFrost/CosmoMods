ItemEvents.rightClicked(event => {
let { player, level } = event;
    const mainHandItem = player.mainHandItem
    if (mainHandItem.id === 'cosmosstuff:laminae_fames'){
    player.addItemCooldown(mainHandItem, 500)

    player.server.runCommand('execute at ' + player.uuid + ' run playsound sons_of_sins:wistiver_sceamer ambient @a ~ ~ ~')
    player.server.runCommand('execute at ' + player.uuid + ' run particle sons_of_sins:blood_particle ~ ~ ~ 1.25 1.25 1.25 0.425 500')
    player.server.runCommand('execute at ' + player.uuid + ' run particle sons_of_sins:blood_particle ~ ~ ~ 1.25 1.25 1.25 0.225 500')
    player.server.runCommand('execute at ' + player.uuid + ' run sanity set @a[distance=..10,tag=!fome] 25')
    player.server.runCommand('execute at ' + player.uuid + ' run effect give @s minecraft:invisibility 800 1 true')
    player.server.runCommand('execute at ' + player.uuid + ' run effect give @s minecraft:resistance 800 3 true')
    player.server.runCommand('execute at ' + player.uuid + ' run effect give @s alexsmobs:soulsteal 800 3 true')  
    player.server.runCommand('execute at ' + player.uuid + ' run effect give @e[distance=..7,tag=!fome] biomancy:bleed 90 3 true')
    player.server.runCommand('execute at ' + player.uuid + ' run summon sons_of_sins:guzzler ~ ~ ~')
    player.server.runCommand('execute at ' + player.uuid + ' run summon macabre:limbsplitter ~ ~ ~')
    player.server.runCommand('execute at ' + player.uuid + ' run summon macabre:limbsplitter ~ ~ ~')
    player.server.runCommand('execute at ' + player.uuid + ' run effect give @e[distance=..7,type=!minecraft:player] minecraft:resistance 600 2 true')

   }
});

