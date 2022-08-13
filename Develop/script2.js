var todayTime = document.querySelector("#current-time");
var currentMoment = moment();

todayTime.textContent = currentMoment.format("dddd, MMMM Do YYYY, h:mm:ss a");