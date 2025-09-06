// kubejs/server_scripts/macabre_hurt.js

const MOD_ID = "macabre"
const WEAPON_ID = "cosmosstuff:divinamessorem"

EntityEvents.hurt(event => {
    const { entity, source } = event
    const attacker = source?.actual

    if (!attacker) return
    if (!attacker.mainHandItem) return
    if (attacker.mainHandItem.id !== WEAPON_ID) return

    // Checa se a entidade atacada é do mod Macabre
    const entityName = entity.getType()
    if (entityName.split(':')[0] !== MOD_ID) return

    // Aplica o efeito de heath (1000 ticks = 50s, amplifier 2)
    entity.potionEffects.add("minecraft:instant_health", 1, 2, false, true)
})
