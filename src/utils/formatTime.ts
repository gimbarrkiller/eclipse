// seconds to HH:mm:ss
export function timeToString(time: number) {
  const hours = Math.floor(time / (3600));
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = (time - hours * 3600 - minutes * 60);
  const hh = hours < 10 ? `0${hours}` : hours.toString();
  const mm = minutes < 10 ? `0${minutes}` : minutes.toString();
  const ss = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${hh}:${mm}:${ss}`;
}
