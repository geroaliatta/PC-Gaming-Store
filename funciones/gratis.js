const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f1e8b88b66msh6b72f098ac87b25p1dcd30jsn068a4887c644',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc', options)
    .then(response => response.json())
    .then(response => {

        const juegos_gratis = document.querySelector("#sectionGratis");

        response.forEach(juego_gratis => {

            const articulo_gratis = document.createElement("article")
            articulo_gratis.innerHTML =
                `<div class="divTienda">
                <img src="${juego_gratis.thumbnail}" alt="" class="imgTienda">
                <div class="divTiendaCont">
                    <h4 class="tituloTienda">${juego_gratis.title}</h4>
                    <p class="descripJuego">${juego_gratis.short_description}</p>
                    <span class="genero">Genero:</span>
                    
                    <span class="precioJuego"> ${juego_gratis.genre}</span>
                    <a href="${juego_gratis.freetogame_profile_url}" target="_blank" class="botonComprar">¡Lo quiero!</a>
                </div>
            </div>`

            articulo_gratis.classList.add("articuloTienda");

            juegos_gratis.append(articulo_gratis);

            const buscador = document.querySelector("#buscador");
            

            document.addEventListener("keyup", e => {

                if (e.target.matches("#buscador")) {

                    if (e.key === "Escape") e.target.value = ""

                    document.querySelectorAll(".articuloTienda").forEach(juego_gratis => {

                        juego_gratis.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                            ? juego_gratis.classList.remove("filtro")
                            : juego_gratis.classList.add("filtro")
                    })

                }


            })

        });
    })

    .catch(err => console.error(err));