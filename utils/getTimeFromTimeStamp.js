export default function getTimeFromTimeStamp(UNIX_timestamp) {
  const date = new Date(UNIX_timestamp * 1000);
  const hour = date.getUTCHours();
  const min = date.getUTCMinutes();
  return hour + ":" + min;
}
