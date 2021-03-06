import { createAction } from '@reduxjs/toolkit'
import { requestsReducer } from 'redux-saga-requests';
const path = 'channel/detail'

export const channelDetailRequestAction = createAction(`${path}/channelDetailRequest`, function prepare(channelId) {
    return {
        payload: () => {
            return {
                payload: {
                    request: { url: `/channel/${channelId}.json` }
                }
            }
        }
    }
})
export const channelListResetAction = createAction(`${path}/channelListRequest_RESET`)


export const channelDetailRequestReducer = requestsReducer({ actionType: channelDetailRequestAction.type, getDefaultData: () => { }, resetOn: [channelListResetAction.type] });
