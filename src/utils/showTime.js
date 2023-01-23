const showTime = (miliseconds) => {
  if (typeof miliseconds !== "number") return miliseconds;
  let hour = Math.trunc(miliseconds / 3600000);
  if (hour < 10) hour = "0" + hour;
  let minute = Math.trunc(+(miliseconds / 3600000 - hour).toFixed(2) * 60);
  if (minute < 10) minute = "0" + minute;
  return `${hour}:${minute}`;
};
export { showTime };
