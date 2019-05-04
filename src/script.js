const $timePrimary = $("#time .primary");
const $timeSecondary = $("#time .secondary");

let timeUupdate = setInterval(() => {
  let today = new Date();

  $timePrimary.html(
    // today.getHours() +
    //   ":" +
    //   today.getMinutes()
    today.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })
  );
  $timeSecondary.html(
    today.toLocaleTimeString("en-GB", {
      hour: undefined,
      minute: undefined,
      second: "2-digit",
    })
  );
}, 1000);
