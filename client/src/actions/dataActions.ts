import axios, { AxiosError } from "axios"
import _ from "lodash"
import { RootStateOrAny } from "react-redux"
import { Dispatch } from "redux"
import { DATA_FAIL, DATA_REQUEST, DATA_SOURCES_FILTERED, DATA_SUCCESS, DEVICES_FAIL, DEVICES_REQUEST, DEVICES_SUCCESS } from "../constants/dataConstants"
import { assignColor } from "../helpers/colorHelper"
import { assignMarker } from "../helpers/markerTypeHelper"

export interface DataPoint {
    x: number
    y: number
}
export interface DataSet {
    name: string
    deviceID: string
    dataType: string
    dataPoints: DataPoint[],
    showInLegend: boolean,
    color: string,
    markerType: string
}

export const getData = () => async (dispatch: Dispatch, getState: RootStateOrAny) => {

    const begin = new Date().getTime()

    const {
        dateRange: { dateRange },
    } = getState()

    const start = dateRange[0].getTime()
    const end = dateRange[1].getTime()

    try {
        dispatch({ type: DATA_REQUEST })

        const { data } = await axios.get(`/api/data/${start}/${end}`)

        const formattedData = data.map((x: DataSet, index: number) => ({
            ...x,
            color: assignColor(),
            markerType: assignMarker(x.deviceID),
            type: 'spline',
            axisYIndex: x.name.includes("Magno_X") || x.name.includes("Magno_Y") ? 0 : 1
        }))

        dispatch({
            type: DATA_SUCCESS,
            payload: formattedData,
        })

        if (data) {
            console.log(_.round(((new Date().getTime() - begin) / 1000), 2) + " seconds to finish...")
        }

    } catch (error) {
        const err = error as AxiosError

        dispatch({
            type: DATA_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getDevices = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DEVICES_REQUEST })

        const {
            data
        } = await axios.get(`/api/data/devices`)

        dispatch({
            type: DEVICES_SUCCESS,
            payload: data,
        })

        dispatch({
            type: DATA_SOURCES_FILTERED,
            payload: data,
        })

    } catch (error) {
        const err = error as AxiosError

        dispatch({
            type: DEVICES_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
