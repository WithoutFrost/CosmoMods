local M = {}

function M.shoot(api)
    api:shootOnce(api:isShootingNeedConsumeAmmo())
    api:removeAmmoFromMagazine(1)
end

return M