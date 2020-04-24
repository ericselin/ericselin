if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

/** @type {PositionCallback} */
const getTemp = async (position) => {
  console.log(position);

  let resp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=1f4885debc672bf3b3a91ade95a24c29`);
  const forecast = await resp.json();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayUnix = Math.floor(yesterday.getTime() / 1000);
  resp = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?dt=${yesterdayUnix}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=1f4885debc672bf3b3a91ade95a24c29`);
  const y = await resp.json();

  document.getElementById('temp').innerText = forecast.current.feels_like;
  document.getElementById('yesterday').innerText = y.current.feels_like;
};

const refresh = () => {
  navigator.geolocation.getCurrentPosition(getTemp);
};

refresh();