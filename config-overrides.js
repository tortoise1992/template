const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path')

module.exports = function override(config, env) {
    config = {
        ...config,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src') //配置src目录的别名
            }
        }        
    }
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        //   此处覆盖antd变量
        // modifyVars: { "@primary-color": "#9F35FF" },
        javascriptEnabled: true //处理less的报错
    })(config, env);
    return config;
};
