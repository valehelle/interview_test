import { combineReducers } from 'redux'
import { channelList, channelDetail } from '../features/channel'

export default combineReducers({
    channelList: channelList.reducer,
    channelListRequest: channelList.channelListRequestReducer,
    channelDetail: channelDetail.reducer,
    channelDetailRequest: channelDetail.channelDetailRequestReducer

})