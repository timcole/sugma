export function timeSince(date: Date) {
  function timeInterval(seconds: number): [number, string] {
    let interval = seconds / 31536000;

    if (interval > 1) return [Math.floor(interval), `year`];
    interval = seconds / 2592000;
    if (interval > 1) return [Math.floor(interval), `month`];
    interval = seconds / 86400;
    if (interval > 1) return [Math.floor(interval), `day`];
    interval = seconds / 3600;
    if (interval > 1) return [Math.floor(interval), `hour`];
    interval = seconds / 60;
    if (interval > 1) return [Math.floor(interval), `minute`];
    return [0, `now`];
  }

  let [interval, period] = timeInterval(
    Math.floor((new Date().getTime() - date.getTime()) / 1000),
  );
  return `${interval > 0 ? interval : ''} ${period}${interval > 1 ? 's' : ''}`;
}
