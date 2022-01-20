
const schedule = require('node-schedule');
const requestHttp = require('./request')
const DateAPI = require('./DateAPI')
const WeatherAPI = require('./WeatherAPI')
const API = require('./data')

class Robat {
  constructor() {
    this.dateIns = new DateAPI()
    this.weatherIns = new WeatherAPI()
  }

  async getAllShow(weatherInfo) {
    return await this.dateIns.show(weatherInfo)
  }

  async getWeatherShow() {
    return await this.weatherIns.show()
  }

  async start() {
    API.pushTimeList.forEach(time => {
      schedule.scheduleJob(time, () => {
        this.HI()
      });
    });
  }
  async HI() {
    try {
      const weatherInfo = await this.getWeatherShow()
      const info = await this.getAllShow(weatherInfo)
      // 节假日或者周末不显示，暂定处理方式
      if (!info.isShowNotice) return
      // console.log(info)
      await requestHttp.post(API.robat, {
        msgtype: "text",
        text: {
          content: info.showStr
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Robat
