var calenderContents = document.querySelectorAll(".calender__content");
var calc = 0;
var title = document.querySelector(".calender__title");

const inputDate = document.querySelector("#calender__date");

const name = ["Days", "Months", "Years"];

window.addEventListener("load", checkCurrentCalenderElements());

let err = document.querySelector(".calender__error");
let items = document.querySelectorAll(".calender__active--box .calender__item");

function checkCurrentCalenderElements() {
  let btnNext = document.querySelector(".calender__btn--next");
  let btnPrev = document.querySelector(".calender__btn--prev");
  checkDaysContentAndAppend(".calender__days--content .calender__item");
  checkYearsContentAndAppend(".calender__years--content");
  checkCalenderItems();
  btnNext.onclick = () => showNextItems();

  btnPrev.onclick = () => showPrevItems();
}

function checkDaysContentAndAppend(dayContentItemsClassName) {
  let daysContent = document.querySelectorAll(dayContentItemsClassName);
  var dt = new Date();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  var daysInMonth = new Date(year, month, 0).getDate();
  daysContent.forEach((dayC) => {
    dayC.classList.add("calender__day--inactive");
  });
  for (let day = 0; day < daysInMonth; day++) {
    daysContent[day].classList.replace(
      "calender__day--inactive",
      "calender__active--day"
    );
  }
}

function checkYearsContentAndAppend(yearContentClassName) {
  let yearsContent = document.querySelector(yearContentClassName);
  let currentYear = new Date().getFullYear();

  for (let year = 1980; year < currentYear + 1; year++) {
    yearsContent.innerHTML += `  <div class="calender__item calender__flex flex__center" tabindex="-1" rol="radio" aria-checked="false"> ${year}</div>`;
  }
}

function showNextItems() {
  if (calc < calenderContents.length - 1) {
    calc++;
    title.innerText = name[calc];
    calenderContents[calc - 1]
      .querySelectorAll(".calender__item")
      .forEach((item) => {
        let isChecked = JSON.parse(item.getAttribute("aria-checked"));
        checkCalenderItems();
        calenderContents.forEach((content) => {
          content.classList.replace(
            "calender__active--box",
            "calender__hidden--box"
          );
        });
        calenderContents[calc].classList.replace(
          "calender__hidden--box",
          "calender__active--box"
        );
      });
  }
}

function showPrevItems() {
  if (calc > 0 && calc < calenderContents.length) {
    calc--;
    title.innerText = name[calc];
    calenderContents[calc + 1]
      .querySelectorAll(".calender__item")
      .forEach((item) => {
        checkCalenderItems();
        calenderContents.forEach((content) => {
          content.classList.replace(
            "calender__active--box",
            "calender__hidden--box"
          );
        });
        calenderContents[calc].classList.replace(
          "calender__hidden--box",
          "calender__active--box"
        );
      });
  }
}

function checkCalenderItems() {
  let itemsCl = document.querySelectorAll(
    ".calender__active--box .calender__item"
  );
  itemsCl.forEach((calcItem) => {
    calcItem.onclick = () => {
      appendCheckedItemInsideTheirInput(calcItem);
      itemsCl.forEach((i) => {
        i.setAttribute("aria-checked", "false");
        i.setAttribute("tabindex", "-1");
      });
      calcItem.setAttribute("aria-checked", "true");
      calcItem.setAttribute("tabindex", "0");
    };
  });
}

function appendCheckedItemInsideTheirInput(item) {
  let DataType = item.parentElement.dataset.type;
  switch (DataType) {
    case "days":
      localStorage.setItem("day", item.innerHTML.trim());
      break;
    case "months":
      localStorage.setItem("month", item.innerHTML.trim());
      break;
    case "years":
      localStorage.setItem("year", item.innerHTML.trim());
      break;
    default:
      return;
  }

  handleInputValue(
    localStorage.getItem("day"),
    localStorage.getItem("month"),
    localStorage.getItem("year")
  );
}

function handleInputValue(d, m, y) {
  inputDate.value = `${d ? d : "DD"}/${m ? m : "MM"}/${y ? y : "YY"}`;
  console.log(d, m, y);
}

const btnIcon = document.querySelector(".calender__icon");
btnIcon.onclick = () => {
  document
    .querySelector(".calender__container")
    .classList.toggle("calender__active");
};

const currentDateBtn = document.querySelector(".calender__footer--today");

currentDateBtn.addEventListener("click", handleWithCurrentDate);

function handleWithCurrentDate() {
  let currentDate = new Date(),
    currentDay = currentDate.getDate(),
    currentMonth = currentDate.getMonth(),
    currentYear = currentDate.getFullYear();
  let currentMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  handleInputValue(
    currentDay.toString(),
    currentMonths[currentMonth - 1].toString(),
    currentYear.toString()
  );
  handleWithCurrentElementsAppended(currentDay, currentMonth, currentYear);
}

function handleWithCurrentElementsAppended(day, month, year) {
  let days = document.querySelectorAll(
      ".calender__days--content .calender__item"
    ),
    months = document.querySelectorAll(
      ".calender__months--content .calender__item"
    ),
    years = document.querySelectorAll(
      ".calender__years--content .calender__item"
    );
  days[day - 1].setAttribute("aria-checked", "true");
  days[day - 1].setAttribute("tabindex", "0");
  months[month].setAttribute("aria-checked", "true");
  months[month].setAttribute("tabindex", "0");

  for (let yr = 0; yr < years.length; yr++) {
    const yrs = years[yr];
    if (parseInt(yrs.innerHTML) == year) {
      yrs.setAttribute("aria-checked", "true");
      yrs.setAttribute("tabindex", "0");

      handleWithLocalStorage(day, month + 1, year);
    }
  }
}

function handleWithLocalStorage(da, mo, yr) {
  localStorage.setItem("day", da ? da : "DD");
  localStorage.setItem("month", mo ? mo : "MM");
  localStorage.setItem("year", yr ? yr : "YY");
}
