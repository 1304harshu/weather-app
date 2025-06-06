function getWeather(){
    const apiKey='08200852a7ae762501fd3ad96721b072';
    const city=document.getElementById('city').value;
    if(!city){
        alert('Please enter a valid city!');
        return;
    }
    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data=>{
        displayWeather(data);
    })
    .catch(error => {
        console.log('Error fetching the current data.', error);
        alert('Error fetching the current data.');
    });

    fetch(forcastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForcast(data.list);
    })
    .catch(error => {
        console.log('Error fetching the Hourly Forcast Weather', error);
        alert('Error fetching the Hourly Forcast Weather data.');
    });
}

function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherDivInfo=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForcastDiv=document.getElementById('hourly-forcast');

    console.log(data);

    // clear previous content

    weatherDivInfo.innerHTML= '';
    hourlyForcastDiv.innerHTML= '';
    tempDivInfo.innerHTML= '';

    if(data.cod==='404'){
        weatherDivInfo.innerHTML=`<p>${data.message}</p>`
    }
    else{
        const cityName= data.name;
        const temperature=Math.round(data.main.temp - 273.15);
        const iconCode=data.weather[0].icon;
        const weatherDescip=data.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        const temperatureHtml= `<p>${temperature}°C</p>`;
        const weatherHtml= `
        <p>${cityName}</p> 
        <p>${weatherDescip}</p>`

        tempDivInfo.innerHTML=temperatureHtml;
        weatherDivInfo.innerHTML=weatherHtml;
        weatherIcon.src=iconUrl;
        weatherIcon.alt=weatherDescip;

    }

    showImage();
}

function displayHourlyForcast(hourlyData){
    const hourlyForcastDiv=document.getElementById('hourly-forcast');
    const next24Hour= hourlyData.slice(0,8);
    console.log(next24Hour);

    next24Hour.forEach(item => {
        const dateTime= new Date(item.dt * 1000); //converting time stamp to mili second
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode= item.weather[0].icon;
        const hour=dateTime.getHours();
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const hourlyItemHtml=`
        <div class='hourly-item'>
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly icon weather">
        <span>${temperature}°C</span>
        </div>`

        hourlyForcastDiv.innerHTML += hourlyItemHtml;
    });


}

function showImage(){
    const weatherIcon=document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}