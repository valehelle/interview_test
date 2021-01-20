import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as channelDetailRequest from './channelDetailRequest'
import { success } from 'redux-saga-requests';

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
    },
    extraReducers: {

    }
})

const { } = listSlice.actions
const reducer = listSlice.reducer

export { reducer }