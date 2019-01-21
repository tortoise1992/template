
export default {  
  // 启用hash路由
  history: 'hash',
  // 兼容性配置
  targets: {
    ie: 9,
  },
  // "disableCSSModules": true,   
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: true,
      // title: '大数据平台',
      dll: true,
      hardSource: false,
      // 打开国际化配置项
      locale: {
        enable: true,
      },
      // 配置routes下面的components不会解析成路由
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ]
  
}
