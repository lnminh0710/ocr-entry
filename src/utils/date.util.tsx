import moment from "moment";

export function formatDateFromNow(str: string) {
  try {
    let ms: Date = new Date(str);
    let now: Date = new Date(Date.now());
    if (ms.getDate() - now.getDate() < 2) {
      return moment(ms).fromNow();
    } else {
      return moment(ms).format("LLLL");
    }
  } catch (error) {
    return "";
  }
}

export function formatDateDefault(str: string) {
  try {
    let ms: Date = new Date(str);

    return `${ms.getDate()}-${ms.getMonth()}-${ms.getFullYear()}`;
  } catch (error) {
    return "";
  }
}

export function formatDateFull(str: string) {
  try {
    let ms: Date = new Date(str);

    return `${ms.getDate()}-${ms.getMonth()}-${ms.getFullYear()} ${ms.getHours()}:${ms.getMinutes()}`;
  } catch (error) {
    return "";
  }
}
