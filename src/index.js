let date = new Date();

let renderCalendar = () => {
  date.setDate(1);

  let monthDays = document.querySelector(".days");
  let currentDate = new Date();

  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  let prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  let firstDayIndex = date.getDay();

  let lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  let nextDays = 7 - lastDayIndex - 1;

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".buttons h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = currentDate.toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }
  for (let i = 1; i <= lastDay; i++) {
    if (i === currentDate.getDate() && date.getMonth() === currentDate.getMonth()) {
      days += `<div class="today" onclick="selectDay(${i})">${i}</div>`;
    } else {
      days += `<div onclick="selectDay(${i})">${i}</div>`;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

function selectDay(day) {
  const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
  document.querySelector(".date p").innerHTML = selectedDate.toDateString();
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


let thisWeekButton = document.getElementById("thisWeek");
thisWeekButton.addEventListener("click", showAllWeekendDays);

function showAllWeekendDays() {
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();

  let firstDayOfWeek = new Date(currentDate.getFullYear(), currentMonth, currentDay - currentDate.getDay());
  let lastDayOfWeek = new Date(currentDate.getFullYear(), currentMonth, currentDay - currentDate.getDay() + 6);

  let daysOfWeek = [];
  let options = { day: 'numeric' };
  let dateFormat = new Intl.DateTimeFormat('en-US', options);

  for (let date = firstDayOfWeek; date <= lastDayOfWeek; date.setDate(date.getDate() + 1)) {
    let formattedDate = dateFormat.format(date);
    daysOfWeek.push(formattedDate);
  }

  let monthDays = document.querySelector(".days");
  monthDays.innerHTML = daysOfWeek.map(day => {
    if (day === dateFormat.format(currentDate)) {
      return `<div class="today">${day}</div>`;
    } else {
      return `<div>${day}</div>`;
    }
  }).join('');
}

renderCalendar();


