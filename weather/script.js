document.querySelector(".search").addEventListener("submit", async (event) => {
    event.preventDefault(); //Retira os efeito padrões

    let input = document.querySelector("#searchInput").value;
    if(input !== ""){
        clearInfo();
        showWarning("Loadwing...");
        let url = `https://api.openwaethermap.org/data/2.5/weather?q=${encodeURI(input
        )}&appid=bb9221fe71ad74a29024094bbc620755&units=metric&lang=pt_br`;

        //fazendo a requisição à API
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temIcon: json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Location not found");
        }
    } else{
        clearInfo();
    }
});

function showInfo(json){
    showWarning("");
    document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(
        ".windInfo"
        ).innerHTML = `${json.windSpeed} <span>Km/h<span>`;

    document
        .querySelector(".temp img")
        .setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
        );
    document.querySelector(".windPoint").style.transform = `rotate(${
        json.windAngle - 90
    }deg)`;
    document.querySelector(".result").style.display = "block";
}

function clearInfo(){
    showWarning("");
    document.querySelector(".result").style.display = "none";
}

const showWarning = (msg) => {
    document.querySelector(".notice").innerHTML = msg;
};