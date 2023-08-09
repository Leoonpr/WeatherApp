let city = document.querySelector(".nome");
let temperatura = document.querySelector(".celsius");
let umidade = document.querySelector(".umidade");
let vento = document.querySelector(".vento");
let descricao = document.querySelector(".descricao");
let btnSearch = document.querySelector(".btnSearch");
let search = document.querySelector("#name");
let info = document.querySelector(".info");

btnSearch.addEventListener("click", () => {
  info.classList.remove("hide");
  let cityName = search.value;
  weather.fetchWeather(cityName);
});

let weather = {
  fetchWeather: (city) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=2e68bbc4bb2cb5fae1f8e6063f2de449&lang=pt_br"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cidade não encontrada");
        }
        return response.json();
      })
      .then((data) => weather.showWeather(data))
      .catch((error) => {
        console.error(error);
        alert("Cidade não encontrada! Por favor coloque um nome válido");
      });
  },
  showWeather: (data) => {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    city.innerText = `Clima em ${name}`;
    temperatura.innerText = `${Math.floor(temp)} °C`;
    descricao.innerText = `${
      description.charAt(0).toUpperCase() + description.slice(1)
    }`;
    umidade.innerText = `Umidade: ${humidity}%`;
    vento.innerText = `Velocidade do vento: ${speed} km/h`;
  },
};
