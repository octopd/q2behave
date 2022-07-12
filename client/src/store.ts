import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { userLoginReducer } from './modules/userInfo'
import { dataReducer, dataSourcesReducer, dataTypesReducer, dateRangeReducer, devicesReducer, hotButtonReducer, zoomReducer } from './reducers/dataReducer'

const reducer = combineReducers({
    userLogin: userLoginReducer,
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
