local M = {}

function M.shoot(api)
    api:safeAsyncTask(function ()
        api:shootOnce(api:isShootingNeedConsumeAmmo())
        return false
    end,0,0,1)
    api:safeAsyncTask(function ()
        api:putAmmoInMagazine(1)
        return true
    end,1000,0,1)
end

function M.start_reload(api)
    return false
end

return M