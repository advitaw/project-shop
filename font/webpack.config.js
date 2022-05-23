const { merge } = require('webpack-merge');

module.exports = ({ WEBPACK_SERVE, MK_ENV }) => {
    console.log('环境变量', WEBPACK_SERVE, MK_ENV);
    const NODE_ENV = WEBPACK_SERVE ? 'development' : 'production';
    process.env.NODE_ENV = NODE_ENV;
    process.env.MK_ENV = MK_ENV || 'prod';
    const commonConfig = require('./build/webpack.common.js');
    const envConfig = require(`./build/webpack.${NODE_ENV}.js`);
    return merge(
        commonConfig,
        envConfig,
    );
};
