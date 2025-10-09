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
})
