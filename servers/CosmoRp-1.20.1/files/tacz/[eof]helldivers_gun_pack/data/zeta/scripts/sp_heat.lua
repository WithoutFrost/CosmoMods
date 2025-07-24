local M = {}

-- 尝试开火射击时调用
function M.shoot(api)
    api:shootOnce(false)
end

function M.start_reload(api)
    -- Initialize cache that will be used in reload ticking
    local cache = {
        is_tactical = api:getReloadStateType() == TACTICAL_RELOAD_FEEDING,
        needed_count = 1
    }
    api:cacheScriptData(cache)
    -- Return true to start ticking
    return true
end

function M.tick_reload(api)
    local cache = api:getCachedScriptData()

    local reload_empty = api:getScriptParams().reload_empty * 1000
    local reload_feed = api:getScriptParams().reload_feed * 1000
    local reload_tac = api:getScriptParams().reload_tac * 1000
    local reload_time = api:getReloadTime()

    if (not cache.is_tactical) then
        if (reload_time < reload_feed) then
            return TACTICAL_RELOAD_FEEDING, reload_feed - reload_time
        elseif (reload_time >= reload_feed and reload_time < reload_empty) then
            if (cache.needed_count > 0) then
                api:putAmmoInMagazine(api:isReloadingNeedConsumeAmmo()
                and (api:consumeAmmoFromPlayer(cache.needed_count)*99) or cache.needed_count*99)
                cache.needed_count = 0
            end
            api:setHeatAmount(0)
            return TACTICAL_RELOAD_FINISHING, reload_empty - reload_time
        else
            return NOT_RELOADING, -1
        end
    else
        if (reload_time < reload_feed) then
            return EMPTY_RELOAD_FEEDING, reload_feed - reload_time
        elseif (reload_time >= reload_feed and reload_time < reload_tac) then
            if (cache.needed_count > 0) then
                api:putAmmoInMagazine(api:isReloadingNeedConsumeAmmo()
                and (api:consumeAmmoFromPlayer(cache.needed_count)*99) or cache.needed_count*99)
                cache.needed_count = 0
            end
            api:setHeatAmount(0)
            return EMPTY_RELOAD_FINISHING, reload_tac - reload_time
        else
            return NOT_RELOADING, -1
        end
    end
end

local function tick_normal(api, heatTimestamp)
    local delay = api:getCoolingDelay()
    local now = api:getCurrentTimestamp()

    if now - heatTimestamp >= delay then
        local heat = api:getHeatAmount() - api:calcHeatReduction(heatTimestamp)
        api:setHeatAmount(heat)
    end
end

local function tick_locked(api, heatTimestamp)
    local overheatTime = api:getOverheatTime()
    local now = api:getCurrentTimestamp()

    if now - heatTimestamp >= overheatTime then
        local heat = api:getHeatAmount() - api:calcHeatReduction(heatTimestamp)
        api:setHeatAmount(heat)
        if heat <= 0 then
            api:setOverheatLocked(false);
        end
    end
end

function M.tick_heat(api, heatTimestamp)
    if api:hasHeatData() then
        if api:isOverheatLocked() then
            tick_locked(api, heatTimestamp)
        else
            tick_normal(api, heatTimestamp)
        end
    end
end

-- 警告，此方法是shootOnce的一部分，不要在此处尝试射击，不然会死循环
function M.handle_shoot_heat(api)
    if api:hasHeatData() then
        local heatMax = api:getHeatMax()
        local heat = math.min(api:getHeatAmount() + api:getHeatPerShot(), heatMax)
        api:setHeatAmount(heat)
        if heat >= heatMax then
            api:reduceAmmoOnce()
            api:removeAmmoFromMagazine(api:getMaxAmmoCount())
            api:setOverheatLocked(true);
        end
    end
end

return M