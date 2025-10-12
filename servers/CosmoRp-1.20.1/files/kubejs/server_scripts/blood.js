// RIVERS OF BLOOD - SCRIPT COMPLETO
// EFEITOS PASSIVOS + ULTIMATE

// 🔥 EFEITOS PASSIVOS (sempre que acerta)
EntityEvents.hurt(event => {
    const { entity, source, level } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:riversofblood') return
    
    // EFEITOS SEMPRE ATIVOS
    entity.potionEffects.add("minecraft:poison", 1000, 2, false, true) // Veneno 50 segundos
    entity.potionEffects.add('minecraft:slowness', 400, 0, false, true) // Lentidão 20 segundos
    level.server.runCommandSilent(`particle minecraft:dust 0.8 0.1 0.1 1 ${entity.x} ${entity.y + 1} ${entity.z} 0.5 0.5 0.5 0 10`)

    // 25% CHANCE - WITHER
    if (Math.random() < 0.25) {
        entity.potionEffects.add('minecraft:wither', 400, 0, false, true)
        level.server.runCommandSilent(`particle minecraft:squid_ink ${entity.x} ${entity.y + 1} ${entity.z} 0.5 0.5 0.5 0 20`)
    }
    
    // 20% CHANCE - ROUBO DE VIDA
    if (Math.random() < 0.20) {
        if (attackingEntity.health < attackingEntity.maxHealth) {
            attackingEntity.health += 2
            if (attackingEntity.health > attackingEntity.maxHealth) {
                attackingEntity.health = attackingEntity.maxHealth
            }
        }
        level.server.runCommandSilent(`particle minecraft:heart ${entity.x} ${entity.y + 1.5} ${entity.z} 0.3 0.3 0.3 0 8`)
    }
})

