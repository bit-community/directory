export const getUrlParameters = (url = window.location.href): Record<any, string> => {
  // RegExp pattern from https://stackoverflow.com/a/10687137
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (acc, val) => ((acc[val.slice(0, val.indexOf('='))] = val.slice(val.indexOf('=') + 1)), acc),
    {}
  )
}
