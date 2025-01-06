/**
 * 格式化日期为 yyyy.mm.dd hh:mm 格式
 * @param date 要格式化的日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date) {
    const yyyy = date.getFullYear(); // 获取年份
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份，确保为两位数
    const dd = String(date.getDate()).padStart(2, '0'); // 获取日期，确保为两位数
    const hh = String(date.getHours()).padStart(2, '0'); // 获取小时，确保为两位数
    const min = String(date.getMinutes()).padStart(2, '0'); // 获取分钟，确保为两位数
  
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`; // 拼接为 yyyy.mm.dd hh:mm 格式
  }