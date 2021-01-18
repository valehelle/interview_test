import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useRenderHook } from '../commons/customHook'
import TextField from '@material-ui/core/TextField';
import { channelList } from '../features/channel'

export default function index() {
    const list = useSelector(channelList.channelListSelector)
    console.log(list)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(channelList.channelListRequestAction())

    }, []);
    return (
        <div>
            <p >CLICK ME</p>
        </div>
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