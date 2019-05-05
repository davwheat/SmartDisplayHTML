const config = {
  googleCalendarApiKey: "<API KEY>",
  googleCalendarIds: ["<ID1>", "<ID2>"],
  daysToFetch: 7,
  maxResults: -1,
  calendarRealEstatePercentage: 70,
  daySeparators: true,
  showTime: true,
  showDate: true,
  locale: "en-GB",
};

console.log("Config loaded!");
console.log(config);

const googleCalendarUrl =
  "https://www.googleapis.com/calendar/v3/calendars/<ID>/events?key=<KEY>";

const $timePrimary = $("#time .primary");
const $timeSecondary = $("#time .secondary");

const $datePrimary = $("#date .primary");
const $dateSecondary = $("#date .secondary");

const $calendarContainer = $("#calendarAppointments");

$calendarContainer.css("max-height", `${config.calendarRealEstatePercentage}%`);

function UpdateTime() {
  if (!config.showTime) {
    $timePrimary.html(" ");
    $timeSecondary.html(" ");
    return;
  }

  let today = new Date();

  $timePrimary.html(
    today.toLocaleTimeString(config.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })
  );
  $timeSecondary.html(("0" + today.getSeconds()).slice(-2));

  if (today.getSeconds() === 0) UpdateDate();

  setTimeout(UpdateTime, 1000);
}

function UpdateDate() {
  if (!config.showDate) {
    $datePrimary.html(" ");
    $dateSecondary.html(" ");
    return;
  }

  let today = new Date();

  $datePrimary.html(
    today.toLocaleDateString(config.locale, {
      weekday: undefined,
      era: undefined,
      day: "2-digit",
      month: "2-digit",
      year: undefined,
    })
  );

  $dateSecondary.html(
    today.toLocaleDateString(config.locale, {
      weekday: undefined,
      era: undefined,
      day: undefined,
      month: undefined,
      year: "numeric",
    })
  );
}

function FetchCalendarEvents() {
  let now = new Date();
  let min = now.toISOString();
  let max = new Date(
    now.setDate(now.getDate() + config.daysToFetch)
  ).toISOString();

  let events = [];

  console.log("Refreshing calendar...");
  config["googleCalendarIds"].forEach((element) => {
    let tempUrl = googleCalendarUrl;
    tempUrl = tempUrl.replace("<ID>", element);
    tempUrl = tempUrl.replace("<KEY>", config["googleCalendarApiKey"]);
    tempUrl += `&timeMin=${min}&timeMax=${max}`;
    if (config.maxResults !== -1) tempUrl += `&maxResults=${config.maxResults}`;

    console.log("Pulling calendar data from: " + tempUrl);

    $.ajax({
      url: tempUrl,
      async: false,
      cache: false,
      success: function(result) {
        result["items"].forEach((e) => {
          let start = new Date(e.start[Object.keys(e.start)[0]]);
          let end = new Date(e.end[Object.keys(e.end)[0]]);
          let allDay = end - start === 86400000; // length is 1 day (all day event)

          events.push({
            title: e.summary,
            start: start,
            end: end,
            allDay: allDay,
            location: e.location === undefined ? null : e.location,
          });
        });
      },
    });
  });

  return events;
}

function UpdateCalendar() {
  let calendarEvents = FetchCalendarEvents();

  calendarEvents.sort((a, b) => {
    let dateA = new Date(a.start);
    let dateB = new Date(b.start);
    return dateA - dateB; //sort by date ascending
  });

  for (let i = 0; i < calendarEvents.length; i++) {
    const calendarEvent = calendarEvents[i];

    let d = GenerateEventDiv(
      calendarEvent.title,
      calendarEvent.location,
      calendarEvent.start,
      calendarEvent.end,
      calendarEvent.allDay,
      calendarEvents[i + 1].start
    );

    $calendarContainer.append(d);
  }

  calendarEvents.forEach((calendarEvent) => {});
}

let lastDate = null;

UpdateTime();
UpdateDate();
UpdateCalendar();

function GenerateEventDiv(
  title,
  location,
  startTime,
  endTime,
  allDay,
  nextTime
) {
  if (lastDate == null) lastDate = startTime;

  let titleHeading = document.createElement("h3");
  titleHeading.innerHTML = title;

  let timePeriod = document.createElement("span");
  if (!allDay) {
    timePeriod.innerHTML = `${startTime.toLocaleTimeString(config.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })} until ${endTime.toLocaleTimeString(config.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })}`;
  } else {
    timePeriod.innerHTML = `All day`;
  }

  let date = document.createElement("span");
  date.innerHTML = `on ${startTime.toLocaleDateString(config.locale)}`;

  let locationText = document.createElement("p");
  locationText.style.fontSize = "0.9rem";
  locationText.style.marginTop = "4px";
  if (location !== null) locationText.innerHTML = "In " + location;

  let d = document.createElement("div");

  console.log(startTime.getDate() - lastDate.getDate() >= 1);

  if (
    config.daySeparators &&
    nextTime !== undefined &&
    (nextTime.getDate() - startTime.getDate() >= 1 || // day after or more
      nextTime.getDate() - startTime.getDate() <= -1) // next month
  )
    d.setAttribute("class", "calendarEvent dateSeparator");
  else d.setAttribute("class", "calendarEvent");

  let timeDateContainer = document.createElement("div");
  timeDateContainer.appendChild(timePeriod);
  timeDateContainer.appendChild(date);

  d.appendChild(titleHeading);
  d.appendChild(timeDateContainer);
  if (location !== null) d.appendChild(locationText);

  lastDate = startTime;

  return d;
}
