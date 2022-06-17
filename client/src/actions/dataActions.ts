import axios, { AxiosError } from "axios"
import _ from "lodash"
import { RootStateOrAny } from "react-redux"
import { Dispatch } from "redux"
import { DATA_REQUEST, DATA_SUCCESS, DATA_FAIL, DEVICES_SUCCESS, DEVICES_REQUEST, DEVICES_FAIL, DATA_SOURCES_FILTERED, } from "../constants/dataConstants"
import { assignColor } from "../helpers/colorHelpers"

export interface DataSet {
    name: string
    deviceID: string
    dataType: string
    dataPoints: [{ x: number, y: number }],
    showInLegend: boolean,
    color: string,
    marker: { symbol: string }
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
            type: 'spline',
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
        } = await axios.get(`/api/devices`)

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
