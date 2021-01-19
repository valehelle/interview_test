import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as channelListRequest from './channelListRequest'
import { success } from 'redux-saga-requests';

export const channelListSelector = createSelector(
    [state => state.channelList.resultList,
    state => state.channelList.search.toUpperCase(),
    state => state.channelList.languages,
    state => state.channelList.categories,
    state => state.channelList.resolution,
    state => state.channelList.sortBy],
    (resultList, search, languages, categories, resolution, sortBy) => resultList.filter(channel => {
        if (search != '') {
            const title = channel.title.toUpperCase()
            const stbNumber = channel.stbNumber.toUpperCase()
            return title.includes(search) || stbNumber.includes(search)
        }

        return true

    }).filter(channel => {
        if (languages.length != 0) {
            const channelLanguage = channel.language

            return languages.find(language => language == channelLanguage) === undefined ? false : true
        }

        return true

    }).filter(channel => {
        if (categories.length != 0) {
            const channelCategory = channel.category

            return categories.find(category => category == channelCategory) === undefined ? false : true
        }

        return true

    }).filter(channel => {
        if (resolution.length != 0) {
            const channelResolution = channel.isHd ? 'isHd' : 'isSd'
            return resolution.find(resolution => resolution == channelResolution) === undefined ? false : true
        }

        return true

    }).sort(function (a, b) {
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




export const channelListSearchSelector = createSelector(
    state => state.channelList,
    channelList => channelList.search,
)
export const channelListSortBySelector = createSelector(
    state => state.channelList,
    channelList => channelList.sortBy,
)
export const channelListResolutionSelector = createSelector(
    state => state.channelList,
    channelList => channelList.resolution,
)

const initialState = {
    sortBy: 'number',
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
        changeSearchInput(state, action) {
            const search = action.payload
            state.search = search
        },
        changeSortBy(state, action) {
            const sortBy = action.payload
            state.sortBy = sortBy
        },
        changeResolution(state, action) {
            const resolution = action.payload
            state.resolution = resolution
        },
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

const { changeSearchInput, changeSortBy, changeResolution } = listSlice.actions
const reducer = listSlice.reducer

export { reducer, changeSearchInput, changeSortBy, changeResolution }