// 为了美观将涉及无空格缩进的模板字符串的函数抽离

exports.getShowStrTop = (date, hourInfo, weather, workHour, dayNow) => {
  return `Hi,我是定时播报机器人,
提醒您:${date}${hourInfo}好,打工人！
温馨提示:
${weather}
${workHour}
${5 - dayNow > 0 ? `距离周末还有:${5 - dayNow}天` : '明天就是周末啦！'}`;
}

exports.getShowStrCenterItem = (name, diff) => (diff - 1 > 0 ? `
距离${name}还有:${diff - 1}天` : `
明天就是${name}啦`)

exports.getShowStrBottom = () => `
生活需要长远的清醒,
清晨和夜晚都请用力去生活,
奔跑吧打工人!`

exports.getWeatherStr = (weathreInfo, today, nextday) => `${weathreInfo.province}省${weathreInfo.city}:
今日白天${today.dayweather},夜间${today.nightweather},白天温度${today.daytemp},夜间温度${today.nighttemp}
明日白天${nextday.dayweather},夜间${nextday.nightweather},白天温度${nextday.daytemp},夜间温度${nextday.nighttemp}
`;
