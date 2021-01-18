import { combineReducers } from 'redux'
import { channelList } from '../features/channel'

export default combineReducers({
    channelList: channelList.reducer,
    channelListRequest: channelList.channelListRequestReducer,

})