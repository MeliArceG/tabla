var lng, lat;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarUbicacion);
} else {
    window.confirm("Lo sentimos no se pudo acceder a su ubicación");
}

function mostrarUbicacion(ubicacion) {
    lng = ubicacion.coords.longitude;
    lat = ubicacion.coords.latitude;
    console.log(`longitud: ${lng} | latitud: ${lat}`);
}

$(function () {
    document.getElementById("tblw").addEventListener("click", () => {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=93e06dc23a13e369062c097bded10ca6`,
            dataType: "json",
            success: function (data) {
                $(".lugar").html(data.name);
                $(".temp").html(data.main.temp - 273.15 + "°");
                $(".icono").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
                $(".hum").html(data.main.humidity);
                $(".viento").html(data.wind.speed);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
});

