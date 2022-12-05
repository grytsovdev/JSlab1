const concertID = document.getElementById("concert");

const concertInfo = [
  {
    group: "Степан Гіга",
    place: "Палац Україна",
    date: "2022-12-5",
  },
  {
    group: "Океан Ельзи",
    place: "",
    date: "2022-12-10",
  },
  {
    group: "Антитіла",
    place: "Пісенний Кулб",
    date: "2022-11-15",
  },
  {
    group: "ВВ",
    place: "Палац Спорту",
    date: "2022-12-11",
  },
];

const days = calculateDaysToConcert(concertInfo);
printConcert(concertID, concertInfo, days);

function printConcert(concertID, concertInfo, days) {
  concertInfo.forEach(({ group, place, date }) => {
    const daysToConcert = days[date];

    const text = `Група або виконавець: ${group}. Місце проведення: ${
      place || "Невідома адреса проведення концерту"
    }. Дата: ${date}.`;
    let concertStatus = "";

    if (daysToConcert === 0) concertStatus = "Концерт сьогодні";
    if (daysToConcert * -1 === 5) {
      concertStatus = "Останній день, щоб придбати квиток";
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.classList.add("result");
    span.appendChild(document.createTextNode(concertStatus));
    li.appendChild(document.createTextNode(text));
    li.appendChild(span);
    concertID.appendChild(li);
  });
}

function calculateDaysToConcert(concertInfo) {
  const concertStatus = {};
  const today = new Date();

  for (let i in concertInfo) {
    let daysToConcert = 0;
    const concertDate = new Date(concertInfo[i].date).getTime();
    const dateDiff = today.getTime() - concertDate;
    daysToConcert = dateDiff;
    concertStatus[concertInfo[i].date] = Math.floor(
      daysToConcert / (1000 * 60 * 60 * 24)
    );
  }

  return concertStatus;
}
