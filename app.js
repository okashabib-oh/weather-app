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
const loader = document.getElementById('loader')
const btn = document.getElementById('getWeather')

const formHandler = async (e) => {
    try{
        e.preventDefault()
        loader.style.display = "block"
        weatherCard.style.display = 'none'
        btn.disabled = true

        const city = cityInput.value;
        const response = await axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
        console.log(response);

        form.reset()
        
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "City found successfully"
          });
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
    
        Swal.fire({
            title: "Error",
            text: `${error?.response?.data?.message || "Unknown ERROR"}`,
            icon: "error"
        });
    }finally{
        loader.style.display = "none"
        btn.disabled = false
    }
}

form.addEventListener("submit", formHandler)
