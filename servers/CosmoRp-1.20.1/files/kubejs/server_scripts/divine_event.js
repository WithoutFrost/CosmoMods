let Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');

ItemEvents.rightClicked(event => {
    let { player, item, item: { id } } = event;
    if (id != 'cosmosstuff:divinamessorem') return
    player.addItemCooldown(item, 200)
    player.runCommandSilent('/particle minecraft:explosion ~ ~ ~ 1 1 1 1 100')
    player.runCommandSilent('/particle minecraft:explosion ~ ~ ~ 1 1 1 1 100')
    player.runCommandSilent('/particle minecraft:explosion ~ ~ ~ 1 1 1 1 100')
    player.runCommandSilent('/particle minecraft:explosion ~ ~ ~ 1 1 1 1 100')
    player.runCommandSilent('/particle minecraft:explosion ~ ~ ~ 1 1 1 1 100')
    // Calculate the motion based on the look angle
    let speed = 2.0; // Adjust speed as needed
    let motionX = player.lookAngle.x() * speed;  // Use positive x for forward
    let motionY = player.lookAngle.y() * speed;  // Use positive y for upward
    let motionZ = player.lookAngle.z() * speed;  // Use positive z for forward

    let motionVec3 = new Vec3(motionX, motionY, motionZ);
    player.setDeltaMovement(motionVec3);
});
PlayerEvents.tick(event => {
    const { player } = event

    // Variável da mão principal
    const mainHandItem = player.mainHandItem

    // APLICA FORÇA SE O JOGADOR ESTIVER SEGURANDO A ESPADA
    if (!mainHandItem.isEmpty() && mainHandItem.id === 'cosmosstuff:divinamessorem') {
        player.potionEffects.add('minecraft:strength', 40, 0, false, false)

        // Slow Falling enquanto estiver no ar
        const blockBelow = player.level.getBlock(player.x, player.y - 3, player.z)
        if (blockBelow.id === 'minecraft:air') {
            player.potionEffects.add('minecraft:slow_falling', 3, 0, false, false)
        }
    }
    
});