import { DateRange } from "@mui/lab";
import { Action } from "redux"
import { DataSet } from "../actions/dataActions";
import { DataType, dataTypesList } from "../components/DataControls/DataTypeSelector";
import {
    DATA_FAIL,
    DATA_REQUEST,
    DATA_SOURCES,
    DATA_SOURCES_FILTERED,
    DATA_SUCCESS,
    DATA_TYPES,
    DATA_TYPES_FILTERED,
    DATE_RANGE_RESET,
    DATE_RANGE_UPDATE,
    DEVICES_FAIL,
    DEVICES_REQUEST,
    DEVICES_SUCCESS,
    HOT_BUTTON_RESET,
    HOT_BUTTON_SELECTION,
    ZOOM_ENABLE,
    ZOOM_RESET,
    ZOOM_SET
} from "../constants/dataConstants"
import { HotButtonValues } from "../enum"

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const dataReducer = (
    state = { data: [], dataSets: [], dataSources: [], loading: false },
    action: ActionWithPayload<DataSet[]>
) => {
    switch (action.type) {
        case DATA_REQUEST:
            return { ...state, loading: true, success: false }
        case DATA_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload, dataSets: Object.keys(action.payload) }
        case DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const dataSourcesReducer = (
    state = { dataSources: [], filteredDataSources: [], },
    action: ActionWithPayload<any> //TODO: Define type here...
) => {
    switch (action.type) {
        case DATA_SOURCES:
            return { ...state, dataSources: action.payload, filteredDataSources: action.payload }
        case DATA_SOURCES_FILTERED:
            return { ...state, filteredDataSources: action.payload }
        default:
            return state
    }
}

export const dataTypesReducer = (
    state = { dataTypes: dataTypesList, filteredDataTypes: dataTypesList, },
    action: ActionWithPayload<DataType[]>
) => {
    switch (action.type) {
        case DATA_TYPES:
            return { ...state, dataTypes: action.payload, filteredDataTypes: action.payload }
        case DATA_TYPES_FILTERED:
            return { ...state, filteredDataTypes: action.payload }
        default:
            return state
    }
}

export const devicesReducer = (
    state = { devices: [], loading: false },
    action: ActionWithPayload<any> //TODO: Define type here...
) => {
    switch (action.type) {
        case DEVICES_REQUEST:
            return { loading: true, success: false }
        case DEVICES_SUCCESS:
            return { ...state, loading: false, success: true, devices: action.payload }
        case DEVICES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

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
