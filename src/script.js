const $timePrimary = $("#time .primary");
const $timeSecondary = $("#time .secondary");

let timeUupdate = setInterval(() => {
  let today = new Date();

  $timePrimary.html(
    today.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })
  );
  $timeSecondary.html(("0" + today.getSeconds()).slice(-2));
}, 1000);
