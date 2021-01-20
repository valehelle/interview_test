import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useRenderHook } from '../../commons/customHook'
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

import { channelList } from '../../features/channel'


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


export default function index() {
    const router = useRouter()
    const classes = useStyles();
    const { pid } = router.query

    return (
        <Container maxWidth="md">
            { pid}
        </Container >
    );
}



