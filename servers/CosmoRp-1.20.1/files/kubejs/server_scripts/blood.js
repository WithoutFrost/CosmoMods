// RIVERS OF BLOOD - SCRIPT COMPLETO CORRIGIDO
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
    attackingEntity.server.runCommand(`particle minecraft:dust 0.8 0.1 0.1 1 ${entity.x} ${entity.y + 1} ${entity.z} 0.5 0.5 0.5 0 10`)

    // 25% CHANCE - WITHER
    if (Math.random() < 0.25) {
        entity.potionEffects.add('minecraft:wither', 400, 0, false, true)
        attackingEntity.server.runCommand(`particle minecraft:squid_ink ${entity.x} ${entity.y + 1} ${entity.z} 0.5 0.5 0.5 0 20`)
    }
    
    // 20% CHANCE - ROUBO DE VIDA
    if (Math.random() < 0.20) {
        if (attackingEntity.health < attackingEntity.maxHealth) {
            attackingEntity.health += 8
            if (attackingEntity.health > attackingEntity.maxHealth) {
                attackingEntity.health = attackingEntity.maxHealth
            }
        }
        attackingEntity.server.runCommand(`particle minecraft:heart ${entity.x} ${entity.y + 1.5} ${entity.z} 0.3 0.3 0.3 0 8`)
    }
})

