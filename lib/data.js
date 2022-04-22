const {
  WEATHERKEY,
  robatAPI
} = process.env

module.exports = {
  // 天气 参考文档 https://lbs.amap.com/api/webservice/guide/api/weatherinfo
  weatherAPI: `https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHERKEY}&extensions=all&output=JSON&`,
  // 节假日
  holDayAPI: 'https://api.apihubs.cn/holiday/get',
  // 推送
  robat: robatAPI,
  // 往后最大节假日
  maxMonthHoliday: 12,
  // 展示天气地址 可参考文档 https://lbs.amap.com/api/webservice/download
  checkCityList: [
    '440300',·
    '440100'
  ],
  pushTimeList: [
    '0 00 17 * * *',
    '0 30 9 * * *',
  ]
}