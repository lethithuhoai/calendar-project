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
    leftIcon = document.querySelector(".item1"),
    rightIcon = document.querySelector(".item3")

let time = new Date(),
    currentYear = time.getFullYear(),
    currentMonth = time.getMonth(),
    currentDay = time.getDate();

const getCurrentYear = new Date().getFullYear();
const listOfYears = Array.from({ length: 50 }, (_, i) => getCurrentYear - i);




const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currentYear, currentMonth, 0).getDay(),
        lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = ""

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }


    for (let i = 1; i <= lastDateofMonth; i++) {
        liTag += `<li class="liActive">${i}</li>`;
    }

    for (let i = lastDateofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }

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
                    <option key="${index}" value="${index}">
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
    }).join("");

    currentDate.innerText = `${currentDay} ${months[currentMonth]} ${currentYear}`


    daysTag.innerHTML = liTag;
}
renderCalendar()

leftIcon.addEventListener("click", () => {
    currentMonth = currentMonth - 1

    if (currentMonth < 0) {
        time = new Date(currentYear, currentMonth);
        currentYear = time.getFullYear()
        currentMonth = time.getMonth()
    } else {
        time = new Date()
    }

    renderCalendar()
})

rightIcon.addEventListener("click", () => {
    currentMonth = currentMonth + 1

    if (currentMonth > 11) {
        time = new Date(currentYear, currentMonth);
        currentYear = time.getFullYear()
        listOfYears.push(currentYear)
        currentMonth = time.getMonth()
    } else {
        time = new Date()
    }

    renderCalendar()
})


document.addEventListener("DOMContentLoaded", function () {
    var listItems = document.querySelectorAll(".liActive");

    listItems.forEach(function (item) {
        item.addEventListener("click", function () {
            currentDate.innerText = `${item.textContent} ${months[currentMonth]} ${currentYear}`
        });
    });
});