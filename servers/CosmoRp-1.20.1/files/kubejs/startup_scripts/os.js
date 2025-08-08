// kubejs/startup_scripts/os.js
const $ShieldItem = Java.loadClass('net.minecraft.world.item.ShieldItem')
const $TridentItem = Java.loadClass('net.minecraft.world.item.TridentItem')
const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')

StartupEvents.registry('item', event => {
    event.create('cosmosstuff:laminae_fames', 'anim_sword')
        .displayName("§5Laminae Fames")
        .unstackable()
        .tier('diamond')
        .attackDamageBaseline(10.0)
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/laminae_fames.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/laminae_fames.png')
        }),
    event.create('cosmosstuff:fames', 'anim_sword')
        .displayName("§5Fames Snake")
        .unstackable()
        .tier('diamond')
        .attackDamageBaseline(0.0)
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/fames.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/laminae_fames.png')
        })
    event.create('cosmosstuff:lamina_quasaris_tenuis', 'anim_sword')
        .displayName("§5Lamina Quasaris Tenuis")
        .unstackable()
        .tier('diamond')
        .attackDamageBaseline(0.0)
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/lamina_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/lamina_quasaris_tenuis.png')
        })
    event.create('cosmosstuff:custodialis_quasaris_tenuis', 'anim_shield')
        .displayName("§Custodialis Quasaris Tenuis")
        .unstackable()
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/custodialis_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/quasaris_tenuis.png')
        })

    event.create('cosmosstuff:sigillata_quasaris_tenuis', 'anim_shield')
        .displayName("§Sigillata Quasaris Tenuis")
        .unstackable()
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/sigillata_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/quasaris_tenuis.png')
        })
})

