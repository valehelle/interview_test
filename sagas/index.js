import axios from 'axios';
import { all } from 'redux-saga/effects';
import { createRequestInstance, watchRequests, success } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import * as mock from './mock';

function* watchAll() {
    yield createRequestInstance({
        driver: process.env.mock ? mock.createDriver() : createDriver(
            axios.create({
                baseURL: process.env.BASE_URL
            })
        )
    });
    yield all([
        watchRequests()
    ]);
}


export default watchAll;