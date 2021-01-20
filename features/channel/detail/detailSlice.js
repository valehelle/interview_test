import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as channelDetailRequest from './channelDetailRequest'
import { success } from 'redux-saga-requests';


const isToday = (date) => {
    const someDate = new Date(date)
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}


export const channelDetailSelector = state => state.channelDetail.details
export const channelDetailScheduleSelector = createSelector(
    [
        channelDetailSelector,
    ],
    (details) => {
        const schedule = details.schedule
        const keySchedule = Object.keys(schedule)

        const scheduleList = keySchedule.map(key => {
            if (isToday(key)) {

                const newSchedule = schedule[key].filter(sch => {
                    const todayDate = new Date()
                    const showDate = new Date(sch.datetime)
                    return todayDate.getTime() - showDate.getTime() > 0 ? false : true
                })
                return ({ 'date': key, 'schedule': newSchedule })
            }
            return ({ 'date': key, 'schedule': schedule[key] })
        })

        return scheduleList
    }

)


const initialState = {
    details: {
        schedule: []
    }
}
const detailSlice = createSlice({
    name: 'channel/detailSlice',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [success(channelDetailRequest.channelDetailRequestAction.type)]: (state, action) => {

            const response = action.payload.data.response
            const schedule = response.schedule
            const keySchedule = Object.keys(schedule)
            const scheduleList = keySchedule.map(key => {
                return ({ 'date': key, 'schedule': schedule[key] })

            })
            state.details = response
            state.schedule = scheduleList
        }
    }
})

const { } = detailSlice.actions
const reducer = detailSlice.reducer

export { reducer }