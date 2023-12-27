export const months = [
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

const // currentDate = document.querySelector(".current-date"),
  //   lastCurrentDate = document.querySelector(".last-date"),
  daysTag = document.querySelector(".days"),
  preNextIcon = document.querySelectorAll(".item1");
const dateInput = document.querySelector(".inputTime");
let saveFirstDate = null;
let saveFinalDate = null;
const optionsDate = { day: "numeric", month: "short", year: "numeric" };
let chosenItem = null;
let isShowCalendar = null;

let time = new Date(),
  currentYear = time.getFullYear(),
  currentMonth = time.getMonth(),
  currentDay = time.getDate();

const getCurrentYear = new Date().getFullYear();
const firstOfCurrentYear = Array.from({ length: 50 },(_, i) => currentYear - i);
const lastOfCurrentYear = Array.from({ length: 50 },(_, i) => currentYear + 1 + i);
const listOfYears = firstOfCurrentYear.reverse().concat(lastOfCurrentYear);

// getDay va getDate: day la lay thu, date la lay ngay
const renderCalendar = () => {
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(),
    lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
    lastDayOfMonth = new Date(
      currentYear,
      currentMonth,
      lastDateOfMonth
    ).getDay(),
    lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let liTag = "";
  console.log(new Date().getDate(), new Date().getFullYear());
  for (let i = firstDayOfMonth; i > 0; i--) {
    let newTime = new Date(
      `${i} ${months[currentMonth - 1]} ${currentYear}`
    ).getTime();
    liTag += `<li class="inactive" data-date=${newTime}>${
      lastDateOfLastMonth - i + 1
    }</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let newDate = new Date(
      `${i} ${months[currentMonth]} ${currentYear}`
    ).getTime();
    let isToday = saveFirstDate >= newDate <= saveFinalDate;

    console.log({ isToday, newDate });
    if (
      i == new Date().getDate() &&
      currentMonth == new Date().getMonth() &&
      currentYear == new Date().getFullYear()
    ) {
      liTag += `<li class="liActive active" data-date=${newDate}>${i}</li>`;
    } else {
      liTag += `<li class="liActive" data-date=${newDate}>${i}</li>`;
    }
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    let newTime = new Date(
      `${i} ${months[currentMonth + 1]} ${currentYear}`
    ).getTime();
    liTag += `<li class="inactive" data-date=${newTime}>${
      i - lastDayOfMonth + 1
    }</li>`;
  }

  //Map months
  document.getElementById("select").innerHTML = months
    .map((value, index) => {
      if (index === currentMonth) {
        return `
                    <option key="${index}" value="${index}" selected="selected">
                      ${value}
                    </option>
                    `;
      } else {
        return `
                    <option key="${index}" value="${index + 1}">
                      ${value}
                    </option>
                    `;
      }
    })
    .join("");

  document.getElementById("select-year").innerHTML = listOfYears
    .map((value, index) => {
      if (value === currentYear) {
        return ` 
                <option key="${value}" value="${value}" selected="selected">
                    ${value}
                </option>
            `;
      } else {
        return ` 
                <option key="${value}" value="${value}">
                ${value}
                </option>
            `;
      }
      renderCalendar();
    })
    .join("");

  //   currentDate.innerText = `${currentDay} ${months[currentMonth]} ${currentYear}`;
  // thay day

  daysTag.innerHTML = liTag;
};
renderCalendar();

const handleClickDate = () => {
  var listItems = document.querySelectorAll("ul .liActive");
  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const chosenDate = `${item.textContent} ${months[currentMonth]} ${currentYear}`;

      // getTime la get millisecond, may tinh se tu parse ra theo local time
      if (
        (saveFirstDate && saveFinalDate) ||
        new Date(chosenDate).getTime() < saveFirstDate
      ) {
        // func forEach lap qua chon class chosen de remove
        listItems.forEach((e) => {
          e.classList.remove("chosen");
          e.classList.remove("paint");
        });
        saveFirstDate = null;
        saveFinalDate = null;
      }
      // them class chosen vao item
      //   renderCalendar();
      item.classList.add("chosen");

      if (saveFirstDate && new Date(chosenDate).getTime() >= saveFirstDate) {
        saveFinalDate = new Date(chosenDate).getTime();

        dateInput.value = `${new Date(saveFirstDate).toLocaleDateString(
          "en-US",
          optionsDate
        )} to ${new Date(saveFinalDate).toLocaleDateString(
          "en-US",
          optionsDate
        )}`;

        // handleDatePicker();
        // getDaysInRange(saveFirstDate, saveFinalDate);
        handlePicker();

        // new Date(saveFirstDate) dùng để parse ra time
      } else {
        // saveFirstDate = currentDate.innerText;
        saveFirstDate = new Date(chosenDate).getTime();
        // currentDate.innerText = chosenDate;
        dateInput.value = `${new Date(saveFirstDate).toLocaleDateString(
          "en-US",
          optionsDate
        )} to now`;
      }
    });
  });
};

//  prev next


// change time
handleClickDate();
// onChange date

function changeOptionDate() {
  var selectBox = document.getElementById("select");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  currentMonth = new Date(time.setMonth(selectedValue)).getMonth();
  renderCalendar();
}

document.getElementById("select").onchange = function () {
  changeOptionDate();
};

function changeOptionYear() {
  var selectBox = document.getElementById("select-year");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  currentYear = new Date(time.setFullYear(selectedValue)).getFullYear();
  renderCalendar();
}
document.getElementById("select-year").onchange = function () {
  changeOptionYear();
};

// * show canlendar is open and close
function handleOnShowCalendar() {
  dateInput.addEventListener("click", function () {
    const calendar = document.querySelector(".wrapper");

    if (calendar.classList.contains("show")) {
      calendar.classList.remove("show");
    } else if (calendar && !calendar.classList.contains("show")) {
      calendar.classList.add("show");
    }
  });
}
handleOnShowCalendar();

function getDaysInRange(start, end) {
  console.log(start, end);
  // Create a new Date object from the start date
  var date = new Date(start);
  date.setDate(date.getDate() + 1);
  // Initialize an empty array to store the days
  var days = [];
  // Loop until the date is equal or greater than the end date
  while (date < new Date(end)) {
    // Push a copy of the current date into the array
    days.push(new Date(date).getTime());
    // Increment the date by one day
    date.setDate(date.getDate() + 1);
  }
  // handleRangeDays(days);
  // Return the array of days
  console.log(days);
  return days;
}

function handlePicker() {
  const days = getDaysInRange(saveFirstDate, saveFinalDate);
  for (let day of days) {
    const selectLi = document.querySelector(`li[data-date='${day}']`);
    selectLi.classList.add("paint");
  }
}
