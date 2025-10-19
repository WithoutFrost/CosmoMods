// kubejs/server_scripts/macabre_armor.js

ItemEvents.modification(event => {
  // ------------------------
  // Plasma Armor
  // ------------------------
  event.modify('macabre:plasma_armor_helmet', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:plasma_armor_chestplate', item => {
    item.armorProtection = 8
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:plasma_armor_leggings', item => {
    item.armorProtection = 6
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:plasma_armor_boots', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  // ------------------------
  // Blood Clot Armor
  // ------------------------
  event.modify('macabre:blood_clot_armor_helmet', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:blood_clot_armor_chestplate', item => {
    item.armorProtection = 8
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:blood_clot_armor_leggings', item => {
    item.armorProtection = 6
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('macabre:blood_clot_armor_boots', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })
   // ------------------------
  // cosmos
  // ------------------------
  event.modify('cosmosstuff:bellumarmis_helmet', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('cosmosstuff:bellumarmis_chestplate', item => {
    item.armorProtection = 8
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('cosmosstuff:bellumarmis_leggings', item => {
    item.armorProtection = 6
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })

  event.modify('cosmosstuff:bellumarmis_boots', item => {
    item.armorProtection = 3
    item.armorToughness = 3
    item.armorKnockbackResistance = 1
  })
})

StartupEvents.registry("item", event => {
    event.create("cosmosstuff:bellumarmis_chestplate", "anim_chestplate")
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/armor/bellumarmis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/armor/bellumarmis.png')
        })
        .parentModel("cosmosstuff:item/bellumarmis_chestplate")
        .boneVisibility((renderer, slot) => {
                renderer.setBoneVisible(renderer.getRightLegBone(), false);
                renderer.setBoneVisible(renderer.getLeftLegBone(), false);
                renderer.setBoneVisible(renderer.getRightBootBone(), false);
                renderer.setBoneVisible(renderer.getLeftBootBone(), false);
                renderer.setBoneVisible(renderer.getLeftBootBone(), false);
                renderer.setBoneVisible(renderer.getHeadBone(), false);
            if (slot == "chest") {
                renderer.setBoneVisible(renderer.getBodyBone(), true);
                renderer.setBoneVisible(renderer.getRightArmBone(), true);
                renderer.setBoneVisible(renderer.getLeftArmBone(), true);
            }
        })
    event.create("cosmosstuff:bellumarmis_boots", "anim_boots")
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/armor/bellumarmis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/armor/bellumarmis.png')
        })
        .parentModel("cosmosstuff:item/bellumarmis_boots")
        .boneVisibility((renderer, slot) => {
                renderer.setBoneVisible(renderer.getBodyBone(), false);
                renderer.setBoneVisible(renderer.getRightArmBone(), false);
                renderer.setBoneVisible(renderer.getLeftArmBone(), false);
                renderer.setBoneVisible(renderer.getRightLegBone(), false);
                renderer.setBoneVisible(renderer.getLeftLegBone(), false);
                renderer.setBoneVisible(renderer.getHeadBone(), false);

            if (slot == "feet") {
                renderer.setBoneVisible(renderer.getRightBootBone(), true);
                renderer.setBoneVisible(renderer.getLeftBootBone(), true);
            }
        })
        event.create("cosmosstuff:bellumarmis_leggings", "anim_leggings")
        .parentModel("cosmosstuff:item/bellumarmis_leggings")
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/armor/bellumarmis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/armor/bellumarmis.png')
        })
        .boneVisibility((renderer, slot) => {
                renderer.setBoneVisible(renderer.getBodyBone(), false);
                renderer.setBoneVisible(renderer.getRightArmBone(), false);
                renderer.setBoneVisible(renderer.getLeftArmBone(), false);
                renderer.setBoneVisible(renderer.getRightBootBone(), false);
                renderer.setBoneVisible(renderer.getLeftBootBone(), false);
                renderer.setBoneVisible(renderer.getHeadBone(), false);
            if (slot == "legs") {
                renderer.setBoneVisible(renderer.getRightLegBone(), true);
                renderer.setBoneVisible(renderer.getLeftLegBone(), true);
            }
        })
        event.create("cosmosstuff:bellumarmis_helmet", "anim_helmet")
        .geoModel(geo => {
            geo.setSimpleModel('cosmosstuff:geo/os/armor/bellumarmis.geo.json')
            geo.setSimpleTexture('cosmosstuff:textures/os/armor/bellumarmis.png')
        })
        .parentModel("cosmosstuff:item/bellumarmis_helmet")
        .boneVisibility((renderer, slot) => {
                renderer.setBoneVisible(renderer.getBodyBone(), false);
                renderer.setBoneVisible(renderer.getRightArmBone(), false);
                renderer.setBoneVisible(renderer.getLeftArmBone(), false);
                renderer.setBoneVisible(renderer.getRightLegBone(), false);
                renderer.setBoneVisible(renderer.getLeftLegBone(), false);
                renderer.setBoneVisible(renderer.getRightBootBone(), false);
                renderer.setBoneVisible(renderer.getLeftBootBone(), false);
            if (slot == "head") {
                renderer.setBoneVisible(renderer.getHeadBone(), true);
            }
        })
})