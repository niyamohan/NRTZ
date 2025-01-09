/**
 * 日付を yyyy.mm.dd hh:mm の形式にフォーマットします
 * @param date フォーマットする日付オブジェクト
 * @returns フォーマット済みの日付文字列
 */
export function formatDate(date: Date) {
  const yyyy = date.getFullYear(); // 年を取得
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 月を取得し、2桁になるように補完
  const dd = String(date.getDate()).padStart(2, '0'); // 日を取得し、2桁になるように補完
  const hh = String(date.getHours()).padStart(2, '0'); // 時間を取得し、2桁になるように補完
  const min = String(date.getMinutes()).padStart(2, '0'); // 分を取得し、2桁になるように補完

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`; // yyyy.mm.dd hh:mm の形式で結合
}