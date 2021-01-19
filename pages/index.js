import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useRenderHook } from '../commons/customHook'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

import { channelList } from '../features/channel'

export default function index() {
    const list = useSelector(channelList.channelListSelector)
    const search = useSelector(channelList.channelListSearchSelector)
    const sortBy = useSelector(channelList.channelListSortBySelector)
    const resolution = useSelector(channelList.channelListResolutionSelector)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(channelList.channelListRequestAction())

    }, []);

    const handleSearchInput = (event) => {

        dispatch(channelList.changeSearchInput(event.target.value))
    }

    const handleSortBy = (event) => {
        dispatch(channelList.changeSortBy(event.target.value))
    }

    const handleResolution = (event) => {
        dispatch(channelList.changeResolution(event.target.value))
    }

    return (
        <Container maxWidth="md">
            <FormControl fullWidth={true}>
                <TextField fullWidth={true} value={search} onChange={handleSearchInput} id="search" label="Search" />
            </FormControl>
            <Box my={3}>
                <FormControl>
                    <Select
                        labelId="Sort By"
                        id="sortBy"
                        value={sortBy}
                        onChange={handleSortBy}
                    >
                        <MenuItem key={'number'} value={'number'}>Number</MenuItem>
                        <MenuItem key={'name'} value={'name'}>Name</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box mt={3}>
                <FormControl>
                    <Select
                        multiple
                        labelId="Resolution"
                        id="resolution"
                        value={resolution}
                        onChange={handleResolution}
                    >
                        <MenuItem key={'isHd'} value={'isHd'}>HD</MenuItem>
                        <MenuItem key={'isSd'} value={'isSd'}>SD</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={3}>
                {list.map(channel => {

                    return (
                        <Grid key={channel.id} item xs={12} sm={6} md={4} lg={4}>
                            <Paper >{channel.title} || {channel.stbNumber} || {channel.id}</Paper>
                        </Grid>
                    )

                })}

            </Grid>
        </Container >
    );
}




// const loginRequestData = useSelector(state => state.loginRequest.data)
//     const loginState = useSelector(login.loginSelector)
//     const router = useRouter()
//     const dispatch = useDispatch()
//     const buttonClick = () => {
//         dispatch(login.loginRequestAction())
//     }
//     const handleClick = (e) => {
//         e.preventDefault()

//         router.push('/background')
//     }
//     const options = {
//         finalRender: () => {
//             dispatch(login.resetLoginAction());
//             dispatch(login.loginResetAction())
//         },
//         data: loginRequestData,
//         changedData: (data) => data.token,
//         onDataChange: () => router.push('/background')
//     }

//     useRenderHook(options)

//     const updateData = (event) => {
//         dispatch(login.changeLoginAction({
//             ...loginState,
//             [event.target.id]: event.target.value
//         }))
//     }