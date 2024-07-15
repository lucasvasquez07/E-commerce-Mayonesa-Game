//Archivo Js para la pagina Home
import { get_all_games } from "./metodos_backend.js"
import { create_template_card_game } from "./templates.js"

//evento que permite realizar un codigo al cargar la pagina
window.addEventListener("load", async () => {
    try {
        const lista_juegos = await get_all_games()
        const row_games = document.getElementById("list_games_home")
        row_games.innerHTML = ""
        lista_juegos.juegos.forEach((dict_juego) => {
            row_games.appendChild(create_template_card_game(dict_juego))
        })
    } catch (error) {
        Swal.fire({
            title: "No se pudo conectar con el servidor",
            icon: "error",
            confirmButtonColor: '#DC001A'
        })
    }
})