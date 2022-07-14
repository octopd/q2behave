import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { userCreateReducer } from './modules/createAccount'
import { dataReducer, dataSourcesReducer, dataTypesReducer } from './modules/data'
import { dateRangeReducer, hotButtonReducer } from './modules/dateRange'
import { devicesReducer } from './modules/devices'
import { userLoginReducer } from './modules/userInfo'
import { zoomReducer } from './modules/zoom'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userCreate: userCreateReducer,
    data: dataReducer,
    dataSources: dataSourcesReducer,
    dataTypes: dataTypesReducer,
    devices: devicesReducer,
    dateRange: dateRangeReducer,
    hotButton: hotButtonReducer,
    zoom: zoomReducer,
})

const user = localStorage.getItem('userInfo')
const userInfoFromStorage = user ? JSON.parse(user) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