// ⚡ ULTIMATE - RIO DE SANGUE EXPLOSIVO
ItemEvents.rightClicked(event => {
    let { player, item, level, server } = event
    if (item.id != 'cosmosstuff:riversofblood') return
    
    // Cooldown de 12 segundos
    player.addItemCooldown(item, 240)
    
    // 🎵 SONS DE ATIVAÇÃO
    level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.ender_dragon.growl master ${player.uuid} ~ ~ ~ 1.0 0.8`)
    server.scheduleInTicks(5, () => {
        level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.wither.spawn master ${player.uuid} ~ ~ ~ 1.0 1.0`)
    })
    server.scheduleInTicks(10, () => {
        level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.evoker.prepare_summon master ${player.uuid} ~ ~ ~ 1.0 0.9`)
    })

    // ✨ EFEITOS VISUAIS - 8 SEGUNDOS (160 ticks)
    let ultDuration = 160

    // Explosões iniciais
    for (let i = 0; i < 5; i++) {
        level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:explosion ~ ~ ~ 2 2 2 0 50`)
        level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.9 0.1 0.1 1 ~ ~1 ~ 1.5 1.5 1.5 0 30`)
    }
    
    // Aura vermelha pulsante (dura toda a ULT)
    for (let i = 0; i < ultDuration; i += 2) {
        server.scheduleInTicks(i, () => {
            let size = 2 + Math.sin(i * 0.3) * 0.5
            level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.9 0.1 0.1 1 ~ ~1 ~ ${size} ${size} ${size} 0 20`)
        })
    }

    // Anel de partículas sanguíneas contínuo
    for (let i = 0; i < ultDuration; i += 3) {
        server.scheduleInTicks(i, () => {
            for (let j = 0; j < 12; j++) {
                let angle = (j * 30 + (i * 5)) * Math.PI / 180
                let x = Math.cos(angle) * 2
                let z = Math.sin(angle) * 2
                level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.7 0.1 0.1 1 ~${x} ~1 ~${z} 0.2 0.2 0.2 0 3`)
            }
        })
    }

    // ⚡ EFEITOS MECÂNICOS

    // 1. EXPLOSÃO INICIAL DE DANO
    let nearbyEntities = level.getEntitiesWithin(AABB.of(player.x - 6, player.y - 2, player.z - 6, player.x + 6, player.y + 3, player.z + 6))
    nearbyEntities.forEach(entity => {
        if (entity.isLiving() && entity != player) {
            entity.attack(5) // 2.5 corações
            entity.potionEffects.add('minecraft:slowness', 120, 2, false, true)
            entity.potionEffects.add('minecraft:glowing', 120, 0, false, true)
            level.server.runCommandSilent(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 1} ${entity.z} 1 1 1 0 25`)
        }
    })

    // SOM DA EXPLOSÃO INICIAL
    level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.generic.explode master ${player.uuid} ~ ~ ~ 0.8 1.2`)

    // 2. RIO DE SANGUE (8 segundos de duração)
    for (let tick = 0; tick < ultDuration; tick += 5) {
        server.scheduleInTicks(tick, () => {
            let yaw = player.yaw * Math.PI / 180
            let distance = 3 + (tick * 0.1)

            for (let i = 0; i < 3; i++) {
                let x = -Math.sin(yaw) * (distance - i)
                let z = Math.cos(yaw) * (distance - i)
                let width = 2.5 - (i * 0.7)
                
                // Partículas do rio de sangue
                level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.7 0.1 0.1 0.9 ~${x} ~ ~${z} ${width} 0.1 ${width} 0 20`)
                level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dripping_lava ~${x} ~0.2 ~${z} 0.8 0.1 0.8 0 12`)
                level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.8 0.1 0.1 0.7 ~${x} ~0.5 ~${z} ${width * 0.8} 0.5 ${width * 0.8} 0 8`)

                // DANO CONTÍNUO no rio
                let riverAABB = AABB.of(player.x + x - width, player.y, player.z + z - width, 
                                      player.x + x + width, player.y + 2, player.z + z + width)
                
                let entitiesInRiver = level.getEntitiesWithin(riverAABB)
                entitiesInRiver.forEach(entity => {
                    if (entity.isLiving() && entity != player) {
                        // Dano a cada segundo no rio
                        if (tick % 20 == 0) {
                            entity.attack(3) // 1.5 corações por segundo
                            
                            // CURA O JOGADOR
                            if (player.health < player.maxHealth) {
                                player.health = Math.min(player.health + 2, player.maxHealth)
                            }
                        }
                        
                        // Efeitos nos inimigos
                        entity.potionEffects.add('minecraft:slowness', 40, 1, false, false)
                        level.server.runCommandSilent(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 0.5} ${entity.z} 0.3 0.5 0.3 0 5`)
                    }
                })
            }
            
            // 3. EXPLOSÕES EM CADEIA (a cada 2 segundos)
            if (tick % 40 == 0 && tick > 0) {
                let glowingEntities = level.getEntitiesWithin(AABB.of(player.x - 10, player.y - 3, player.z - 10, player.x + 10, player.y + 3, player.z + 10))
                
                // SOM DA EXPLOSÃO
                if (glowingEntities.length > 1) {
                    level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.tnt.primed master ${player.uuid} ~ ~ ~ 0.6 1.4`)
                }
                
                glowingEntities.forEach(entity => {
                    if (entity.isLiving() && entity != player && entity.hasEffect('minecraft:glowing')) {
                        // SOM DA EXPLOSÃO individual
                        level.server.runCommandSilent(`playsound entity.generic.explode master @a ${entity.x} ${entity.y} ${entity.z} 0.5 1.1`)
                        
                        // Partículas de explosão
                        level.server.runCommandSilent(`particle minecraft:explosion ${entity.x} ${entity.y + 1} ${entity.z} 0.7 0.7 0.7 0 15`)
                        level.server.runCommandSilent(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 1} ${entity.z} 1 1 1 0 20`)
                        
                        // DANO EM ÁREA
                        let explosionAABB = AABB.of(entity.x - 2.5, entity.y - 1.5, entity.z - 2.5, 
                                                   entity.x + 2.5, entity.y + 1.5, entity.z + 2.5)
                        let nearby = level.getEntitiesWithin(explosionAABB)
                        nearby.forEach(target => {
                            if (target.isLiving() && target != player && target != entity) {
                                target.attack(4) // 2 corações
                                level.server.runCommandSilent(`particle minecraft:dust 0.8 0.2 0.1 1 ${target.x} ${target.y + 0.5} ${target.z} 0.5 0.5 0.5 0 8`)
                            }
                        })
                    }
                })
            }
        })
    }

    // PARTÍCULAS FINAIS (últimos 2 segundos)
    for (let i = ultDuration - 40; i < ultDuration; i += 5) {
        server.scheduleInTicks(i, () => {
            level.server.runCommandSilent(`execute as ${player.uuid} at @s run particle minecraft:dust 0.6 0.1 0.1 0.5 ~ ~1 ~ 3 2 3 0 30`)
        })
    }

    // SOM FINAL
    server.scheduleInTicks(ultDuration - 10, () => {
        level.server.runCommandSilent(`execute as ${player.uuid} run playsound entity.ender_dragon.death master ${player.uuid} ~ ~ ~ 0.7 0.9`)
    })

    // BUFFS DO JOGADOR
    player.potionEffects.add('minecraft:resistance', 100, 1, false, true)
    player.potionEffects.add('minecraft:speed', ultDuration, 0, false, true)
})

// 🩸 EFEITOS ESPECIAIS DURANTE A ULT (ao atacar)
EntityEvents.hurt(event => {
    const { entity, source, level } = event
    let attackingEntity = source.actual
    if (!attackingEntity || !attackingEntity.isPlayer()) return
    
    let player = attackingEntity
    let item = player.mainHandItem
    
    if (item.id != 'cosmosstuff:riversofblood') return
    
    // Efeitos especiais se a ULT estiver ativa
    if (player.cooldowns.isOnCooldown(item)) {
        // Partículas intensificadas
        level.server.runCommandSilent(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 1.5} ${entity.z} 0.8 0.8 0.8 0 15`)
        level.server.runCommandSilent(`particle minecraft:dripping_lava ${entity.x} ${entity.y + 2} ${entity.z} 0.6 0.6 0.6 0 12`)
        level.server.runCommandSilent(`particle minecraft:damage_indicator ${entity.x} ${entity.y + 1.8} ${entity.z} 0.4 0.4 0.4 0 8`)
        
        // Marcar inimigo para explosões em cadeia
        entity.potionEffects.add('minecraft:glowing', 100, 0, false, true)
        
        // DANO EXTRA durante a ULT
        entity.attack(3) // 1.5 corações extra
        
        // SOM DE ATAQUE ESPECIAL
        level.server.runCommandSilent(`playsound entity.player.attack.crit master @a ${entity.x} ${entity.y} ${entity.z} 0.8 1.2`)
    }
})