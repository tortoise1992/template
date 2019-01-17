
export default {  
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
      title: 'create',
      dll: true,
      hardSource: false,
      // 配置routes下面的components不会解析成路由
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ]
  
}
