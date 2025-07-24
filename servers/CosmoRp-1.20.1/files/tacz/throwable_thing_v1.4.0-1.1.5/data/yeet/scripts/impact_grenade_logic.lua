local M = {}

function M.shoot(api)
    local is_aim = api:getAimingProgress()
    if (is_aim == 1) then
        api:shootOnce(api:isShootingNeedConsumeAmmo())
    end
end

return M