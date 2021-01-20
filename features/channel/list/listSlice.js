import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as channelListRequest from './channelListRequest'
import { success } from 'redux-saga-requests';

export const channelListSearchSelector = state => state.channelList.search
export const channelListSortBySelector = state => state.channelList.sortBy
export const channelListResolutionSelector = state => state.channelList.resolution
export const channelListLanguageSelector = state => state.channelList.languages
export const channelListCategorySelector = state => state.channelList.categories



export const channelListSelector = createSelector(
    [
        state => state.channelList.resultList,
        channelListSearchSelector,
        channelListLanguageSelector,
        channelListCategorySelector,
        channelListResolutionSelector,
        channelListSortBySelector
    ],
    (resultList, search, languages, categories, resolution, sortBy) => resultList.filter(channel => {

        if (search != '') {
            const query = search.toUpperCase()
            const title = channel.title.toUpperCase()
            const stbNumber = channel.stbNumber.toUpperCase()
            return title.includes(query) || stbNumber.includes(query)
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
        changeLanguage(state, action) {
            const languages = action.payload
            state.languages = languages
        },
        changeCategory(state, action) {
            const categories = action.payload
            state.categories = categories
        },
    },
    extraReducers: {
        [success(channelListRequest.channelListRequestAction.type)]: (state, action) => {

            const response = action.payload.data.response
            const massageResponse = response.map(channel => channel.stbNumber == '0' ? { ...channel, stbNumber: '99999' } : channel)
            const urls = Object.fromEntries(response.map(channel => [channel.id, channel.detailUrl]))
            state.channelUrls = urls
            state.response = massageResponse
            state.resultList = massageResponse
        }
    }
})

const { changeSearchInput, changeSortBy, changeResolution, changeLanguage, changeCategory } = listSlice.actions
const reducer = listSlice.reducer

export { reducer, changeSearchInput, changeSortBy, changeResolution, changeLanguage, changeCategory }