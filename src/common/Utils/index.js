const stampFormatToDate = (stamp) => {
  let newStamp = stamp * 1000;
  let date = new Date(newStamp);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${da} ${mo} ${ye}`;
};
const stampFormatToTime = (stamp) => {
  let newStamp = stamp * 1000;
  let date = new Date(newStamp);
  let formattedTime =
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);
  return formattedTime;
};
const stampFormatToDayInWeek = (stamp) => {
  const newStamp = stamp * 1000;
  const date = new Date(newStamp);
  const dayInWeek = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    date
  );
  return dayInWeek;
};

export { stampFormatToDate, stampFormatToTime, stampFormatToDayInWeek };
