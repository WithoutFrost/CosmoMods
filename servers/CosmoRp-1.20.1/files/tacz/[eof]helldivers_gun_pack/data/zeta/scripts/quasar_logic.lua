local M = {}

function M.shoot(api)
    api:safeAsyncTask(function ()
        api:shootOnce(api:isShootingNeedConsumeAmmo())
        return false
    end,36*10000,0,1)
    api:safeAsyncTask(function ()
        api:putAmmoInMagazine(1)
        return true
    end,10*1000,0,1)
end

return M