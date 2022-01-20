const requestHttp = require('./request')
const { getShowStrTop, getShowStrCenterItem, getShowStrBottom } = require('./fun')
const mathData = require('./data')
const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)


class DateApi {
  async show(weather = '') {
    let isShowNotice = true
    const dayNow = this._getDay()
    if (dayNow > 5) {// 周末不提示
      return {
        showStr: '',
        isShowNotice: false
      }
    }

    const today = dayjs().startOf('day');
    const workHour = await this._getWorkHour()

    let showStr = getShowStrTop(this._getDate(),this._getHourInfo(),weather,workHour,dayNow);
    const nextHoliday = await this.getHoliday();
    const fullHolidayArr = nextHoliday.sort((before, next) => {
      const beforeTS = before[0].unix();
      const nextTS = next[0].unix();
      return beforeTS - nextTS;
    });
    if (fullHolidayArr.length) {
      fullHolidayArr.forEach(([date, name, isNowDate]) => {
        const diff = date.diff(today, 'day');
        if (diff > 0 && isNowDate) {
          showStr += getShowStrCenterItem(name, diff)
        }
        if (diff === 0) { // 节假日不展示提示
          isShowNotice = false
        }
      });
    }
    showStr += getShowStrBottom()
    return {
      showStr,
      isShowNotice
    }
  }

  // 获取节假日的
  async getHoliday() {
    try {
      const today = dayjs().startOf('day');
      // 获取包括当前月数的多少个假期
      const nextYearMonth = this._generateRange(today, mathData.maxMonthHoliday, 'month');
      const month = nextYearMonth.map((i) => i.format('YYYYMM'));
      const holidayArr = []
      const res = await requestHttp.get(mathData.holDayAPI, {
        // 日期范围
        month: month.join(','),
        // 只显示节假日假日
        holiday_recess: 1,
        // 升序
        order_by: 1,
        // 中文描述
        cn: 1,
      });
      if (res.code === 0) {
        const baseArr = res.data.list;
        for (let i = 0, j = baseArr.length; i < j; i += 1) {
          const item = baseArr[i];
          if (item.holiday_today === 1 || item.holiday_recess === 1) {
            holidayArr.push([
              dayjs(`${item.date}`, 'YYYYMMDD'),
              `${item.holiday_cn}`,
              item.holiday_today === 1
            ]);
          }
        }
        return holidayArr
      }
      return []
    } catch (error) {
      return []
    }
  }

  // 获取上班下班的
  async _getWorkHour() {
    const hour = this._getHour()
    if (hour > 12 && hour < 18) {
      return `还有不到${18 - hour}小时就要下班啦，请认真工作好好学习!`
    } else if (hour > 21 && hour < 24) {
      return `夜已经深了，准备洗漱入眠吧!`
    } else if (hour > 8 && hour < 10) {
      return `还有不到${10 - hour}小时就要上班了!`
    } else {
      return ''
    }
  }

  // 获取当前日期是周几 如果大于5那么就不展示,这里的周日是从0 开始
  _getDay() {
    const nowDay = dayjs().day()
    return nowDay === 0 ? 7 : nowDay
  }

  _getDate() {
    return dayjs().format('MM月DD日')
  }

  _getHour() {
    return dayjs().hour()
  }
  // 请求时间定位 早上9:00  下午5:00
  _getHourInfo() {
    const hour = this._getHour()
    if (hour >= 6 && hour < 12) {
      return '上午'
    } else if (hour === 12) {
      return '中午'
    } else if (hour > 12 && hour < 18) {
      return '下午'
    } else if (hour >= 18 && hour < 24) {
      return '晚上'
    } else if (hour === 24 || hour === 0) {
      return '凌晨'
    } else if (hour > 0 && hour < 6) {
      return '夜深'
    } else return ''
  }

  _generateRange(dateStart, length, unit = 'day') {
    const result = [dateStart];
    for (let i = 1; i < length; i += 1) {
      const newDate = dateStart.clone();
      result.push(newDate.add(i, unit));
    }
  
    return result;
  }
}



module.exports = DateApi