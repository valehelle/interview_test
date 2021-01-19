// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import configureStore from '../reducers/configureStore'
import withReduxSaga from 'next-redux-saga'
import theme from '../components/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps };

    }
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>

                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        );
    }

}

export default withRedux(configureStore)(withReduxSaga(MyApp));