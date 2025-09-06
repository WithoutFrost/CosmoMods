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
        .speedBaseline(0.5)
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
    event.create('cosmosstuff:kaminoomamori', 'anim_sword')
        .displayName("kami no Omamori - Seal awakened -")
        .unstackable()
        .tier('iron')
        .attackDamageBaseline(14.0)
        .speedBaseline(-0.25)
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/lamina_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/lamina_quasaris_tenuis.png')
        })
    event.create('cosmosstuff:s_kaminoomamori', 'anim_shield')
        .displayName("kami no Omamori - guard Form -")
        .unstackable()
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/custodialis_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/quasaris_tenuis.png')
        })

    event.create('cosmosstuff:kaminoomamori_seal', 'anim_shield')
        .displayName("kami no Omamori - Seal Form -")
        .unstackable()
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/sigillata_quasaris_tenuis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/quasaris_tenuis.png')
        })
})
    event.create('cosmosstuff:divinamessorem', 'anim_sword')
        .displayName("Divina Messorem")
        .unstackable()
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/weapons/divinamessorem.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/weapons/divinamessorem.png')
        })
})


