import moment from 'moment'
import numeral from 'numeral'

export function formatDate(date: moment.MomentInput, format = 'MMM D, YYYY'): string {
  return moment.utc(date).local().format(format)
}

// export function formatDateTime(date, format = 'h:mm:ss') {
//     return moment.utc(date).local().fromNow().format(format);
// }

export function formatDateToTime(date: moment.MomentInput, format = 'h:mm:ss a'): string {
  return moment.utc(date).local().format(format)
}

export function formatNumber(number: number, format = '0,0'): string {
  return numeral(number).format(format)
}

export function toNumber(numberString: string): number {
  return numeral(numberString).value()
}

export function formatDateToNumber(date: moment.MomentInput): number {
  const time = moment.utc(date).local().valueOf()
  return time
}

export function formatDateFromTime(date: moment.MomentInput): string {
  return moment.utc(date).fromNow()
}

export function greeting() {
  const myDate = new Date()

  if (myDate.getHours() < 12) {
    return 'Good Morning'
  } else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) {
    return 'Good Afternoon'
  } else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
    return 'Good Evening'
  } else {
    return 'Hi'
  }
}
