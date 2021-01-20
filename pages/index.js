import React, { useEffect, useState } from 'react'
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
import InputLabel from '@material-ui/core/InputLabel';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDebouncedCallback } from 'use-debounce';

import { channelList } from '../features/channel'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    grid: {
        "&:hover": {
            cursor: "pointer"
        },
    }
}));

function resize() {
    console.log('height')
}
export default function index() {
    const dispatch = useDispatch()

    const sortBy = useSelector(channelList.channelListSortBySelector)
    const resolution = useSelector(channelList.channelListResolutionSelector)
    const language = useSelector(channelList.channelListLanguageSelector)
    const category = useSelector(channelList.channelListCategorySelector)
    const list = useSelector(channelList.channelListSelector)

    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebouncedCallback(
        (value) => {
            dispatch(channelList.changeSearchInput(value))
        },
        500
    );


    useEffect(() => {
        dispatch(channelList.channelListRequestAction())

    }, []);

    const handleSearchInput = (event) => {
        const searchValue = event.target.value
        setSearchValue(searchValue)
        debounced.callback(searchValue)
    }

    const handleSortBy = (event) => {
        dispatch(channelList.changeSortBy(event.target.value))
    }

    const handleResolution = (event) => {
        dispatch(channelList.changeResolution(event.target.value))
    }
    const handleLanguage = (event) => {
        dispatch(channelList.changeLanguage(event.target.value))
    }
    const handleCategory = (event) => {
        dispatch(channelList.changeCategory(event.target.value))
    }





    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <FormControl fullWidth={true}>
                <TextField fullWidth={true} value={searchValue} onChange={handleSearchInput} id="search" label="Search" />
            </FormControl>
            <Box my={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel >Sort By</InputLabel>
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
                <FormControl className={classes.formControl}>
                    <InputLabel >Category</InputLabel>
                    <Select
                        multiple
                        labelId="Category"
                        id="Category"
                        value={category}
                        onChange={handleCategory}
                    >
                        <MenuItem key={'Movies'} value={'Movies'}>Movies</MenuItem>
                        <MenuItem key={'Sports'} value={'Sports'}>Sports</MenuItem>
                        <MenuItem key={'Kids'} value={'Kids'}>Kids</MenuItem>
                        <MenuItem key={'Learning'} value={'Learning'}>Learning</MenuItem>
                        <MenuItem key={'Music'} value={'Music'}>Music</MenuItem>
                        <MenuItem key={'News'} value={'News'}>News</MenuItem>
                        <MenuItem key={'Lifestyle'} value={'Lifestyle'}>Lifestyle</MenuItem>
                        <MenuItem key={'Variety Entertainment'} value={'Variety Entertainment'}>Variety Entertainment</MenuItem>
                        <MenuItem key={'Special Interest'} value={'Special Interest'}>Special Interest</MenuItem>
                        <MenuItem key={'Radio'} value={'Radio'}>Radio</MenuItem>
                    </Select>
                </FormControl>
            </Box>


            <Box mt={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel >Language</InputLabel>
                    <Select
                        multiple
                        labelId="Language"
                        id="Language"
                        value={language}
                        onChange={handleLanguage}
                    >
                        <MenuItem key={'International'} value={'International'}>International</MenuItem>
                        <MenuItem key={'Malay'} value={'Malay'}>Malay</MenuItem>
                        <MenuItem key={'Chinese'} value={'Chinese'}>Chinese</MenuItem>
                        <MenuItem key={'Indian'} value={'Indian'}>Indian</MenuItem>
                        <MenuItem key={'Korean & Japanese'} value={'Korean & Japanese'}>Korean & Japanese</MenuItem>
                        <MenuItem key={'Multiple Language'} value={'Multiple Language'}>Multiple Languages</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box mt={3}>
                <FormControl className={classes.formControl}>
                    <InputLabel >Resolution</InputLabel>
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

            <Box mt={5}>
                <Typography variant="h4">Channel</Typography>
                <Grid container spacing={3} className={classes.grid}>
                    <MemoizedChannelList list={list} />
                </Grid>
            </Box>
        </Container >
    );
}

const ChannelList = ({ list }) => {

    const router = useRouter()

    const handleChannelClick = (url) => {
        router.push(url)
    }

    return (
        <>
            {
                list.map(channel => {

                    return (
                        <Grid key={channel.id} item xs={12} sm={6} md={4} lg={4} onClick={() => handleChannelClick(channel.detailUrl)}>
                            <Paper >
                                <Box p={2}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img style={{ width: '100%' }} src={channel.imageUrl} alt="Image" />
                                        </Grid>
                                        <Grid item xs={8} >

                                            <Typography>
                                                {channel.stbNumber != '99999' ? `CH${channel.stbNumber}` : 'Astro GO Exclusive Channels'}
                                            </Typography>
                                            <Typography >{channel.title}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box p={2}>
                                    <Typography>{channel.category}</Typography>
                                    <Typography>{channel.language}</Typography>
                                    <Typography>{channel.isHd ? 'HD' : 'SD'}</Typography>

                                </Box>
                            </Paper>
                        </Grid>
                    )

                })
            }
        </>
    )
}
export const MemoizedChannelList = React.memo(ChannelList)

