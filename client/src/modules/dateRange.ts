import { DateRange } from "@mui/lab";
import { Action } from "redux";
import { HotButtonValues } from "../enum";

export const DATE_RANGE_UPDATE = 'DATE_RANGE_UPDATE'
export const DATE_RANGE_RESET = 'DATE_RANGE_RESET'
export const HOT_BUTTON_SELECTION = 'HOT_BUTTON_SELECTION'
export const HOT_BUTTON_RESET = 'HOT_BUTTON_RESET'

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const initialState: {} = {}

export const dateRangeReducer = (
    state = { dateRange: [new Date(new Date().setHours(new Date().getHours() - 1)), new Date()], reset: false }, //TODO: get this from somewhere else
    action: ActionWithPayload<DateRange<Date>>
) => {
    switch (action.type) {
        case DATE_RANGE_UPDATE:
            return { dateRange: action.payload, reset: false }
        case DATE_RANGE_RESET:
            return { dateRange: [new Date(new Date().setHours(new Date().getHours() - 1)), new Date()], reset: true }
        default:
            return state
    }
}

export const hotButtonReducer = (
    state = { selection: HotButtonValues.HOUR },
    action: ActionWithPayload<HotButtonValues>
) => {
    switch (action.type) {
        case HOT_BUTTON_SELECTION:
            return { selection: action.payload }
        case HOT_BUTTON_RESET:
            return { selection: HotButtonValues.CUSTOM }
        default:
            return state
    }
}
