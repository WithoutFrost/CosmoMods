local default = require("tacz_default_state_machine")
local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local MAIN_TRACK = default.MAIN_TRACK
local main_track_states = default.main_track_states
local gun_kick_state = setmetatable({}, {__index = gun_kick_state})
local start_state = setmetatable({}, {__index = main_track_states.start})
local idle_state = setmetatable({}, {__index = main_track_states.idle})
local GUN_KICK_TRACK_LINE = default.GUN_KICK_TRACK_LINE

local last_aim_prog = 0

local function isNoAmmo(context)
    return (not context:hasBulletInBarrel()) and (context:getAmmoCount() <= 0)
end

local function runAimAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    local aim_prog = context:getAimingProgress()
    if (((aim_prog-0.01) > last_aim_prog) or (aim_prog >= 0.99)) then
        context:runAnimation("draw_aim", track, false, PLAY_ONCE_STOP, 0.2)
        context:stopAnimation(track)
        context:adjustAnimationProgress(track, aim_prog, true)
    elseif ((aim_prog+0.01) < last_aim_prog) then
        context:runAnimation("put_away_aim", track, false, PLAY_ONCE_STOP, 0.2)
        context:stopAnimation(track)
        context:adjustAnimationProgress(track, 1-aim_prog, false)
    end
    last_aim_prog = aim_prog
end

local function runPutAwayAnimation(context)
    local put_away_time = context:getPutAwayTime()
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    context:runAnimation("put_away", track, false, PLAY_ONCE_HOLD, put_away_time * 0.75)
    context:setAnimationProgress(track, 1, true)
    context:adjustAnimationProgress(track, -put_away_time, false)
end

local function runReloadAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    if (isNoAmmo(context)) then
        context:runAnimation("reload_empty", track, false, PLAY_ONCE_STOP, 0.2)
    else
        context:runAnimation("reload_tactical", track, false, PLAY_ONCE_STOP, 0.2)
    end
end

local function runInspectAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    context:runAnimation("inspect", track, false, PLAY_ONCE_STOP, 0.2)
end

function start_state.transition(this, context, input)
    if (input == INPUT_DRAW and (not isNoAmmo(context))) then
        context:runAnimation("draw", context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0)
    end
    return idle_state.transition(this, context, input)
end

function idle_state.transition(this, context, input)
    if ((input == INPUT_PUT_AWAY) and (not isNoAmmo(context))) then
        runPutAwayAnimation(context)
        return this.main_track_states.final
    end

    if (input == INPUT_RELOAD) then
        runReloadAnimation(context)
        return main_track_states.idle.transition(this, context, input)
    end

    if (input == INPUT_INSPECT) then
        runInspectAnimation(context)
        return main_track_states.idle.transition(this, context, input)
    end

    if ((context:getAimingProgress() > 0) and (not isNoAmmo(context))) then
        runAimAnimation(context)
        return main_track_states.idle.transition(this, context, input)
    end

    if (input == INPUT_BAYONET_PUSH) then
        context:runAnimation("melee_push", context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0.2)
        return this.main_track_states.idle
    end
end

function gun_kick_state.transition(this, context, input)
    if (input == INPUT_SHOOT and context:getAimingProgress() >= 0.99) then
        local track = context:findIdleTrack(GUN_KICK_TRACK_LINE, false)
        context:runAnimation("shoot", track, true, PLAY_ONCE_STOP, 0)
    end
    return nil
end

local M = {setmetatable({
    main_track_states = setmetatable({
        start = start_state,
        idle = idle_state}, 
    {__index = main_track_states}),
}, {__index = default}),
    setmetatable
    }

return M