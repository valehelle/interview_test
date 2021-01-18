import * as list from './listSlice'

import * as channelListRequest from './channelListRequest'
import { success } from 'redux-saga-requests';
import { channelListMock, resultListMock, resultListMockOrderedByName, resultListMockOrderedByNumber, resultListMockUnordered, resultListMockIndian, resultListMockIndianChinese, resultListMockRadio } from './channelListMock';


describe('channel reducer', () => {
    it('it should store the response and detailsUrl', () => {
        expect(list.reducer(undefined, { type: success(channelListRequest.channelListRequestAction), payload: { data: channelListMock } })).toEqual(
            {
                sortBy: 'name',
                resolution: [],
                languages: [],
                categories: [],
                search: '',
                resultList: channelListMock.response,
                channelUrls: Object.fromEntries(
                    channelListMock.response.map(channel => [channel.id, channel.detailUrl])
                ),
                response: channelListMock.response
            }
        )
    }),
        it('channelListSelector selector should be searchable by name', () => {
            const mockReducer = {
                channelList: {
                    sortBy: 'name',
                    resolution: [],
                    search: 'TV1',
                    languages: [],
                    categories: [],
                    resultList: channelListMock.response,
                    response: channelListMock.response
                },
            };
            const resultList = list.channelListSelector(mockReducer)

            expect(resultList).toEqual(resultListMock)
        })
    it('channelListSelector selector should be sorted by name', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'name',
                resolution: [],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockUnordered,
                response: resultListMockUnordered
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)

        expect(resultListOrdered).toEqual(resultListMockOrderedByName)
    })
    it('channelListSelector selector should be sorted by number', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: [],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockUnordered,
                response: resultListMockUnordered
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)

        expect(resultListOrdered).toEqual(resultListMockOrderedByNumber)
    })
    it('channelListSelector filter by indian language', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: [],
                languages: ['Indian'],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).toEqual(resultListMockIndian)
    })
    it('channelListSelector filter by Indian and Chinese language', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: [],
                languages: ['Indian', 'Chinese'],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).toEqual(resultListMockIndianChinese)
    })
    it('channelListSelector filter by Variety Entertainment', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: [],
                languages: [],
                categories: ['Radio'],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).toEqual(resultListMockRadio)
    })
    it('channelListSelector selector should be filter by SD resolution', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'name',
                resolution: ['isSd'],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)

        expect(resultListOrdered).toEqual(resultListMockIndian)
    })
    it('channelListSelector selector should be filter by HD resolution', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'name',
                resolution: ['isHd'],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).toEqual(resultListMockRadio)
    })
    it('channelListSelector selector should be filter by both SD and HD resolution', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: ['isHd', 'isSd'],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).toEqual(resultListMockIndianChinese)
    })
    it('channelListSelector selector should not filter SD when resolution is HD', () => {
        const mockReducer = {
            channelList: {
                sortBy: 'number',
                resolution: ['isHd'],
                languages: [],
                categories: [],
                search: '',
                resultList: resultListMockIndianChinese,
                response: resultListMockIndianChinese
            },
        };
        const resultListOrdered = list.channelListSelector(mockReducer)
        expect(resultListOrdered).not.toBe(resultListMockIndian)
    })


})