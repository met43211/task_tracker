export const formatDate = (date: Date) => {
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day} ${month}, ${dayOfWeek}`;
};

export const formatInputDate = (dateString: any) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return date.toLocaleDateString("ru-RU", options);
};
