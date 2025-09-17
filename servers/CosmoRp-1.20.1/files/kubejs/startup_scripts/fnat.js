const blocks = [
    'biluwithered',
    'gochiwithered',
    'lumenlegs',
    'lumenwithered',
    'melissa2withered',
    'melissawithered',
    'sayruswithered',
    'stellarwithered',
    'sunnywithered'
];

StartupEvents.registry('block', event => {
    blocks.forEach(name => {
        event.create(`cosmosstuff:${name}`, 'animatable')
            .material('wood')
            .hardness(2.0)
            .resistance(1.0)
            .tagBlock("auditory:wood_sounds")
            .tagBlock('minecraft:mineable/axe')
            .requiresTool(false)
            .displayName(name.replace(/withered/g, ' Withered'))
            .property(BlockProperties.AXIS)//
            .placementState(event => event.set(BlockProperties.AXIS, event.clickedFace.axis))
            .defaultGeoModel()
            .animatableItem(item => item.defaultGeoModel())
            // Valores de .box aproximados para logs, pode ajustar depois
            .box(2, 0, 2, 14, 16, 14, true)
            .blockstateJson = {
                "variants": {
                    "axis=x": {
                        "model": `cosmosstuff:block/${name}`,
                        "x": 90,
                        "y": 90
                    },
                    "axis=y": {
                        "model": `cosmosstuff:block/${name}`
                    },
                    "axis=z": {
                        "model": `cosmosstuff:block/${name}`,
                        "x": 90
                    }
                }
            };
    });
});
