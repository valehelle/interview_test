import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'
import * as toolkit from '@reduxjs/toolkit'


const changePayload = store => next => action => {
    const newAction = typeof action.payload === 'function' ? { type: action.type, ...action.payload(store.getState()) } : action
    let result = next(newAction)
    return result
}



function configureStore(preloadedState, { isServer, req = null }) {

    /**
     * Recreate the stdChannel (saga middleware) with every context.
     */

    const sagaMiddleware = createSagaMiddleware()

    /**
     * Since Next.js does server-side rendering, you are REQUIRED to pass
     * `preloadedState` when creating the store.
     */

    const store = toolkit.configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: [changePayload, sagaMiddleware]
    })

    /**
     * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
     * It is used to await the rootSaga task before sending results to the client.
     * However, next-redux-wrapper creates two server-side stores per request:
     * One before `getInitialProps` and one before SSR (see issue #62 for details).
     * On the server side, we run rootSaga during `getInitialProps` only:
     */

    if (req || !isServer) {
        store.sagaTask = sagaMiddleware.run(rootSaga)
    }

    return store
}

export default configureStore