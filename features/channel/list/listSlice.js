import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as channelListRequest from './channelListRequest'
import { success } from 'redux-saga-requests';

export const channelListSelector = createSelector(
    state => state.channelList,
    channelList => channelList.resultList,
    resultList => resultList.resultList.filter(channel => {
        const search = resultList.search
        if (resultList.search != '') {
            return (channel.title.includes(search) || channel.stbNumber.includes(search))
        }

        return true

    }).filter(channel => {
        const languages = resultList.languages
        if (languages.length != 0) {
            const channelLanguage = channel.language

            return languages.find(language => language == channelLanguage) === undefined ? false : true
        }

        return true

    }).filter(channel => {
        const categories = resultList.categories
        if (categories.length != 0) {
            const channelCategory = channel.category

            return categories.find(category => category == channelCategory) === undefined ? false : true
        }

        return true

    }).filter(channel => {
        const resolutions = resultList.resolution
        if (resolutions.length != 0) {
            const channelResolution = channel.isHd ? 'isHd' : 'isSd'
            return resolutions.find(resolution => resolution == channelResolution) === undefined ? false : true
        }

        return true

    }).sort(function (a, b) {
        const sortBy = resultList.sortBy
        if (sortBy == 'name') {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        } else {
            if (a.stbNumber < b.stbNumber) { return -1; }
            if (a.stbNumber > b.stbNumber) { return 1; }
            return 0;
        }
    })
)

const initialState = {
    sortBy: 'name',
    search: '',
    resolution: [],
    languages: [],
    categories: [],
    response: [],
    channelUrls: {},
    resultList: []
}
const listSlice = createSlice({
    name: 'channel/listSlice',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [success(channelListRequest.channelListRequestAction.type)]: (state, action) => {

            const response = action.payload.data.response
            const urls = Object.fromEntries(response.map(channel => [channel.id, channel.detailUrl]))
            state.channelUrls = urls
            state.response = response
            state.resultList = response
        }
    }
})

const { fetchListAction } = listSlice.actions
const reducer = listSlice.reducer

export { reducer, fetchListAction }