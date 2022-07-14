import { Action } from "redux";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const ZOOM_SET = 'ZOOM_SET'
export const ZOOM_RESET = 'ZOOM_RESET'
export const ZOOM_ENABLE = 'ZOOM_ENABLE'

export const zoomReducer = (
    state = { isZoomed: false, reset: false, enabled: false },
    action: ActionWithPayload<boolean>
) => {
    switch (action.type) {
        case ZOOM_SET:
            return { ...state, isZoomed: true, reset: false }
        case ZOOM_ENABLE:
            return { ...state, enabled: action.payload, }
        case ZOOM_RESET:
            return { ...state, isZoomed: false, reset: action.payload }
        default:
            return state
    }
}
