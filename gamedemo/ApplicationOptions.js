export default function ApplicationOptions() {

const { globalData: { pageConf, taojimu } } = getApp();
const component = pageConf.componentTree[0];
// 读取组件配置数据。结构见：ext.json > componentTree[0] > compExt
// console.log('组件配置数据', component.compExt)

  return {
    // 是否撑满屏幕
    "isFixToWindow": true,
    // canvas背景是否透明
    "backgroundAlpha": 1,
    "containerElementId": "container",
    // canvas背景颜色
    // "backgroundColor": 0xFFBCBF,
    "backgroundColor": 0xFFFFFF,
    // 是否强制使用2d上下文渲染,如果为flase 则使用webgl渲染
    "forceCanvas": false,
    // 资源存储的根路径
    "basePath": "https://g.alicdn.com/mm/mmgamelite-testdemo-assets/0.0.8",
    // 店铺信息
    "shopInfo": {},
    // 分享信息
    "share": {
      "title": '测试分享标题',
      "text": '测试分享文案',
      "image": '',
      "url": 'https://test.tmall.com/'
    },
    // 活动信息
    "activityInfo": {
      // 活动周期时间戳，走配置
      // 活动名称，不太需要
      "activityName": "test",
      // 活动id 会自动注入
      "activityId": `-test`,
    },
    // 替换的资源
    "resource": [ 
      {
        name: 'r_visual',
        type: 'image',
        url: component.compExt.r_visual.src
      },
      {
        name: 'text_start',
        type: 'text',
        content: '立即启动'
      }
    ],
    // 布局的基础宽度
    "baseWidth": 750,
    // 布局的基础高度
    "baseHeight": 1334
  }
};