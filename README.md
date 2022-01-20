# BroadcastRobot

##### 一个企业微信群机器人定时推送消息

##### 示例

```javascript
Hi,我是定时播报机器人,
提醒您:01月12日下午好,打工人！
温馨提示:
广东省广州市,
今日白天多云,夜间多云,白天温度18,夜间温度13
明日白天晴,夜间晴,白天温度20,夜间温度14
还有不到1小时就要下班啦，请认真工作好好学习!
距离周末还有:2天
距离春节还有:19天
距离清明节还有:82天
距离劳动节还有:108天
距离端午节还有:141天
距离中秋节还有:240天
距离国庆节还有:261天
生活需要长远的清醒,
清晨和夜晚都请用力去生活,
奔跑吧打工人!
```
#### 所有逻辑在lib文件夹中
##### 运行方式
1. npm install

2. 修改 (./lib/data.js) 文件内容
  * 将 WEATHERKEY 设置成自身高德天气API的WEATHERKEY，参考[高德天气API](https://lbs.amap.com/api/webservice/guide/api/weatherinfo)
  * 将 robatAPI 设置成企业微信群机器人 推送链接， 参考[群机器人配置说明](https://developer.work.weixin.qq.com/document/path/91770)
  * 将 checkCityList 设置成需要展示城市的地址编码，参考 https://lbs.amap.com/api/webservice/download
  * 将 pushTImeList 修改成自己需要推送的几个时间点，参考 [node-schedule npm](https://www.npmjs.com/package/node-schedule)

3. npm run dev || nodemon bin/www  || pm2 start bin/www

