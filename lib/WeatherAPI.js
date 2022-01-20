
const requestHttp = require('./request')

const API = require('./data')

const { getWeatherStr } = require('./fun')

class WeatherApi {
  async show(){
    let resultStr = ''

    const promiseList = API.checkCityList.map(item=>{
      return this._promiseTip(this.getWeather(item))
    })

    await Promise.all(promiseList).then(weatherListAll => {
      weatherListAll.forEach(weatherList=>{
        if(weatherList.length !== 0) {
          const weathreInfo = weatherList[0]
          const today = weathreInfo.casts[0]
          const nextday = weathreInfo.casts[1]
          resultStr += getWeatherStr(weathreInfo, today, nextday)
        }
      })
    })
    return resultStr;
  }
  async getWeather(city){
    try {
      const {status, info, forecasts} = await requestHttp.get(API.weatherAPI, {
        city
      });
      if(status !== '1' || info !== 'OK'){
        return []
      }
      return forecasts
    } catch (error) {
      return []
    }
  }
  // 天气不做请求不成功错误处理，只是对其请求错误不展示
  _promiseTip(promiseItem){
    return promiseItem
      .then(res=>(Promise.resolve(res)))
      .catch(e=>{
      return Promise.resolve([])
    })
  }
}


module.exports = WeatherApi
