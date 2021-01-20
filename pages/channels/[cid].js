import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { channelDetail } from '../../features/channel'


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

const getChannelID = (cid) => {
    return cid.split('-')[1]
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const isToday = (date) => {
    const someDate = new Date(date)
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}



const getDay = (date) => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wendnesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    const d = new Date(date);
    const n = d.getDay()

    return days[n]
}

const getHour = (date) => {
    const date_format = '12';
    const d = new Date(date);
    var hour = d.getHours();  /* Returns the hour (from 0-23) */
    var minutes = d.getMinutes();  /* Returns the minutes (from 0-59) */
    var result = hour;
    var ext = '';

    if (date_format == '12') {
        if (hour > 12) {
            ext = 'PM';
            hour = (hour - 12);
            result = hour;

            if (hour < 10) {
                result = "0" + hour;
            } else if (hour == 12) {
                hour = "00";
                ext = 'AM';
            }
        }
        else if (hour < 12) {
            result = ((hour < 10) ? "0" + hour : hour);
            ext = 'AM';
        } else if (hour == 12) {
            ext = 'PM';
        }
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    result = result + ":" + minutes + ' ' + ext;
    return result
}

export default function index() {
    const dispatch = useDispatch()
    const router = useRouter()

    const channel = useSelector(channelDetail.channelDetailSelector)
    const channelSchedule = useSelector(channelDetail.channelDetailScheduleSelector)
    const { cid } = router.query
    const channelId = getChannelID(cid)

    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        dispatch(channelDetail.channelDetailRequestAction(channelId))

    }, [channelId]);

    return (
        <Container maxWidth="md">
            <Paper>
                <Box mt={10}>
                    <Box p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={4} sm={3} md={2}>
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
                        <Typography>{channel.description}</Typography>
                        <Typography>{channel.category}</Typography>
                        <Typography>{channel.language}</Typography>
                        <Typography>{channel.isHd ? 'HD' : 'SD'}</Typography>

                    </Box>


                    <Tabs
                        value={tabIndex}
                        onChange={(e, newValue) => setTabIndex(newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {channelSchedule.map((schedule, index) => <Tab key={index} label={isToday(schedule.date) ? 'Today' : getDay(schedule.date)} />)}
                    </Tabs>


                    {channelSchedule.map((channel, index) => {

                        return (
                            <TabPanel as="div" key={index} value={tabIndex} index={index}>
                                {channel.schedule.map(((sche, index) => <Box key={index}>{getHour(sche.datetime)} {sche.title}  </Box>))}
                            </TabPanel>
                        )
                    })}


                </Box>
            </Paper>
        </Container >
    );
}



