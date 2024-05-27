const form = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityInput')
const apiKey = '9f3534bce33130693f007daaee3ce1d2'
const temp = document.getElementById('temperature')
const desc = document.getElementById('description');
const image_icon = document.getElementById('icon_img');
const nameCity = document.getElementById('cityName');
const humidity = document.getElementById('humidity');
const weatherCard = document.getElementById('weatherCard');
const message = document.getElementById('message')
const feelsLike = document.getElementById('feelsLike')
const pressure = document.getElementById('pressure')

const formHandler = async (e) => {
    try{
        e.preventDefault()
        message.classList = "bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded"
        message.innerText = "Loading..."
        message.style.width = "20%"
        message.style.marginTop = "10px"
        message.style.display = "block"
        weatherCard.style.display = 'none'

        const city = cityInput.value;
        const response = await axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )

        message.style.display = "none"
        form.reset()
        weatherCard.style.display = 'block'

        const cityName = response.data.name
        const description = response.data.weather[0].description
        const icon = response.data.weather[0].icon
        const icon_path = `http://openweathermap.org/img/w/${icon}.png`
        const temperature = response.data.main.temp
        const humi = response.data.main.humidity
        const feels = response.data.main.feels_like
        const pre = response.data.main.pressure
        temp.innerText = `${temperature}°C`;
        desc.innerText = description
        image_icon.src = icon_path
        nameCity.innerHTML = `Weather of ${cityName}`
        humidity.innerHTML = ` Humidity <br> ${humi}%`
        feelsLike.innerHTML = ` Feels Like <br> ${feels}°C`
        pressure.innerHTML = ` Pressure <br> ${pre} mb`

    }catch(error){
        weatherCard.style.display = 'none'
        message.style.display = "block"
        message.style.width = "20%"
        message.classList = "bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded"
        message.innerText = error?.response?.data?.message || "unknown error"
    }
}

form.addEventListener("submit", formHandler)
