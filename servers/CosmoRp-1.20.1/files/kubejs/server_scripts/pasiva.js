// KubeJS client_scripts ou server_scripts (dependendo da versão)
// Para KubeJS 6.x: server_scripts

ServerEvents.tick(event => {
    let server = event.server
    let players = server.players
    
    if (players && players.length > 0) {
        players.forEach(player => {
            // Verificar se está com o fullset equipado
            if (hasFullSetEquipped(player)) {
                // Efeito base por tick (a cada tick)
                player.potionEffects.add('minecraft:strength', 21, 0, true, false) // Força 1
                player.potionEffects.add('minecraft:resistance', 21, 0, true, false) // Resistência 1
                
                // Verificar se a vida está em 25% ou menos
                let maxHealth = player.maxHealth
                let currentHealth = player.health
                let healthPercentage = (currentHealth / maxHealth) * 100
                
                if (healthPercentage <= 25) {
                    // Efeitos adicionais quando com 25% ou menos de vida
                    player.potionEffects.add('minecraft:strength', 21, 1, true, false) // Força 2 (mais forte)
                    player.potionEffects.add('minecraft:resistance', 21, 1, true, false) // Resistência 2 (mais forte)
                    player.potionEffects.add('minecraft:regeneration', 21, 1, true, false) // Regeneração 2
                    player.potionEffects.add('minecraft:speed', 21, 1, true, false) // Velocidade 2
                }
            }
        })
    }
})

// Função para verificar se o player está com o fullset equipado
function hasFullSetEquipped(player) {
    let helmet = 'cosmosstuff:bellumarmis_helmet'
    let chestplate = 'cosmosstuff:bellumarmis_chestplate'
    let leggings = 'cosmosstuff:bellumarmis_leggings'
    let boots = 'cosmosstuff:bellumarmis_boots'
    
    let helmetEquipped = player.getHeadArmorItem().id === helmet
    let chestplateEquipped = player.getChestArmorItem().id === chestplate
    let leggingsEquipped = player.getLegsArmorItem().id === leggings
    let bootsEquipped = player.getFeetArmorItem().id === boots
    
    return helmetEquipped && chestplateEquipped && leggingsEquipped && bootsEquipped
}
