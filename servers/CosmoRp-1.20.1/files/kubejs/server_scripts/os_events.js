// kubejs/server_scripts/os_events.js
ItemEvents.rightClicked(event => {
    const { item, player, hand } = event
    const isCrouching = player.isCrouching()
    const mainHandItem = player.mainHandItem
    const offHandItem = player.offHandItem

    // Lógica para DESEMBAINHAR a katana
    if (isCrouching && offHandItem.id === 'cosmosstuff:kaminoomamori_seal') {
        const sanityCost = 15
        const currentSanity = player.getSanity()

        if (currentSanity >= sanityCost) {
            // Consome sanidade
            player.addSanity(-25)
            // --- SISTEMA DE NBT ---
            // Copia o NBT da katana selada para a katana desembainhada
            let nbt = offHandItem.nbt ? offHandItem.nbt.copy() : {}
            player.setHeldItem('main_hand', Item.of('cosmosstuff:kaminoomamori', nbt))

            // A guarda normalmente não precisa de NBT, mas é importante
            // preservar o item, então o código a seguir garante que o NBT
            // da guarda, se houver, seja mantido.
            let guardNbt = mainHandItem.nbt ? mainHandItem.nbt.copy() : {}
            player.setHeldItem('off_hand', Item.of('cosmosstuff:s_kaminoomamori', guardNbt))
            // --- FIM DO SISTEMA DE NBT ---

            event.cancel()
            player.tell(Text.green('Você desembainhou sua katana!'))
        } else {
            player.tell(Text.red('Sanidade insuficiente para desembainhar a katana.'))
        }
    }

    // Lógica para EMBAINHAR a katana
    if (isCrouching && mainHandItem.id === 'cosmosstuff:kaminoomamori' && offHandItem.id === 'cosmosstuff:s_kaminoomamori') {
        // --- SISTEMA DE NBT ---
        // Copia o NBT da katana desembainhada para a nova katana selada
        let nbt = mainHandItem.nbt ? mainHandItem.nbt.copy() : {}
        player.setHeldItem('off_hand', Item.of('minecraft:air'))

        // Limpa a mão principal (remove a lâmina)
        player.setHeldItem('main_hand', Item.of('cosmosstuff:kaminoomamori_seal', nbt))
        // --- FIM DO SISTEMA DE NBT ---

        event.cancel()
        player.tell(Text.yellow('Você embainhou sua katana.'))
    }
})

EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:kaminoomamori') return
    entity.potionEffects.add("minecraft:weakness", 1000, 0, false, true)
})

//------------------------------------------//
// --- EFEITOS DE SANIDADE E FORÇA A CADA TICK ---
PlayerEvents.tick(event => {
    const { player } = event
    const server = player.getServer()

    // Variáveis declaradas no início do escopo para evitar redeclaração
    const mainHandItem = player.mainHandItem
    const hasLaminaeFames = player.inventory.allItems.some(item =>
        !item.isEmpty() && item.id === 'cosmosstuff:laminae_fames'
    )
    const sanity = player.getSanity()

    // APLICA FORÇA I ENQUANTO O JOGADOR SEGURA A ESPADA
    if (!mainHandItem.isEmpty() && mainHandItem.id === 'cosmosstuff:fames') {
        player.potionEffects.add('minecraft:strength', 40, 0, false, false)
    }

    // LÓGICA DE DRENAR SANIDADE (1 por segundo)
    if (server.getTickCount() % 20 === 0 && hasLaminaeFames) {
        player.addSanity(-1)
    }

    // LÓGICA DE APLICAR EFEITOS COM BASE NA SANIDADE
    if (sanity <= 25) {
        player.potionEffects.add('minecraft:nausea', 100, 0, false, false)
        player.potionEffects.add('minecraft:blindness', 60, 0, false, false)
    }

    if (sanity <= 10) {
        player.potionEffects.add('minecraft:slowness', 100, 0, false, false)
        player.potionEffects.add('minecraft:weakness', 100, 0, false, false)
    }
})

// --- EVENTO DE COMBATE: APLICA FOME AO ATACAR COM "LAMINAE_FAMES" ---
// kubejs/server_scripts/stick_potion_effect.js

// kubejs/server_scripts/stick_potion_effect.js

EntityEvents.hurt(event => {
    const { entity, source } = event
    let attackingEntity = source.actual
    if (!attackingEntity) return
    if (attackingEntity.mainHandItem.id != 'cosmosstuff:laminae_fames') return
    entity.potionEffects.add("minecraft:hunger", 1000, 2, false, true)
})

// --- EVENTO DE INTERAÇÃO: TROCAR ITEM COM SHIFT + CLIQUE DIREITO ---
ItemEvents.rightClicked(event => {
    const { item, player, hand } = event
    const isCrouching = player.isCrouching()

    // TRANSFORMA "fames" EM "laminae_fames"
    if (!item.isEmpty() && item.id === 'cosmosstuff:fames' && isCrouching) {
        let nbt = item.nbt ? item.nbt.copy() : {}
        let newItem = Item.of('cosmosstuff:laminae_fames', nbt)

        player.setItemInHand(hand, newItem)
        event.cancel()
    }

    // TRANSFORMA "laminae_fames" DE VOLTA EM "fames"
    if (!item.isEmpty() && item.id === 'cosmosstuff:laminae_fames' && isCrouching) {
        let nbt = item.nbt ? item.nbt.copy() : {}
        let newItem = Item.of('cosmosstuff:fames', nbt)

        player.setItemInHand(hand, newItem)
        event.cancel()
    }
})