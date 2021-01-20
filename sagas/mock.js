import * as requestMock from 'redux-saga-requests-mock';
// import { login, register } from '../features/accounts'
import { channelList, channelDetail } from '../features/channel'
export const createDriver = () => requestMock.createDriver(
    {
        // [login.loginRequestAction.type]: requestConfig => {
        //     // mock normal response for id 1 and 404 error fot the rest
        //     return login.loginMock;

        //     throw { status: 404 };
        // },
        [channelList.channelListRequestAction.type]: requestConfig => {
            // mock normal response for id 1 and 404 error fot the rest

            return { data: channelList.channelListMock };

        },
        [channelDetail.channelDetailRequestAction.type]: requestConfig => {
            // mock normal response for id 1 and 404 error fot the rest

            return { data: channelDetail.channelDetailMock }

        },
    }
)

