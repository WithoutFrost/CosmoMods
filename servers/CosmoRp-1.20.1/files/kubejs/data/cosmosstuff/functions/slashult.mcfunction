#blood_sakura_ultimate
# Ativação da ultimate - SEM matar mobs, apenas efeitos
execute as @a[tag=sa,scores={sa=1}] at @s run playsound block.beacon.activate voice @a ~ ~ ~ 2 2
execute as @a[tag=sa,scores={sa=1}] at @s run playsound block.beacon.activate voice @a ~ ~ ~ 2 2
execute as @a[tag=sa,scores={sa=1}] at @s run playsound block.beacon.activate voice @a ~ ~ ~ 2 2
execute as @a[tag=sa,scores={sa=1}] at @s run playsound block.beacon.activate voice @a ~ ~ ~ 2 2

execute as @a[tag=sa,scores={sa=20..40}] at @s if entity @e[type=!item,type=!armor_stand,type=!experience_orb,tag=!sa1,tag=!sa,limit=1,sort=nearest,distance=..20,type=!wolf,type=!cat] run playsound entity.arrow.hit_player voice @a ~ ~ ~ 10 2

# Marca alvo para a ultimate
execute as @a[tag=sa,scores={sa=20..}] at @s run tag @e[type=!item,type=!armor_stand,type=!experience_orb,tag=!sa1,tag=!sa,limit=1,sort=nearest,distance=..20,type=!wolf,type=!cat] add sa1

effect give @e[tag=sa1] glowing 1 1 true
scoreboard players add @a[tag=sa] sa 1
scoreboard players add @e[tag=sa1] sa 1

execute as @a[tag=sa1,scores={sa=1}] at @p run playsound entity.arrow.hit_player voice @a ~ ~ ~ 10 2
execute as @a[tag=sa,scores={sa=1}] at @s run effect give @s blindness 10 10 true
execute as @a[tag=sa,scores={sa=1}] at @s run effect give @s slowness 10 10 true
execute as @a[tag=sa,scores={sa=40}] at @s run effect clear @s blindness
execute as @a[tag=sa,scores={sa=40}] at @s run effect clear @s slowness
execute as @a[tag=sa,scores={sa=40}] at @s run effect give @s resistance 2 10 true

# Teleporte e ataque (SEM matar)
execute as @a[tag=sa,scores={sa=45..75}] at @e[tag=!sa2,tag=sa1,limit=1,sort=nearest] run tp @s ^ ^0.3 ^5 facing entity @e[tag=sa1,limit=1,sort=nearest] feet
execute as @a[tag=sa,scores={sa=45..75}] at @e[tag=!sa2,tag=sa1,limit=1,sort=nearest] run playsound entity.drowned.shoot voice @a ~ ~ ~ 2 1
execute as @a[tag=sa,scores={sa=45..75}] at @e[tag=!sa2,tag=sa1,limit=1,sort=nearest] run particle sweep_attack ^ ^1 ^2 0.2 0.2 0.2 0.5 3 normal
execute as @a[tag=sa,scores={sa=45..75}] at @e[tag=!sa2,tag=sa1,limit=1,sort=nearest] run tag @e[tag=sa1,limit=1,sort=nearest] add sa2
execute as @a[tag=sa,scores={sa=45..75}] at @e[tag=!sa2,tag=sa1,limit=1,sort=nearest] run tag @e[tag=sa1,limit=1,sort=nearest] remove sa1

execute as @e[tag=sa2] at @s run effect give @s slowness 10 10 true
execute as @e[tag=sa2] at @s run effect give @s weakness 10 10 true

# Efeito final da ultimate (SEM matar)
execute as @a[tag=sa,scores={sa=75}] at @s run playsound entity.drowned.shoot voice @a ~ ~ ~ 2 2
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run particle minecraft:item redstone ^ ^1 ^ 0.5 1 0.5 0.05 100 normal @a

# Cura/Dano seletivo (SEM matar, apenas efeitos)
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=phantom,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=#skeletons,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=zombie,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=zombie_villager,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=zombified_piglin,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=drowned,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=husk,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=zoglin,distance=..1] instant_health 1 2 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[tag=sa2,type=wither,distance=..1] instant_health 1 4 true
execute if entity @a[tag=sa,scores={sa=80..}] at @e[tag=sa2] run effect give @e[type=!wither,tag=sa2,type=!phantom,type=!#skeletons,type=!zombie,type=!zombie_villager,type=!zombified_piglin,type=!drowned,type=!husk,type=!zoglin,distance=..1,tag=!darkk] instant_damage 1 2 true

# Finalização (SEM matar)
execute as @a[tag=sa,scores={sa=85..}] at @s run tag @e remove sa1
execute as @a[tag=sa,scores={sa=85..}] at @s run tag @e remove sa2
execute as @a[tag=sa,scores={sa=85..}] at @s run tag @s remove sa
execute as @a[scores={sa=85..}] at @s run scoreboard players reset @s sa

# Verifica se o jogador está segurando o Rivers of Blood
execute as @a[tag=sa,nbt=!{SelectedItem:{id:"cosmosstuff:riversofblood",tag:{Custom:19}}}] at @s run tag @s remove sa