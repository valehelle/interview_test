require('dotenv').config()
module.exports = (phase, { defaultConfig }) => {
    return {
        env: {
            BASE_URL: process.env.BASE_URL,
            mock: process.env.mock == 'true' ? true : false
        }
        /* config options for all phases except development here */
    }
}
