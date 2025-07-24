--foxatl
local M = {}
local max = 100  -- 满蓄力进度需求
local step =2 -- 一次伪射击进度增幅
local edge =50 --宽限，松手多久时触发，单位ms
local spread_index = 0.125 --扩散参数 调节此参数可改变综合射击准度（数据内部的不准确度依然生效）

local procd = 0 --进度
local trigger = false --是否正在连按
local overCharge = false --是否过蓄

local x_spread = 0
local y_spread = 0

function M.shoot(api)
        local t1 = api:getLastShootTimestamp()
        local t2 = api:getCurrentTimestamp()
        local itv = api:getShootInterval()
        local cache = api:getCachedScriptData()
        if (cache == nil) then --如果没有就先初始化
            cache = {
                proc = 0 -- 初始值(蓄力进度)
            }
        end
        -- 别忘：时间单位是ms
        if (t2 - t1 <= itv+edge) then
            -- 没有松手（宽限为edge/ms）
            if cache.proc>max then
                cache.proc = max
                overCharge = true
                local count = 9
                repeat
                    api:shootOnce(false)
                    count = count-1
                until count <=0
                api:shootOnce(api:isShootingNeedConsumeAmmo())
                overCharge = false
                trigger = false
                cache.proc = 0
            else
                cache.proc = cache.proc+step
                trigger = true
            end
        else
            cache.proc = 0
            trigger = false
        end
        procd = cache.proc
        api:cacheScriptData(cache)
        x_spread = (math.random()-0.5)*spread_index
        y_spread = (math.random()-0.5)*spread_index
end

function M.tick_heat(api,heatTimestamp)
        local t1 = api:getLastShootTimestamp()
        local t2 = api:getCurrentTimestamp()
        local itv = api:getShootInterval()
        api:setOverheatLocked(false)
        if ((trigger)and(t2 - t1 > 2*itv+edge)and(api:getAmmoCountInMagazine()>=1)) then
            --松手且有蓄力进度,则按照蓄力进度执行复数次发射逻辑，清除蓄力进度
            trigger = false
            if procd>=0 then
                if procd>=10 then
                    api:shootOnce(api:isShootingNeedConsumeAmmo())
                    repeat
                        api:shootOnce(false)
                        procd = procd-10
                    until procd<10
                end
            end
            procd=0
            --哈？
        end
        api:setHeatAmount(procd)
end

function M.calcSpread(api,num,spread)
    if overCharge then
        return{(math.random()-0.5)*4,(math.random()-0.5)*4}
    else
        return{x_spread*spread,y_spread*spread}
    end
end

return M