export const baseUrlApi = (url: string) => `/api/${url}`;
export function queryStr(data: object) {
  let str = "?";
  for (const key in data) {
    str = str + String(key) + "=" + String(data[key]) + "&";
  }

  if (str.substr(-1) == "&") {
    str = str.slice(0, str.length - 1);
  }
  return str;
}