// ⚡ ULTIMATE - RIO DE SANGUE EXPLOSIVO (SISTEMA DE CONTÁGIO)
ItemEvents.rightClicked(event => {
    let { player, item, level, server } = event
    if (item.id != 'cosmosstuff:riversofblood') return
    
    // Cooldown de 12 segundos
    player.addItemCooldown(item, 240)
    
    // 🎵 SONS DE ATIVAÇÃO
    player.server.runCommand(`execute as ${player.uuid} run playsound entity.ender_dragon.growl master ${player.uuid} ~ ~ ~ 1.0 0.8`)
    server.scheduleInTicks(5, () => {
        player.server.runCommand(`execute as ${player.uuid} run playsound entity.wither.spawn master ${player.uuid} ~ ~ ~ 1.0 1.0`)
    })
    server.scheduleInTicks(10, () => {
        player.server.runCommand(`execute as ${player.uuid} run playsound entity.evoker.prepare_summon master ${player.uuid} ~ ~ ~ 1.0 0.9`)
    })

    // ✨ EFEITOS VISUAIS - 8 SEGUNDOS (160 ticks)
    let ultDuration = 160

    // Explosões iniciais
    for (let i = 0; i < 5; i++) {
        player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:explosion ~ ~ ~ 2 2 2 0 50`)
        player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.9 0.1 0.1 1 ~ ~1 ~ 1.5 1.5 1.5 0 30`)
    }
    
    // Aura vermelha pulsante (dura toda a ULT)
    for (let i = 0; i < ultDuration; i += 2) {
        server.scheduleInTicks(i, () => {
            let size = 2 + Math.sin(i * 0.3) * 0.5
            player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.9 0.1 0.1 1 ~ ~1 ~ ${size} ${size} ${size} 0 20`)
        })
    }

    // Anel de partículas sanguíneas contínuo
    for (let i = 0; i < ultDuration; i += 3) {
        server.scheduleInTicks(i, () => {
            for (let j = 0; j < 12; j++) {
                let angle = (j * 30 + (i * 5)) * Math.PI / 180
                let x = Math.cos(angle) * 2
                let z = Math.sin(angle) * 2
                player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.7 0.1 0.1 1 ~${x} ~1 ~${z} 0.2 0.2 0.2 0 3`)
            }
        })
    }

    // ⚡ EFEITOS MECÂNICOS

    // 1. EXPLOSÃO INICIAL DE DANO
    let nearbyEntities = level.getEntitiesWithin(AABB.of(player.x - 6, player.y - 2, player.z - 6, player.x + 6, player.y + 3, player.z + 6))
    nearbyEntities.forEach(entity => {
        if (entity.isLiving() && entity != player) {
            entity.attack(50) // 25 corações
            entity.potionEffects.add('minecraft:slowness', 120, 2, false, true)
            entity.potionEffects.add('minecraft:glowing', ultDuration, 0, false, true) // Dura a ULT toda
            player.server.runCommand(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 1} ${entity.z} 1 1 1 0 25`)
        }
    })

    // SOM DA EXPLOSÃO INICIAL
    player.server.runCommand(`execute as ${player.uuid} run playsound entity.generic.explode master ${player.uuid} ~ ~ ~ 0.8 1.2`)

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
                player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.7 0.1 0.1 0.9 ~${x} ~ ~${z} ${width} 0.1 ${width} 0 20`)
                player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dripping_lava ~${x} ~0.2 ~${z} 0.8 0.1 0.8 0 12`)
                player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.8 0.1 0.1 0.7 ~${x} ~0.5 ~${z} ${width * 0.8} 0.5 ${width * 0.8} 0 8`)

                // DANO CONTÍNUO no rio
                let riverAABB = AABB.of(player.x + x - width, player.y, player.z + z - width, 
                                      player.x + x + width, player.y + 2, player.z + z + width)
                
                let entitiesInRiver = level.getEntitiesWithin(riverAABB)
                entitiesInRiver.forEach(entity => {
                    if (entity.isLiving() && entity != player) {
                        // Dano a cada segundo no rio
                        if (tick % 20 == 0) {
                            entity.attack(50) // 25 corações por segundo
                            
                            // CURA O JOGADOR
                            if (player.health < player.maxHealth) {
                                player.health = Math.min(player.health + 15, player.maxHealth)
                            }
                        }
                        
                        // Efeitos nos inimigos
                        entity.potionEffects.add('minecraft:slowness', 40, 1, false, false)
                        player.server.runCommand(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 0.5} ${entity.z} 0.3 0.5 0.3 0 5`)
                    }
                })
            }
            
            // 3. EXPLOSÕES EM CADEIA (a cada 2 segundos) - SISTEMA DE CONTÁGIO
            if (tick % 40 == 0 && tick > 0) {
                // Buscar APENAS os inimigos que estão com glowing (a rede de contágio)
                let glowingEntities = level.getEntitiesWithin(AABB.of(player.x - 15, player.y - 4, player.z - 15, player.x + 15, player.y + 4, player.z + 15))
                
                let explosionTargets = []
                glowingEntities.forEach(entity => {
                    if (entity.isLiving() && entity != player && entity.hasEffect('minecraft:glowing')) {
                        explosionTargets.push(entity)
                    }
                })
                
                // SOM DA EXPLOSÃO se houver alvos
                if (explosionTargets.length > 0) {
                    player.server.runCommand(`execute as ${player.uuid} run playsound entity.tnt.primed master ${player.uuid} ~ ~ ~ 0.6 1.4`)
                }
                
                // Aplicar explosão em todos os alvos marcados
                explosionTargets.forEach(entity => {
                    // SOM DA EXPLOSÃO individual
                    player.server.runCommand(`playsound entity.generic.explode master @a ${entity.x} ${entity.y} ${entity.z} 0.5 1.1`)
                    
                    // 🔴 PARTÍCULAS DE EXPLOSÃO DE DUST VERMELHA
                    for (let i = 0; i < 3; i++) {
                        player.server.runCommand(`particle minecraft:dust 0.9 0.1 0.1 1.5 ${entity.x} ${entity.y + 1} ${entity.z} 1.2 1.2 1.2 0 25`)
                        player.server.runCommand(`particle minecraft:dust 0.8 0.05 0.05 1.2 ${entity.x} ${entity.y + 1.5} ${entity.z} 0.8 0.8 0.8 0 20`)
                    }
                    
                    // Onda de choque vermelha
                    for (let ring = 1; ring <= 3; ring++) {
                        let ringSize = ring * 0.8
                        player.server.runCommand(`particle minecraft:dust 0.7 0.1 0.1 0.8 ${entity.x} ${entity.y + 0.5} ${entity.z} ${ringSize} ${ringSize} ${ringSize} 0 15`)
                    }
                    
                    // DANO EM ÁREA
                    let explosionAABB = AABB.of(entity.x - 3, entity.y - 2, entity.z - 3, 
                                               entity.x + 3, entity.y + 2, entity.z + 3)
                    let nearby = level.getEntitiesWithin(explosionAABB)
                    nearby.forEach(target => {
                        if (target.isLiving() && target != player) {
                            target.attack(50) // 25 corações
                            player.server.runCommand(`particle minecraft:dust 0.8 0.2 0.1 1 ${target.x} ${target.y + 0.5} ${target.z} 0.5 0.5 0.5 0 8`)
                        }
                    })
                })
            }
        })
    }

    // PARTÍCULAS FINAIS (últimos 2 segundos)
    for (let i = ultDuration - 40; i < ultDuration; i += 5) {
        server.scheduleInTicks(i, () => {
            player.server.runCommand(`execute as ${player.uuid} at @s run particle minecraft:dust 0.6 0.1 0.1 0.5 ~ ~1 ~ 3 2 3 0 30`)
        })
    }

    // SOM FINAL
    server.scheduleInTicks(ultDuration - 10, () => {
        player.server.runCommand(`execute as ${player.uuid} run playsound entity.ender_dragon.death master ${player.uuid} ~ ~ ~ 0.7 0.9`)
    })

    // BUFFS DO JOGADOR
    player.potionEffects.add('minecraft:resistance', 100, 1, false, true)
    player.potionEffects.add('minecraft:speed', ultDuration, 0, false, true)
})

// 🩸 EFEITOS ESPECIAIS DURANTE A ULT (ao atacar) - SISTEMA DE ADIÇÃO DE NOVOS ALVOS
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
        player.server.runCommand(`particle minecraft:dust 0.9 0.1 0.1 1 ${entity.x} ${entity.y + 1.5} ${entity.z} 0.8 0.8 0.8 0 15`)
        player.server.runCommand(`particle minecraft:dripping_lava ${entity.x} ${entity.y + 2} ${entity.z} 0.6 0.6 0.6 0 12`)
        player.server.runCommand(`particle minecraft:damage_indicator ${entity.x} ${entity.y + 1.8} ${entity.z} 0.4 0.4 0.4 0 8`)
        
        // 🔴 ADICIONAR NOVO ALVO À REDE DE CONTÁGIO (se não estiver marcado)
        if (!entity.hasEffect('minecraft:glowing')) {
            entity.potionEffects.add('minecraft:glowing', 160, 0, false, true) // Dura a ULT toda
            player.server.runCommand(`particle minecraft:glow ${entity.x} ${entity.y + 1.5} ${entity.z} 0.5 0.5 0.5 0 10`)
            player.server.runCommand(`playsound item.lodestone_compass.lock master @a ${entity.x} ${entity.y} ${entity.z} 0.8 1.5`)
        }
        
        // DANO EXTRA durante a ULT
        entity.attack(50) // 25 corações extra
        
        // SOM DE ATAQUE ESPECIAL
        player.server.runCommand(`playsound entity.player.attack.crit master @a ${entity.x} ${entity.y} ${entity.z} 0.8 1.2`)
        
        // EFEITOS PASSIVOS MELHORADOS DURANTE ULT
        if (Math.random() < 0.35) { // Chance aumentada durante ULT
            if (player.health < player.maxHealth) {
                player.health += 15
                if (player.health > player.maxHealth) {
                    player.health = player.maxHealth
                }
                player.server.runCommand(`particle minecraft:heart ${player.x} ${player.y + 1.5} ${player.z} 0.4 0.4 0.4 0 12`)
            }
        }
    }
})