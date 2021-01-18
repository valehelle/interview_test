import { createAction } from '@reduxjs/toolkit'
import { requestsReducer } from 'redux-saga-requests';
const path = 'channel/list'

export const channelListRequestAction = createAction(`${path}/channelListRequest`, function prepare() {
    return {
        payload: () => {
            return {
                payload: {
                    request: { url: 'channel/all.json' }
                }
            }
        }
    }
})
export const channelListResetAction = createAction(`${path}/channelListRequest_RESET`)

export const loginInitialState = {
}


export const channelListRequestReducer = requestsReducer({ actionType: channelListRequestAction.type, getDefaultData: () => loginInitialState, resetOn: [channelListResetAction.type] });
