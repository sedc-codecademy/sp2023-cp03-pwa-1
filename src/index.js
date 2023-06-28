// Calendar Functions

// Function to create a calendar
function createCalendar() {
  
  const calendar = document.querySelector('.calendar');
  const currentMonthElement = document.querySelector('.current-month');
  const calendarDays = document.querySelector('.calendar-days');
  const prevMonthBtn = document.querySelector('.prev.month-btn');
  const nextMonthBtn = document.querySelector('.next.month-btn');
  const prevYearBtn = document.querySelector('.prev-year');
  const todayBtn = document.querySelector('.today');
  const nextYearBtn = document.querySelector('.next-year');
  const todayDate = document.getElementById('todayDate');
  // const navbarToday = document.getElementById('today');


  // Get the current date
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Event listener for "thisWeek" button
 let thisWeekButton = document.querySelector('.thisWeek');
 thisWeekButton.addEventListener('click', showDaysOfWeek);

  // Event listeners for month navigation buttons
  prevMonthBtn.addEventListener('click', showPreviousMonth);
  nextMonthBtn.addEventListener('click', showNextMonth);

  // Event listeners for year navigation buttons
  prevYearBtn.addEventListener('click', showPreviousYear);
  todayBtn.addEventListener('click', showCurrentMonth);
  todayBtn.addEventListener('click', toggleTodayDate);
  nextYearBtn.addEventListener('click', showNextYear);
  // navbarToday.addEventListener('click', createCalendar);

  // Display the current month and year
  displayCurrentMonth();

  // Function to display the current month and year
  function displayCurrentMonth() {
    const monthNames = [
      'January', 
      'February',
      'March', 
      'April',
      'May', 
      'June',
      'July', 
      'August',
      'September', 
      'October', 
      'November',
      'December'
    ];
    
  currentMonthElement.textContent = monthNames[currentMonth] + ' ' + currentYear;
  
  calendarDays.innerHTML = '';
      
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const calendarDay = document.createElement('div');
      calendarDay.classList.add('calendar-day');
      calendarDay.textContent = day;
      
      calendarDays.appendChild(calendarDay);
    }

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('empty-cell');
      calendarDays.appendChild(emptyCell);
    }
  }

   //function to show only days of one week
    
   function showDaysOfWeek() {
      
      calendarDays.innerHTML = '';
      
      let currentDate = new Date();
  
      // Get the first day of the current week
      let firstDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
  
      // Get the days of the week
      for (let i = 0; i < 7; i++) {
        let date = new Date(
          firstDayOfWeek.getFullYear(),
          firstDayOfWeek.getMonth(),
          firstDayOfWeek.getDate() + i
        );
        let calendarDay = document.createElement('div');
        calendarDay.classList.add('calendar-day');
        calendarDay.textContent = date.getDate();
        calendarDays.appendChild(calendarDay);
      }
    }
  //Get today date
  
  function toggleTodayDate() {
    let todayDateElement = document.getElementById('todayDate');
    let currentDate = new Date();
  
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    let currentYear = currentDate.getFullYear();
  
    let formattedDate = "Date:"+ ' ' + currentDay + '/' + currentMonth + '/' + currentYear;
    todayDateElement.textContent = formattedDate;
  }
  
  // Function to show the previous month
  function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    displayCurrentMonth();
  }

  // Function to show the next month
  function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    displayCurrentMonth();
  }

  // Function to show the previous year
  function showPreviousYear() {
    currentYear--;
    displayCurrentMonth();
  }

  // Function to show the next year
  function showNextYear() {
    currentYear++;
    displayCurrentMonth();
  }

  // Function to show the current month
  function showCurrentMonth() {
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    displayCurrentMonth();
  }
}

// Call the createCalendar
createCalendar()


//Show calendar on click on today 
//how to hide everything elsee
let showCalendar = document.getElementById('todayBtn');
showCalendar.addEventListener('click', toggleCalendar);

function toggleCalendar() {
  let calendar = document.getElementById('card');
  if (calendar.style.display === 'none') {
    calendar.style.display = 'block';
  } else {
    calendar.style.display = 'none';
  }
}
