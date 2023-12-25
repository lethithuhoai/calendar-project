export const months = [
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
]

const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    preNextIcon = document.querySelectorAll(".item1");

let time = new Date(),
    currentYear = time.getFullYear(),
    currentMonth = time.getMonth(),
    currentDay = time.getDate();

const getCurrentYear = new Date().getFullYear();
const firtsOfCurrentYear = Array.from({ length: 50 }, (_, i) => currentYear - i);
const lastOfCurrentYear = Array.from({ length: 50 }, (_, i) => (currentYear + 1) + i);
const listOfYears = firtsOfCurrentYear.reverse().concat(lastOfCurrentYear)
const testLog = () => { console.log("hihi") }

const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = ""
    console.log(new Date().getDate(), new Date().getFullYear());
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }


    for (let i = 1; i <= lastDateofMonth; i++) {
        if (i == new Date().getDate() && currentMonth == new Date().getMonth() && currentYear == new Date().getFullYear()) {
            liTag += `<li class="liActive active" onclick="${testLog()}">${i}</li>`;
        } else {
            liTag += `<li class="liActive" onclick="${testLog()}">${i}</li>`;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    // here
    // chooseDay.forEach(day =>
    //     day.addEventListener("click", () => { console.log(day) }))


    //Map months
    document.getElementById("select").innerHTML = months
        .map(
            (value, index) => {
                if (index === currentMonth) {
                    return `
                    <option key="${index}" value="${index}" selected="selected">
                      ${value}
                    </option>
                    `
                } else {
                    return `
                    <option key="${index}" value="${index + 1}">
                      ${value}
                    </option>
                    `
                }
            }
        )
        .join("");

    document.getElementById("select-year").innerHTML = listOfYears.map((value, index) => {
        if (value === currentYear) {
            return ` 
                <option key="${value}" value="${value}" selected="selected">
                    ${value}
                </option>
            `
        } else {
            return ` 
                <option key="${value}" value="${value}">
                ${value}
                </option>
            `
        }
        renderCalendar()
    }).join("");


    currentDate.innerText = `${currentDay} ${months[currentMonth]} ${currentYear}`
    // thay day

    daysTag.innerHTML = liTag;
}
renderCalendar()

const handleClickDate = () => {
    var listItems = document.querySelectorAll("ul .liActive");
    listItems.forEach(function (item) {
        item.addEventListener("click", function () {
            currentDate.innerText = `${item.textContent} ${months[currentMonth]} ${currentYear}`
            item.classList.add("chosen")
            //Clear others li tag
            listItems.forEach(e => {
                if (e.textContent !== item.textContent) {
                    e.classList.remove("chosen")
                }
            })
        });
    });
}

//  prev next
preNextIcon.forEach(icon =>
    icon.addEventListener("click", () => {
        currentMonth = icon.id === 'prev' ? currentMonth - 1 : currentMonth + 1

        if (currentMonth <= 1 || currentMonth > 11) {
            time = new Date(currentYear, currentMonth);
            currentYear = time.getFullYear()
            currentMonth = time.getMonth()
            listOfYears.push(currentYear)
        } else {
            time = currentMonth + 1
            console.log({ time })
        }
        renderCalendar()
        handleClickDate()
    })
)


// change time
handleClickDate()
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
    renderCalendar()
}
document.getElementById("select-year").onchange = function () {
    changeOptionYear();
}